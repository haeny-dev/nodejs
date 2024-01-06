const fs = require('fs')

setInterval(() => {
  fs.unlink('./abdsad.js', (err) => {
    if (err) {
      console.error(err)
    }
  })
}, 1000)
