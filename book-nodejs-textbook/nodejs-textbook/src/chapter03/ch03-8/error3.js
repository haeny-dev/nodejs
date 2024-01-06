const fs = require('fs')

setInterval(() => {
  fs.promises.unlink('./dsadsad.js')
}, 1000)
