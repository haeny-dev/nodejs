// @ts-check

// os
const os = require('os')

console.log(
  ['arch', os.arch()],
  ['platform', os.platform()],
  ['cpus', os.cpus()]
)

// dns
const dns = require('dns')

dns.lookup('google.com', (err, address, family) => {
  console.log('address : %j family: Ipv%s', address, family)
})

// path
const path = require('path')
const fs = require('fs')

const filePath = path.resolve(__dirname, './test.txt')
const fileContent = fs.readFileSync(filePath, 'utf-8')
console.log(fileContent)

// http
