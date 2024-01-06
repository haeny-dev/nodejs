const fs = require('fs').promises
const path = require('path')

const dirname = path.resolve(__dirname, './folder')
const filename = path.resolve(dirname, './newfile.js')

fs.readdir(dirname)
  .then((dir) => {
    console.log('폴더 내용 확인', dir)
    return fs.unlink(filename)
  })
  .then(() => {
    console.log('파일 삭제 성공')
    return fs.rmdir(dirname)
  })
  .then(() => {
    console.log('폴더 삭제 성공')
  })
  .catch((err) => {
    console.error(err)
  })
