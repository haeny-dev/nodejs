const zlib = require('zlib')
const fs = require('fs')
const path = require('path')

const readFilePath = path.resolve(__dirname, './readme4.txt')
const writeFilePath = path.resolve(__dirname, './readme4.txt.gz')

const readStream = fs.createReadStream(readFilePath)
const zlibStream = zlib.createGzip()
const writeStream = fs.createWriteStream(writeFilePath)
readStream.pipe(zlibStream).pipe(writeStream)
