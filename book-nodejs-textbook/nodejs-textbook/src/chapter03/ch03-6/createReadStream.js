const fs = require('fs')
const path = require('path')

const filePath = path.resolve(__dirname, './readme3.txt')

const readStream = fs.createReadStream(filePath, { highWaterMark: 16 })
const data = []

readStream.on('data', (chunk) => {
  data.push(chunk)
  console.log('data : ', chunk, chunk.length)
})

readStream.on('end', () => {
  console.log('end : ', Buffer.concat(data).toString())
})

readStream.on('error', (err) => {
  console.error(err)
})
