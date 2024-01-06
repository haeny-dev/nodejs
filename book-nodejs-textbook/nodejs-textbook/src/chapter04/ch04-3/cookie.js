const http = require('http')

const PORT = 4000

const server = http.createServer((req, res) => {
  console.log(req.url, req.headers.cookie)
  res.writeHead(200, { 'Set-Cookie': 'mycookie=test' })
  res.end('Hello Cookie')
})

server.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 서버 대기 중입니다.`)
})
