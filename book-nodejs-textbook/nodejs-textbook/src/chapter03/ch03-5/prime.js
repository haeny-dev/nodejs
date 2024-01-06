const min = 2
const max = 10000000

const primes = []

function generatePrimes(start, range) {
  let isPrime = true
  const end = start + range
  for (let i = start; i < end; i += 1) {
    for (let j = min; j < Math.sqrt(end); j += 1) {
      if (i !== j && i % j === 0) {
        isPrime = false
        break
      }
    }

    if (isPrime) {
      primes.push(i)
    }
    isPrime = true
  }
}

console.time('prime')
generatePrimes(min, max - min)
console.timeEnd('prime')
console.log(primes.length)
