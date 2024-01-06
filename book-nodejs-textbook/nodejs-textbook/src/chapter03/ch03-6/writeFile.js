const fs = require('fs')

fs.promises
  .writeFile(`${__dirname}/writeme.txt`, '글이 입력됩니다.')
  .then(() => fs.promises.readFile(`${__dirname}/writeme.txt`))
  .then((data) => {
    console.log(data.toString())
  })
  .catch((err) => {
    console.error(err)
  })
