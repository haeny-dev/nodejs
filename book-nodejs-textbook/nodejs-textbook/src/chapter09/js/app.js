const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const nunjucks = require('nunjucks')
const morgan = require('morgan')
const path = require('path')
const passport = require('passport')

const { sequelize } = require('./models')
const passportConfig = require('./passport')

const pageRouter = require('./routes/page')
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const userRouter = require('./routes/user')

const app = express()
passportConfig()
app.set('view engine', 'html')
nunjucks.configure('views', {
  express: app,
  watch: true,
})

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Success database connecting!')
  })
  .catch((err) => {
    console.error(err)
  })

app.use(morgan('dev'))
app.use(express.static(path.resolve(__dirname, 'public')))
app.use('/img', express.static(path.resolve(__dirname, 'uploads')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
)
/**
 * passport.initialize(): req 객체에 passport 정보를 저장하고,
 * passport.session(): req.session 객체에 passport 정보를 저장한다.
 *
 * req.session 객체는 express-session 에서 생성하는 것이므로 passport 미들웨어는 express-session 미들웨어보다 뒤에 연결해야 한다.
 */
app.use(passport.initialize())
app.use(passport.session())

app.use('/', pageRouter)
app.use('/auth', authRouter)
app.use('/post', postRouter)
app.use('/user', userRouter)

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
