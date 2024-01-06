const fs = require('fs')
const path = require('path')

const filePath = path.resolve(__dirname, './writeme2.txt')

const writeStream = fs.createWriteStream(filePath)
writeStream.on('finish', () => {
  console.log('파일 쓰기 완료')
})

writeStream.write('이 글을 씁니다.\n')
writeStream.write('한 번 더 씁니다.')
writeStream.end()
