const fs = require('fs').promises
const path = require('path')

const readFilename = path.resolve(__dirname, './readme4.txt')
const writeFilename = path.resolve(__dirname, './writeme4.txt')

fs.copyFile(readFilename, writeFilename)
  .then(() => {
    console.log('복사 완료')
  })
  .catch((err) => {
    console.error(err)
  })
