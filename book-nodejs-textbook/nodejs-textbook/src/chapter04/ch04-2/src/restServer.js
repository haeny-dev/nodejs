const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = 4000

const users = {}

const server = http.createServer(async (req, res) => {
  try {
    console.log(req.method, req.url)

    if (req.method === 'GET') {
      if (req.url === '/') {
        const data = await fs.promises.readFile(
          path.resolve(__dirname, './public/restFront.html')
        )
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        return res.end(data)
        // eslint-disable-next-line no-else-return
      } else if (req.url === '/about') {
        const data = await fs.promises.readFile(
          path.resolve(__dirname, './public/about.html')
        )
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        return res.end(data)
      } else if (req.url === '/users') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
        return res.end(JSON.stringify(users))
      }

      // 주소가 / 나 /about 이 아니면
      try {
        const data = await fs.promises.readFile(
          path.resolve(__dirname, `.${req.url}`)
        )
        return res.end(data)
      } catch (err) {
        // 주소에 해당하는 라우트를 못 찾았다는 404 Not Fount Error 발생
      }
    } else if (req.method === 'POST') {
      if (req.url === '/user/') {
        let body = ''
        req.on('data', (data) => {
          body += data
        })

        return req.on('end', () => {
          console.log('POST 본문(body): ', body)
          const { name } = JSON.parse(body)
          const id = Date.now()
          users[id] = name
          res.writeHead(201)
          return res.end('등록 성공')
        })
      }
    } else if (req.method === 'PUT') {
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2]
        let body = ''
        req.on('data', (data) => {
          body += data
        })

        return req.on('end', () => {
          console.log('PUT 본문(Body): ', body)
          users[key] = JSON.parse(body).name
          return res.end(JSON.stringify(users))
        })
      }
    } else if (req.method === 'DELETE') {
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2]
        delete users[key]
        return res.end(JSON.stringify(users))
      }
    }

    res.writeHead(404)
    return res.end('NOT FOUND')
  } catch (err) {
    console.error(err)
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end(err.message)
  }
})

server.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 서버 대기 중입니다.`)
})
