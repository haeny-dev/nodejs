// @ts-check

// __dirname
// __filename
console.log('__dirname', __dirname)
console.log('__filename', __filename)

// process
process.stdin.setEncoding('utf-8')
process.stdin.on('data', data => {
    console.log(data, data.length)
})

process.stdin.pipe(process.stdout)

console.log(process.argv)

let count = 0

// setInterval
const handle = setInterval(() => {
    console.log('Interval')
    count += 1

    if(count === 4){
        console.log('done!')
        clearInterval(handle)
    }
}, 1000)

// setTimeout
const timeoutHandle = setTimeout(() => {
    console.log('Timeout')
}, 1000)

clearTimeout(timeoutHandle)
