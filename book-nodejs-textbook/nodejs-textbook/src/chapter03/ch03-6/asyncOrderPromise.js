const fs = require('fs')
const path = require('path')
const filePath = path.resolve(__dirname, './readme2.txt')

async function main() {
  console.log('시작')
  try {
    let data = await fs.promises.readFile(filePath)
    console.log('1번', data.toString())
    data = await fs.promises.readFile(filePath)
    console.log('2번', data.toString())
    data = await fs.promises.readFile(filePath)
    console.log('3번', data.toString())
    console.log('끝')
  } catch (err) {
    console.error(err)
  }
}

main()
