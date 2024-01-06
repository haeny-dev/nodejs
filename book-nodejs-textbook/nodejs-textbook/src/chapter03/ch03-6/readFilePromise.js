const fs = require('fs')

async function main() {
  try {
    const data = await fs.promises.readFile(`${__dirname}/readme.txt`)
    console.log(data)
    console.log(data.toString())
  } catch (err) {
    console.error(err)
  }
}

main()
