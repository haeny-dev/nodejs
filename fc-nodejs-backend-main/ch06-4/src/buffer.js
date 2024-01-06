// @ts-check

/**
 * Buffer
 */
const fs = require('fs')

const bufFromFile = fs.readFileSync('src/test')
console.log(bufFromFile)

// 1 byte = 8bit 는 0 이상 255 이하의 값 0 부터 2의 8제곱 -1까지

const bufFromASCII = Buffer.from([97, 98, 99, 100, 101])
console.log(bufFromASCII)
console.log(bufFromASCII.compare(bufFromFile))


const bufA = Buffer.from([0])
const bufB = Buffer.from([3])
const bufC = Buffer.from([2])
const bufD = Buffer.from([6])

const bufs = [bufA, bufB, bufC, bufD]
// bufs.sort(Buffer.compare)
bufs.sort((a, b) => a.compare(b))
console.log(bufs)

const buf = Buffer.from([0, 0, 1, 0])

function readInt32LE(array){
    return (
        array[0] + 
        array[1] * 256 + 
        array[2] * 256 ** 2 + 
        array[3] * 256 ** 3 
    )
}

function readInt32BE(array){
    return (
        array[3] + 
        array[2] * 256 + 
        array[1] * 256 ** 2 + 
        array[0] * 256 ** 3 
    )
}


// LE : Litte Endian
// BE : Big Endian
const offset = 0
console.log(`LE: our function: `, readInt32LE(buf))
console.log(`LE: original function: `, buf.readInt32LE(offset))
console.log(`BE: our function: `, readInt32BE(buf))
console.log(`BE: original function: `, buf.readInt32BE(offset))





