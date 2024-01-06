# Chapter02. 알아두어야 할 자바스크립트

## 📌 2.1 ES2015+

### ➕ 2.1.1 const, let

- 공통점

  - 블록 스코프

    ```javascript
    if (true) {
      var x = 3
    }
    console.log(x) // 3

    if (true) {
      const y = 3
    }
    console.log(y) // Uncaught ReferenceError: y is not defined
    ```

    - `var` 은 함수 스코프를 가지므로 if문의 블록과 관계없이 접근할 수 있음.
    - `const`와 `let`은 블록 스코프를 가지므로 블록 밖에서는 변수에 접근할 수 없습니다.

- 차이점

  - `const`는 한 번 값을 할당하면 다른 값을 할당할 수 없습니다. 또한, 초기화할 때 값을 할당하지 않으면 에러가 발생합니다.

- 자바스크립트를 사용할 때 한 번 초기화했던 변수에 다른 값을 할당하는 경우는 의외로 적습니다. 따라서 변수 선업시에는 기본적으로 const를 사용하고, 다른 값을 할당해야 하는 상황이 생겼을 때 let을 사용하면 됩니다.

### ➕ 2.1.2 템플릿 문자열

- 이 문자열은 기존 문자열과 다르게 백틱(`)으로 감쌉니다.
  ```javascript
  const num1 = 1
  const num2 = 2
  const result = num1 + num2
  const string = `${num1} 더하기 ${num2}는 '${result}'`
  console.log(string) // 1 더하기 2는 '3'
  ```

### ➕ 2.1.3 객체 리터럴

```javascript
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
```

- `sayJS` 같은 객체의 메서드에 함수를 연결할 때 콜론과 function을 붙이지 않아도 됩니다.
- `sayNode` 처럼 속성명과 변수명이 동일한 경우에는 한 번만 써도 됩니다.
- 객체의 속성명은 동적으로 생성할 수 있습니다.
  - 예전 문법에서는 객체 리터럴 바깥에서 [es + 6]를 해야 했습니다.
  - ES2015에서는 객체 리터럴 안에 동적 선언을 해도 됩니다.

### ➕ 2.1.4 화살표 함수

```javascript
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
```

- 화살표 함수에서는 function 대신 `=>` 기호를 함수를 선언합니다. 또한 변수에 대입하면 나중에 재사용할 수 있습니다.
- 화살표 함수에서 내부에 return 문밖에 없는 경우에는 return문을 줄일 수 있습니다.

```javascript
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
```

- 기존 function과 다른 점은 this 바인드 방식입니다.
- relationship1 의 경우 function 선언문을 사용하여 각자 다른 함수 스코프의 this를 가지므로 that이라는 변수를 사용해서 간접적으로 접근하고 있습니다.
- relationship2 의 경우 forEach 문에서 화살표 함수를 사용하여 바깥 스코프인 logFriends 의 this를 그대로 사용할 수 있습니다. 상위 스코프의 this를 그대로 물려받는 것입니다.

### ➕ 2.1.5 구조분해 할당

- 구조분해 할당을 사용하면 객체와 배열로부터 속성이나 요소를 쉽게 꺼낼 수 있습니다.

```javascript
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

var getCandy = candyMachine.getCandy
var count = candyMachine.status.count

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
```

- 객체 안의 속성을 찾아서 변수와 매칭합니다. count처럼 여러 단계 안의 속성도 찾을 수 있습니다.
- 구조분해 할당을 사용하면 함수의 this가 달라질 수 있습니다. 달라진 this를 원래대로 바꿔주려면 bind 함수를 따로 사용해야 합니다.
- 배열에 대한 구조분해 할당 문법

  ```javascript
  var array = ['nodejs', {}, 10, true]
  var node = array[0]
  var obj = array[1]
  var bool = array[3]

  const array = ['nodejs', {}, 10, true]
  const [node, obj, , bool] = array
  ```

### ➕ 2.1.6 클래스

```javascript
/* 프로토타입 상속 코드 */
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
// h-a-a-a-m
// Zero New
```

- 클래스 문법으로 바뀌었더라도 자바스크립트는 프로토타입 기반으로 동작한다는 것을 명심해야 합니다.

### ➕ 2.1.7 프로미스

- ES2015부터는 자바스크립트와 노드의 API들이 콜백 대신 프로미스(Promise) 기반으로 재구성되며, 콜백 지옥 현상을 극복했다는 평가를 받고 있습니다.
- 프로미스는 다음과 같은 규칙이 있습니다.

  ```javascript
  const condition = true
  const promise = new Promise((resolve, reject) => {
    condition ? resolve('성공') : reject('실패')
  })

  // 이 사이에 다른 코드가 들어갈 수 있음

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
  ```

- 프로미스는 실행은 바로 하되 결괏값은 나중에 받는 객체입니다.
- then 이나 catch 에서 다시 다른 then이나 catch를 붙일 수 있습니다.

  ```javascript
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
  ```

- 콜백을 사용하는 패턴을 프로미스로 변경할 수 있습니다.

  ```javascript
  function findAndSaveUser(Users) {
    Users.findOne({}, (err, user) => {
      // 첫 번째 콜백
      if (err) {
        return console.error(err)
      }
      user.name = 'zero'
      user.save((err) => {
        // 두 번째 콜백
        if (err) {
          return console.error(err)
        }
        Users.findOne({ gender: 'm' }, (err, user) => {
          // 세 번째 콜백
          // 생략
        })
      })
    })
  }

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
  ```

  - 모든 콜백 함수를 위와 같이 변경할 수 있는 것은 아닙니다. 메서드가 프로미스 방식을 지원해야 합니다.
  - 위의 코드는 findOne과 save 메서드가 내부적으로 프로미스 방식으로 구현되어 있다고 가정했기에 가능합니다.
  - 프로미스 여러 개를 한 번에 실행할 수 있는 방법이 있습니다.
    - Promise.all 에 넣으면 모두 resolve될 때까지 기다렸다가 then으로 넘어갑니다.
    - Promise 중 하나라도 reject가 되면 catch로 넘어갑니다.

  ```javascript
  const promise1 = Promise.resolve('성공1')
  const promise2 = Promise.resolve('성공2')
  Promise.all([promise1, promise2])
    .then((result) => {
      console.log(result) // ['성공1', '성공2']
    })
    .catch((error) => {
      console.error(error)
    })
  ```

### ➕ 2.1.8 async/await

- 노드 7.6 버전부터 지원되는 기능입니다. ES2017에서 추가되었습니다.
- 2.1.7 절의 메서드를 async/await 을 사용하여 리팩토링

  ```javascript
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

  // Arrow Function
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
  ```

- for문과 async/await 을 같이 써서 프로미스를 순차적으로 실행할 수 있습니다.

  - 노드 10 버전부터 지원하는 ES2018 문법입니다.

  ```javascript
  const promise1 = Promise.resolve('성공1')
  const promise2 = Promise.resolve('성공2')(async () => {
    for await (promise of [promise1, promise2]) {
      console.log(promise)
    }
  })()
  ```

- async 함수의 반환값은 항상 Promise로 감싸집니다.

  - 따라서 실행 후 then을 붙이거나 또 다른 async 함수 안에서 await을 붙여서 처리할 수 있습니다.

  ```javascript
  async function findAndSaveUser(Users) {
    // 생략
  }

  findAndSaveUser().then(() => {
    // 생략
  })

  async function other() {
    const result = await findAndSaveUser()
  }
  ```

## 📌 2.2 프런트엔드 자바스크립트

### ➕ 2.2.1 AJAX

- AJAX(Asynchronous Javascript And XML)는 비동기적 웹 서비스를 개발할 때 사용하는 기법입니다.
- 이름에 XML이 있지만 꼭 XML을 사용해야 하는 것은 아니며, 요즘에는 JSON을 많이 사용합니다.
- AJAX 요청은 jQuery나 axios 같은 라이브러리를 이용해서 보냅니다.

  ```javascript
  axios
    .get('https://www.zerocho.com/api/get')
    .then((result) => {
      console.log(result)
      console.log(result.data)
    })
    .catch((error) => {
      console.error(error)
    })
  ```

- axios.get도 내부에 Promise 로 구현되어 있어, then 과 catch를 사용할 수 있습니다.
- 프로미스이므로 async/await 방식으로 변경할 수 있습니다.

  ```javascript
  ;(async () => {
    try {
      const result = await axios.get('https://www.zerocho.com/api/get')
      console.log(result)
      console.log(result.data)
    } catch (error) {
      console.error(error)
    }
  })()
  ```

- POST 방식의 호출

  ```javascript
  ;(async () => {
    try {
      const result = await axios.post('https://www.zerocho.com/api/post/json', {
        name: 'zerocho',
        birth: 1994,
      })
      console.log(result)
      console.log(result.data)
    } catch (error) {
      console.error(error)
    }
  })()
  ```

### ➕ 2.2.2 FormData

- HTML form 태그의 데이터를 동적으로 제어할 수 있는 기능입니다.

```javascript
const formData = new FormData()
formData.append('name', 'zerocho')
formData.append('item', 'orange')
formData.append('item', 'melon')
formData.has('item') // true
formData.has('money') // false
formData.get('item') // orange
formData.getAll('item') // ['orange', 'melon']
formData.append('test', ['hi', 'zero'])
formData.get('test') // hi, zero
formData.delete('test')
formData.get('test') // null
formData.set('item', 'apple')
formData.getAll('item') // ['apple']
```

- 생성된 객체의 append 메서드로 키-값 형식의 데이터를 저장할 수 있습니다.
- 키 하나에 여러 개의 값을 추가해도 됩니다.
- FormData 객체를 이용하여 axios 로 데이터를 보낼 수 있습니다.

```javascript
;(async () => {
  try {
    const formData = new FormData()
    formData.append('name', 'zerocho')
    formData.append('birth', 1994)
    const result = await axios.post('https://www.zerocho.com/api/post/formdata')
    console.log(result)
    console.log(result.data)
  } catch (error) {
    console.error(error)
  }
})()
```

### ➕ 2.2.3 encodeURIComponent, decodeURIComponent

- `http://localhost:4000/search/노드` 와 같이 한글이 들어가는 경우 서버가 한글 주소를 이해하지 못하는 경우가 있는데,
- 이런 경우 window 객체의 메서드인 encodeURIComponent 메서드를 사용합니다.

```javascript
;(async () => {
  try {
    const result = await axios.get(
      `https://www.zerocho.com/api/search/${encodeURIComponent('노드')}`
    )
    console.log(result)
    console.log(result.data)
  } catch (error) {
    console.error(error)
  }
})()
```

- `노드` 라는 한글이 `%EB%85%B8%EB%93%9C` 라는 문자열로 변환되었습니다.
- 받는 쪽에서는 decodeURIComponent를 사용하면 됩니다.

### ➕ 2.2.4 데이터 속성과 dataset

- 노드를 웹 서버로 사용하는 경우, 클라이언트(프런트엔드)와 빈번하게 데이터를 주고받게 됩니다.
- 프런트엔드에 데이터를 내려보낼 때 가장 고려해야 할 점은 보안입니다. 비밀번호와 같은 민감한 정보는 내려보내지 않아야 합니다.
- 보안과 무관한 데이터를 내려보낼 때, 자바스크립트 변수에 저장해도되지만 HTML과 관련된 데이터를 저장하는 공식적인 방법이 데이터 속성(data attribute) 입니다.

```html
<html>
  <ul>
    <li data-id="1" data-user-job="programmer">Zero</li>
    <li data-id="2" data-user-job="designer">Nero</li>
    <li data-id="3" data-user-job="programmer">Hero</li>
    <li data-id="4" data-user-job="ceo">Kero</li>
  </ul>
  <script>
    console.log(document.querySelector('li').dataset)
    // { id : '1', userJob: 'programmer' }
  </script>
</html>
```

- 태그의 속성으로 data- 로 시작하는 이들이 데이터 속성입니다.
- script 에서 dataset 속성을 통해 태그의 데이터 속성에 접근이 가능합니다.
- 반대로 dataset 에 데이터를 넣어도 HTML 태그에 반영됩니다.
