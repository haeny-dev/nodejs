const fs = require('fs')
const path = require('path')

const filePath = path.resolve(__dirname, './readme2.txt')

console.log('시작')
let data = fs.readFileSync(filePath)
console.log('1번', data.toString())
data = fs.readFileSync(filePath)
console.log('2번', data.toString())
data = fs.readFileSync(filePath)
console.log('3번', data.toString())
console.log('끝')
