// @ts-check

const fs = require('fs')

const stream = fs.createReadStream('src/test')

stream.pipe(process.stdout)