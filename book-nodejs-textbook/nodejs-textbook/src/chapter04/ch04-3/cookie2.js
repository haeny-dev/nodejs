const http = require('http')
const fs = require('fs')
const url = require('url')
const qs = require('querystring')

const PORT = 4000

const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v)
      return acc
    }, {})

const server = http.createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie)

  // 주소가 /login 으로 시작하는 경우
  if (req.url.startsWith('/login')) {
    const { query } = url.parse(req.url)
    const { name } = qs.parse(query)

    // 쿠키 유효 시간을 현재 시간 + 5분으로 설정
    const expires = new Date()
    expires.setMinutes(expires.getMinutes() + 5)
    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': `name=${encodeURIComponent(
        name
      )}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
    })
    res.end()
  } else if (cookies.name) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end(`${cookies.name}님 안녕하세요.`)
  } else {
    try {
      const data = await fs.promises.readFile(`${__dirname}/cookie2.html`)
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(data)
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end(err.message)
    }
  }
})

server.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 서버 대기 중입니다.`)
})
