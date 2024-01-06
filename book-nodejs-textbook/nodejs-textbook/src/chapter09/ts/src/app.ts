import express, { Request, Response, NextFunction } from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import nunjucks from 'nunjucks'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const { PORT, COOKIE_SECRET } = process.env
const app = express()
app.set('view engine', 'html')
nunjucks.configure('src/views', {
  express: app,
  watch: true,
})

app.use(express.static(path.resolve(__dirname, './public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(COOKIE_SECRET))
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
)

app.listen(PORT, () => {
  console.log(`This server is listening at port: ${PORT}`)
})
