// @ts-check

// require

// const animalsA = require('./animals')
// const animalsB = require('./animals')
// const animalsC = require('./animals')

// console.log(animalsA === animalsB)
// console.log(animalsB === animalsC)

/**
 * CommonJS : require
 * ECMAScript : export, import
 *
 * - Node standard library에 있는 모듈은 절대경로를 지정해 가져온다.
 * - 프로젝트 내의 다른 파일(모듈)은 상대경로를 지정해 가져온다.
 * - 절대경로를 지정하면 module.paths의 경로들 중 가장 가까운 경로부터 해당 모듈이 있는지 검사하여 첫 번째 것을 가져온다.
 */

// const animals = require('animals')
// console.log(animals)

// const http = require('http')
// console.log(http)

const { paths } = module
console.log(paths)

const animals = require('animals')
console.log(animals)
