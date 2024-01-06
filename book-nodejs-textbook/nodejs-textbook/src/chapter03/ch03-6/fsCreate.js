const fs = require('fs').promises
const constants = require('fs').constants
const path = require('path')

const dirPath = path.resolve(__dirname, './folder')
const filePath = path.resolve(dirPath, './file.js')
const newFilePath = path.resolve(dirPath, './newfile.js')

fs.access(dirPath, constants.F_OK | constants.W_OK | constants.R_OK)
  .then(() => Promise.reject('이미 폴더 있음'))
  .catch((err) => {
    if (err.code === 'ENOENT') {
      console.log('폴더 없음')
      return fs.mkdir(dirPath)
    }
    return Promise.reject(err)
  })
  .then(() => {
    console.log('폴더 만들기 성공')
    return fs.open(filePath, 'w')
  })
  .then((fd) => {
    console.log('빈 파일 만들기 성공', fd)
    return fs.rename(filePath, newFilePath)
  })
  .then(() => {
    console.log('이름 바꾸기 성공')
  })
  .catch((err) => {
    console.error(err)
  })
