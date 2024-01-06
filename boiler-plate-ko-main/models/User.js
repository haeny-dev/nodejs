const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const saltRounds = 10

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
})

userSchema.pre('save', function (next) {
  const user = this

  if (user.isModified('password')) {
    // 비밀번호를 암호화한다.
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err)

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err)

        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword : 1234567 / 암호화된 비밀번호 : $2b$10$YE3WZ6im3mHE1UxXf54L3.2LXMti/HJHkeXBYXifSacRMCKddLYdu
  bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

userSchema.methods.generateToken = function (cb) {
  const user = this
  // jsonwebtoken을 이용해서 token을 생성하기

  const token = jwt.sign(user._id.toHexString(), 'secretToken')
  user.token = token
  user.save((err, user) => {
    if (err) return cb(err)
    cb(null, user)
  })
}

userSchema.statics.findByToken = function (token, cb) {
  const user = this

  // 토큰을 decode 한다.
  jwt.verify(token, 'secretToken', (err, decoded) => {
    User.findOne({ _id: decoded, token: token }, (err, user) => {
      if (err) return cb(err)
      cb(err, user)
    })
  })
}

const User = mongoose.model('User', userSchema)
module.exports = { User }
