/* eslint-disable */

/**
 * const, let
 */

if (true) {
  var x = 3
}
console.log(x) // 3

if (true) {
  const y = 3
}
// console.log(y) // Uncaught ReferenceError: y is not defined

/**
 * 템플릿 문자열
 */
const num1 = 1
const num2 = 2
const result = num1 + num2
const string = `${num1} 더하기 ${num2}는 '${result}'`
console.log(string) // 1 더하기 2는 '3'

/**
 * 객체 리터럴
 */

/* oldObject */
var sayNode = function () {
  console.log('Node')
}

var es = 'ES'
var oldObject = {
  sayJS: function () {
    console.log('JS')
  },
  sayNode: sayNode,
}
oldObject[es + 6] = 'Fantastic'
oldObject.sayNode() // Node
oldObject.sayJS() // JS
console.log(oldObject.ES6) // Fantastic

/* newObject */
const newObject = {
  sayJS() {
    console.log('JS')
  },
  sayNode,
  [es + 6]: 'Fantistic',
}

newObject.sayNode() // Node
newObject.sayJS() // JS
console.log(newObject.ES6) // Fantastic

/**
 * 화살표 함수
 */

function add1(x, y) {
  return x + y
}

const add2 = (x, y) => {
  return x + y
}

const add3 = (x, y) => x + y

const add4 = (x, y) => x + y

function not1(x) {
  return !x
}

const not2 = (x) => !x

var relationship1 = {
  name: 'zero',
  friends: ['nero', 'hero', 'xero'],
  logFriends: function () {
    var that = this
    this.friends.forEach(function (friend) {
      console.log(that.name, friend)
    })
  },
}

relationship1.logFriends()

const relationship2 = {
  name: 'zero',
  friends: ['nero', 'hero', 'xero'],
  logFriends() {
    this.friends.forEach((friend) => {
      console.log(this.name, friend)
    })
  },
}

relationship2.logFriends()

/**
 * 구조분해 할당
 */
var candyMachine = {
  status: {
    name: 'node',
    count: 5,
  },
  getCandy: function () {
    this.status.count--
    return this.status.count
  },
}

// var getCandy = candyMachine.getCandy
// var count = candyMachine.status.count

const candyMachine2 = {
  status: {
    name: 'node',
    count: 5,
  },
  getCandy() {
    this.status.count--
    return this.status.count
  },
}

const {
  getCandy,
  status: { count },
} = candyMachine2

// getCandy()       // Cannot read properties of undefined (reading 'count')

// var array = ['nodejs', {}, 10, true]
// var node = array[0]
// var obj = array[1]
// var bool = array[3]

const array = ['nodejs', {}, 10, true]
const [node, obj, , bool] = array

/**
 * 클래스
 */

/* 프로토타입 상속 코드 
var Human = function (type) {
  this.type = type || 'human'
}

Human.isHuman = function (human) {
  return human instanceof Human
}

Human.prototype.breathe = function () {
  console.log('h-a-a-a-m')
}

var Zero = function (type, firstName, lastName) {
  Human.apply(this, arguments)
  this.firstName = firstName
  this.lastName = lastName
}

Zero.prototype = Object.create(Human.prototype)
Zero.prototype.constructor = Zero
Zero.prototype.sayName = function () {
  console.log(this.firstName + ' ' + this.lastName)
}
var oldZero = new Zero('human', 'Zero', 'Cho')
Human.isHuman(oldZero) // true
oldZero.breathe() // h-a-a-a-m
oldZero.sayName() // Zero Cho

*/

/* 클래스 기반 코드 */
class Human {
  constructor(type = 'human') {
    this.type = type
  }

  static isHuman(human) {
    return human instanceof Human
  }

  breathe() {
    console.log('h-a-a-a-m')
  }
}

class Zero extends Human {
  constructor(type, firstName, lastName) {
    super(type)
    this.firstName = firstName
    this.lastName = lastName
  }

  sayName() {
    super.breathe()
    console.log(`${this.firstName} ${this.lastName}`)
  }
}

const newZero = new Zero('human', 'Zero', 'New')
Human.isHuman(newZero) // true
newZero.sayName()

/**
 * Promise
 */

const condition = true
const promise = new Promise((resolve, reject) => {
  condition ? resolve('성공') : reject('실패')
})

promise
  .then((message) => {
    console.log(message) // resolve 한 경우 실행
  })
  .catch((error) => {
    console.error(error) // reject 한 경우 실행
  })
  .finally(() => {
    console.log('무조건 실행') // 무조건 실행
  })

promise
  .then((message) => {
    return new Promise((resolve, reject) => {
      resolve(message)
    })
  })
  .then((message2) => {
    console.log(message2)
    return new Promise((resolve, reject) => {
      resolve(message2)
    })
  })
  .then((message3) => {
    console.log(message3)
  })
  .catch((error) => {
    console.error(error)
  })

/*
function findAndSaveUser(Users) {
  Users.findOne({}, (err, user) => {    // 첫 번째 콜백
    if (err) {
      return console.error(err)
    }
    user.name = 'zero'
    user.save((err) => {                // 두 번째 콜백
      if (err) {
        return console.error(err)
      }
      Users.findOne({ gender: 'm' }, (err, user) => {   // 세 번째 콜백
        // 생략
      })
    })
  })
}
*/
/*
function findAndSaveUser(Users) {
  Users.findOne({})
    .then((user) => {
      user.name = 'zero'
      return user.save()
    })
    .then((user) => {
      return Users.findOne({ gender: 'm' })
    })
    .then((user) => {
      // 생략
    })
    .catch((err) => {
      console.error(err)
    })
}
*/

/*
const promise1 = Promise.resolve('성공1')
const promise2 = Promise.resolve('성공2')
Promise.all([promise1, promise2])
  .then((result) => {
    console.log(result) // ['성공1', '성공2']
  })
  .catch((error) => {
    console.error(error)
  })
*/

/*
async function findAndSaveUser(Users) {
  try {
    let user = await Users.findOne({})
    user.name = 'zero'
    user = await user.save()
    user = await Users.findOne({ gender: 'm' })
  } catch (error) {
    console.error(error)
  }
}
*/

const findAndSaveUser = async (Users) => {
  try {
    let user = await Users.findOne({})
    user.name = 'zero'
    user = await user.save()
    user = await Users.findOne({ gender: 'm' })
  } catch (error) {
    console.error(error)
  }
}

const promise1 = Promise.resolve('성공1')
const promise2 = Promise.resolve('성공2')(async () => {
  for await (promise of [promise1, promise2]) {
    console.log(promise)
  }
})()
