const fs = require('fs')
const path = require('path')

const readFilePath = path.resolve(__dirname, './readme4.txt')
const writeFilePath = path.resolve(__dirname, './writeme3.txt')

const readStream = fs.createReadStream(readFilePath)
const writeStream = fs.createWriteStream(writeFilePath)
readStream.pipe(writeStream)
