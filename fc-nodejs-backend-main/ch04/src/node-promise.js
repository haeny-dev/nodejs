// @ts-check

const fs = require('fs')

/* 
fs.readFile('ch04.md', 'utf-8', (error, value) => {
  console.log(value)
})
 */

/**
 *
 * @param {string} fileName
 */
function readFileInPromise(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf-8', (error, value) => {
      if (error) {
        reject(error)
      }
      resolve(value)
    })
  })
}

// readFileInPromise('ch04.md').then((value) => console.log(value))
// Node 에서 제공하고 있는 Promise 형태의 API
// fs.promises.readFile('ch04.md', 'utf-8').then((value) => console.log(value))

async function main() {
  try {
    const result = await fs.promises.readFile('ch04.mda', 'utf-8')
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}

main()
