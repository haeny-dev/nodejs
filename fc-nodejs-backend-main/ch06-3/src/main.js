// @ts-check

const { log } = console

const a = require('./my-module')
const b = require('./My-module')
const c = require('./my-Module')

log(a === b, b === c)

const fs = require('fs')

const FILENAME = 'src/main.js'

// callback-style
/*
fs.readFile(FILENAME, 'utf-8', (err, result) => {
  if (err) {
    console.log(err)
  } else {
    console.log(result)
  }
})
*/

// sync-style
/*
try {
  const result = fs.readFileSync(FILENAME, 'utf-8')
  console.log(result)
} catch (error) {
  console.log(error)
}
*/

// promise-style ==>> 가장 추천
async function main() {
  try {
    const result = await fs.promises.readFile(FILENAME, 'utf-8')
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}

main()
