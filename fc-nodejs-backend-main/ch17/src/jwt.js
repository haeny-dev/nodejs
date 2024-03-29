const jwt = require('jsonwebtoken')

const { SERVER_SECRET } = process.env

async function signJWT(value) {
  return new Promise((resolve, reject) => {
    jwt.sign(value, SERVER_SECRET, (err, encodeed) => {
      if (err) {
        reject(err)
      } else {
        resolve(encodeed)
      }
    })
  })
}

async function verifyJWT(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SERVER_SECRET, (err, value) => {
      if (err) {
        reject(err)
      } else {
        resolve(value)
      }
    })
  })
}

module.exports = {
  signJWT,
  verifyJWT,
}
