// @ts-check

/* eslint-disable no-new */
/* eslint-disable no-console */

/* 
new Promise((resolve, reject) => {
  console.log('Inside promise')
  reject(new Error('Frist reject'))
  console.log('before resolve')
  resolve('First resolve')
  console.log('after resolve')
})
  .then((value) => {
    console.log('Inside first then')
    console.log('value', value)
  })
  .catch((error) => {
    console.log('error', error)
  })
 */

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random())
    }, duration)
  })
}

sleep(1000)
  .then((value) => {
    console.log('then 1')
    console.log('value', value)
    return sleep(1000)
  })
  .then((value) => {
    console.log('then 2')
    console.log('value', value)
    return sleep(1000)
  })
  .then((value) => {
    console.log('then 3')
    console.log('value', value)
    return sleep(1000)
  })
  .then((value) => {
    console.log('then 4')
    console.log('value', value)
    return sleep(1000)
  })
