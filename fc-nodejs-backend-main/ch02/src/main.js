// @ts-check
// Formatting, Linting, Type Checking

// 1. Formatting: Prettier
/* eslint-disable-next-line no-console */
console.log('Hello, World!!')

// 2. Linting: ESLint
const x = 1
console.log(x)

/* eslint-disable-next-line node/no-exports-assign */
exports = 3

// 3. Type Checking : TypeScript
// const someString = 'Hello'
// const result = Math.log(someString)
// console.log(result)

const http = require('http')

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.end('Hello!')
})

const PORT = 4000
server.listen(PORT, () => {
  console.log(`The server is listening at port : ${PORT}.`)
})

/**
 * VSCode JavaScript Development Setup
 *
 *              |   Formatting    |   Linting                     |   Type checking
 * -------------+-----------------+-------------------------------+-------------------
 * Package      |   prettier      |   eslint                      |   typescript
 * -------------+-----------------+-------------------------------+-------------------
 *              |                 |   eslint-config-airbnb-base   |   @types/node
 * Additional   |                 |   eslint-config-prettier      |
 * dependencies |                 |   eslint-plugin-import        |
 *              |                 |   eslint-plugin-node          |
 * -------------+-----------------+-------------------------------+-------------------
 *              |                 |                               |
 * Config file  |   .prettierrc   |   .eslintrc.js                |   jsconfig.json
 *              |                 |                               |
 * -------------+-----------------+-------------------------------+-------------------
 * VSCode       |         O       |               O               |         X
 * extensions   |                 |                               |
 * -------------+-----------------+-------------------------------+-------------------
 */
