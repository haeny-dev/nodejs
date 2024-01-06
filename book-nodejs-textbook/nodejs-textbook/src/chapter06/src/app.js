const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const nunjucks = require('nunjucks')

try {
  fs.readdirSync(path.resolve(__dirname, './uploads'))
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.')
  fs.mkdirSync(path.resolve(__dirname, './uploads'))
}

require('dotenv').config()

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, path.resolve(__dirname, './uploads/'))
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname)
      done(null, path.basename(file.originalname, ext) + Date.now() + ext)
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})

const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')

const app = express()
app.set('port', process.env.PORT || 4000)
// app.set('views', path.resolve(__dirname, './views'))
// app.set('view engine', 'pug')
app.set('view engine', 'html')

nunjucks.configure(path.resolve(__dirname, './views'), {
  express: app,
  watch: true,
})

app.use(morgan('dev'))
app.use('/', express.static(path.resolve(__dirname, './public')))
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
    name: 'session-cookie',
  })
)

app.use('/', indexRouter)
app.use('/user', userRouter)

app.use((req, res, next) => {
  res.status(404).send('Not Found')
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send(err.message)
})

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중')
})
