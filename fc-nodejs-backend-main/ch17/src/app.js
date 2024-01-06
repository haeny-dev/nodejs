// @ts-check

const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.set('views', 'src/views')
app.set('view engine', 'pug')

const mainRouter = require('./routers/main')
const userRouter = require('./routers/user')
const { verifyJWT } = require('./jwt')
const { getUsersCollection } = require('./mongo')
const setupPassportFBAuth = require('./passport-auth-fb')

app.use(cookieParser())
app.use(async (req, res, next) => {
  /* eslint-disable camelcase */
  const { access_token } = req.cookies
  if (access_token) {
    /** @type {string} */
    try {
      const userId = await verifyJWT(access_token)
      if (userId) {
        const users = await getUsersCollection()
        const user = await users.findOne({
          id: userId,
        })
        if (user) {
          // @ts-ignore
          req.user = user
        }
      }
    } catch (e) {
      console.log('Invalid token', e)
    }
  }
  next()
})

setupPassportFBAuth(app)
app.use('/', mainRouter)
app.use('/user', userRouter)
app.use('/public', express.static('src/public'))

// @ts-ignore
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.statusCode = err.statusCode || 500
  res.send(err.message)
})

module.exports = app
