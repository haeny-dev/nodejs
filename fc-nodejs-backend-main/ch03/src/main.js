/* eslint-disable */

var numCounters = 0

function getCounter() {
  numCounters += 1

  var result = {
    count: count,
    total: 0,
  }

  function count() {
    result.total += 1
  }

  return result
}

var counterA = getCounter()
counterA.count()
counterA.count()

var counterB = getCounter()
counterB.count()

console.log(counterA.total, counterB.total, numCounters)
