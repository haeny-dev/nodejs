const fs = require('fs')
const path = require('path')

const filePath = path.resolve(__dirname, './readme2.txt')

console.log('시작')

fs.readFile(filePath, (err, data) => {
  if (err) {
    throw err
  }
  console.log('1번', data.toString())
})

fs.readFile(filePath, (err, data) => {
  if (err) {
    throw err
  }
  console.log('2번', data.toString())
})

fs.readFile(filePath, (err, data) => {
  if (err) {
    throw err
  }
  console.log('3번', data.toString())
})

console.log('끝')
