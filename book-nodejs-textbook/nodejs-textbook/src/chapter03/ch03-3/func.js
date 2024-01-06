const { odd, even } = require('./var')

function checkOddorEven(num) {
  return num % 2 ? odd : even
}

module.exports = checkOddorEven
