# Chapter03. 노드 기능 알아보기

## 📌 3.1 REPL 사용하기

- 자바스크립트는 스크립트 언어이므로 미리 컴파일을 하지 않아도 즉석에서 코드를 실행할 수 있습니다.
- 노드의 콘솔을 입력한 코드를 읽고(Read), 해석하고(Eval), 결과물을 반환하고(Print), 종료할 때까지 반복한다(Loop)고 해서 REPL(Read Eval Print Loop)이라고 부릅니다.

## 📌 3.2 JS 파일 실행하기

- 노드 콘솔에서 `node [자바스크립트 파일 경로]` 로 실행합니다.
- 확장자(.js)는 생략해도 됩니다.

## 📌 3.3 모듈로 만들기

- 노드는 코드를 모듈로 만들 수 있다는 점에서 브라우저의 자바스크립트와 다릅니다.
- `모듈`이란

  - 특정한 기능을 하는 함수나 변수들의 집합입니다.
  - 예를 들어, 수학에 관련된 코드들만 모아서 모듈을 하나 만들 수 있습니다.
    - 모듈은 자체로도 하나의 프로그램이면서 다른 프로그램의 부품으로도 사용할 수 있습니다.
    - 모듈로 만들어두면 여러 프로그램에 해당 모듈을 재사용할 수 있습니다.
    - 보통 파일 하나가 모듈 하나가 됩니다. 파일별로 코드를 모듈화할 수 있어 관리하기 편합니다.

- 브라우저의 모듈
  - 2015년 자바스크립트에도 import/export 라는 모듈 개념이 도입되었지만, 브라우저에는 구현되지 않아서 사용할 수 없었습니다.
  - 크롬 60 버전부터 드디어 브라우저에서도 모듈을 사용할 수 있게 되었습니다.

```javascript
// var.js
const odd = '홀수입니다.'
const even = '짝수입니다.'

module.exports = {
  odd,
  even,
}

// func.js
const { odd, even } = require('./var')

function checkOddorEven(num) {
  return num % 2 ? odd : even
}

module.exports = checkOddorEven

// index.js
const { odd, even } = require('./var')
const checkNumber = require('./func')

function checkStringOddorEven(str) {
  return str.length % 2 ? odd : even
}

console.log(checkNumber(10)) // 짝수입니다.
console.log(checkStringOddorEven('hello')) // 홀수입니다.
```

- func.js 는 var.js를 참조합니다.
- index.js 는 var.js 와 func.js 를 모두 참조합니다.
- 모듈 하나가 여러 개의 모듈을 사용할 수 있을 뿐만 아니라, 모듈 하나가 여러 개의 모듈에 사용될 수 있습니다.

  - 여러 파일에 걸쳐 재사용되는 함수나 변수를 모듈로 만들어두면 편리합니다.
  - 그러나, 모듈이 많아지고 모듈 간의 관계가 얽히게 되면 구조를 파악하기 어렵다는 단점도 있습니다.

- ES2015 모듈

  ```javascript
  // func.mjs
  import { odd, even } from './var'

  function checkOddOrEven(num) {
    return num % 2 ? odd : even
  }

  export default checkOddOrEven
  ```

  - require => import
  - module.exports => export default
  - 단순히 글자만 바꿔서는 제대로 동작하지 않을 수 있습니다.
  - 노드에서도 9 버전부터 ES2015의 모듈 시스템을 사용할 수 있습니다. 하지만 파일의 확장자를 mjs로 지정해야 하는 제한이 있습니다.
  - mjs 확장자 대신 js 확장자를 사용하면서 ES2015 모듈을 사용하려면 package.json 에 type:"module" 속성을 넣으면 됩니다.

## 📌 3.4 노드 내장 객체 알아보기

### ➕ 3.4.1 global

- 브라우저의 window와 같은 전역 객체입니다.
- 전역 객체이므로 모든 파일에서 접근할 수 있습니다.
- window.open 에서 window를 생략하고 open으로 사용할 수 있듯이 global도 생략할 수 있습니다.

  - require 함수도 global.require 에서 global이 생략된 것입니다.
  - console 객체도 원래는 global.console 입니다.

- 전역 객체라는 점을 이용하여 파일 간에 간단한 데이터를 공유할 때 사용하기도 합니다.

```javascript
// globalA.js
module.exports = () => global.message

// globalB.js
const A = require('./globalA')

global.message = '안녕하세요'
console.log(A()) // 안녕하세요
```

### ➕ 3.4.2 console

- console 객체는 보통 디버깅을 위해 사용합니다.
  - 개발하면서 변수에 값이 제대로 들어 있는지 확인하기 위해 사용하고
  - 에러 발생시 에러 ㅋ내용을 콘솔에 표시하기 위해 사용하며
  - 코드 실행 시간을 알아보려고 할 때도 사용합니다.

```javascript
const string = 'abc'
const number = 1
const boolean = true
const obj = {
  outside: {
    inside: {
      key: 'value',
    },
  },
}

console.time('전체 시간')

console.log('평범한 로그입니다 쉼표로 구분해 여러 값을 찍을 수 있습니다.')
console.log(string, number, boolean)

console.error('에러 메시지는 console.error에 담하주세요.')

console.table([
  { name: '제로', birth: 1994 },
  { name: 'hero', birth: 1988 },
])

console.dir(obj, { colors: false, depth: 2 })
console.dir(obj, { colors: true, depth: 1 })

console.time('시간 측정')
for (let i = 0; i < 100000; i += 1) {}
console.timeEnd('시간 측정')

function b() {
  console.trace('에러 위치 추적')
}

function a() {
  b()
}

a()

console.timeEnd('전체 시간')
```

- console.time(레이블)
  - console.timeEnd(레이블)과 대응되어 같은 레이블을 가진 time과 timeEnd 사이의 시간을 측정합니다.
- console.log(내용)
  - 평범한 로그를 콘솔에 표시합니다.
- console.error(에러 내용)
  - 에러를 콘솔에 표시합니다.
- console.table(배열)
  - 배열의 요소로 객체 리터럴을 넣으면, 객체의 속성들이 테이블 형식으로 표현됩니다.
- console.dir(객체, 옵션)
  - 객체를 콘솔에 표시할 때 사용합니다.
  - 옵션의 colors 는 콘솔에 색이 추가여부이고
  - depth는 객체 안의 객체를 몇 단계까지 보여줄지를 결정합니다. 기본값은 2입니다.
- console.trace(레이블)
  - 에러가 어디서 발생했는지 추적할 수 있게 합니다.
  - 일반적으로 에러 발생 시 에러 위치를 알려주므로 자주 사용하지 않습니다.

### ➕ 3.4.3 타이머

- 타이머 함수

  - setTimeout(콜백 함수, 밀리초)
    - 주어진 밀리초(1,000 분의 1초) 이후에 콜백 함수를 실행합니다.
  - setInterval(콜백 함수, 밀리초)
    - 주어진 밀리초마다 콜백 함수를 반복 실행합니다.
  - setImmediate(콜백 함수)
    - 콜백 함수를 즉시 실행합니다.

- 이 타이머 함수들은 모두 아이디를 반환합니다. 아이디를 사용하여 타이머를 취소할 수 있습니다.
  - clearTimeout(아이디) : setTimeout 을 취소합니다.
  - clearInterval(아이디) : setInterval 을 취소합니다.
  - clearImmediate(아이디) : setImmediate 을 취소합니다.

```javascript
const timeout = setTimeout(() => {
  console.log('1.5초 후 실행')
}, 1500)

const interval = setInterval(() => {
  console.log('1초마다 실행')
}, 1000)

const timeout2 = setTimeout(() => {
  console.log('실행되지 않습니다.')
}, 3000)

setTimeout(() => {
  clearTimeout(timeout2)
  clearInterval(interval)
}, 2500)

const immediate = setImmediate(() => {
  console.log('즉시 실행')
})

const immediate2 = setImmediate(() => {
  console.log('실행되지 않습니다.')
})

clearImmediate(immediate2)
```

- setImmediate(콜백) 과 setTimeout(콜백, 0)
  - setImmediate(콜백) 과 setTimeout(콜백, 0) 에 담긴 콜백 함수는 이벤트 루프를 거친 뒤 즉시 실행됩니다.
  - setImmediate 가 항상 setTimeout(콜백, 0) 보다 먼저 호출되지는 않습니다.

### ➕ 3.4.4 \_\_filename, \_\_dirname

- 노드는 \_\_filename, \_\_dirname 이라는 키워드로 경로에 대한 정보를 제공합니다.

```javascript
console.log(__filename) // /Users/haeny/dev/workspace/TIL/book/nodejs-textbook/src/chapter03/filename.js
console.log(__dirname) // /Users/haeny/dev/workspace/TIL/book/nodejs-textbook/src/chapter03
```

### ➕ 3.4.5 module, exports, require

- **module**

  - module.exports 뿐만 아니라 exports 객체를 이용해서 모듈을 만들 수도 있습니다.

    ```javascript
    exports.odd = '홀수입니다.'
    exports.even = '짝수입니다.'
    ```

  - 동일하게 동작하는 이유는 module.exports 와 exports가 같은 객체를 참조하기 때문입니다.

    - exports와 module.exports의 관계

      ```plainText
              참조                  참조
      exports ====> module.exports ====> {}
      ```

      - exports 객체를 사용할 때는 module.exports와의 참조 관계가 깨지지 않도록 주의해야 합니다.
      - module.exports에는 어떤 값을 대입해도 되지만, exports 에는 반드시 객체처럼 속성명과 속성값을 대입해야 합니다.
      - exports 에 다른 값을 대입하면 객체의 참조 관계가 끊겨 더 이상 모듈로 기능하지 않습니다.
      - exports 를 사용할 때는 객체만 사용할 수 있으므로 module.exports에 함수를 대입한 경우에는 exports 로 변경할 수 없습니다.

  - 노드에서 `this` 는 무엇일까요?

    ```javascript
    console.log(this)
    console.log(this === module.exports)
    console.log(this === exports)

    function whatIsThis() {
      console.log('function', this === exports, this === global)
    }

    whatIsThis()
    ```

    - 최상위 스코프에 존재하는 this 는 module.exports(또는 expo rts 객체)를 가리킵니다.
    - 함수 선언문 내부의 this는 global 객체를 가리킵니다.

- **require**

  - require가 반드시 파일 최상단에 위치할 필요가 없습니다.
  - module.exports 도 최하단에 위치할 필요가 없습니다.

  ```javascript
  console.log('require가 가장 위에 오지 않아도 됩니다.')

  module.exports = '저를 찾아보세요.'

  require('./var')

  console.log('require.cache입니다.')
  console.log(require.cache)
  console.log('require.main입니다.')
  console.log(require.main === module) // true
  console.log(require.main.filename) // ~/chapter03/require.js
  ```

  - require.cache 객체에 파일 이름이 속성명으로 들어 있는 것을 볼 수 있습니다.

    - 속성값으로는 각 파일의 모듈 객체가 들어 있습니다.
    - 한 번 require한 파일은 require.cache에 저장되므로 다음 번에 require할 때는 새로 불러오지 않고 require.cache에 있는 것이 재사용됩니다.

  - require.main 은 노드 실행 시 철 모듈을 가리킵니다.

    - node ~/require.js 실행했으므로 require.js가 require.main이 됩니다.
    - require.main 객체의 모양은 require.cache의 모듈 객체와 같습니다.
    - 현재 파일이 첫 모듈인지 알아보려면 require.main === module 을 해보면 됩니다.
    - 첫 모듈의 이름을 알아보려면 require.main.filename 으로 확인하면 됩니다.

  - 모듈을 참조할 때의 주의점

    ```javascript
    // dep1.js
    const dep2 = require('./dep2')
    console.log('require dep2', dep2)
    module.exports = () => {
      console.log('dep2', dep2)
    }

    // dep2.js
    const dep1 = require('./dep1')
    console.log('require dep1', dep1)
    module.exports = () => {
      console.log('dep1', dep1)
    }

    // dep-run.js
    const dep1 = require('./dep1')
    const dep2 = require('./dep2')

    dep1()
    dep2()

    // 출력 결과
    require dep1 {}
    require dep2 [Function (anonymous)]
    dep2 [Function (anonymous)]
    dep1 {}
    ...
    ```

    - dep1의 module.exports가 함수가 아니라 빈 객체로 표시됩니다.
    - 이러한 현상을 순환 참조(Circular Dependency)라고 부릅니다.
    - 이렇게 순환 참조가 있을 경우에는 순환 참조되는 대상을 빈 객체로 만듭니다. 에러가 발생하지 않고 조용히 빈 객체로 변경되므로 예기치 못한 동작이 발생할 수 있습니다.

### ➕ 3.4.6 process

- process 객체는 현재 실행되고 있는 노드 프로세스에 대한 정보를 담고 있습니다.

  - process.env

    - 이 정보들은 시스템의 환경 변수 입니다.
    - 시스템 환경 변수는 노드에 직접 영향을 미치기도 하는데 대표적인 예로 `UV_THREADPOOL_SIZE`, `NODE_OPTIONS` 가 있습니다.
      - `NODE_OPTIONS` 는 노드를 실행할 때의 옵션들을 입력받는 환경 변수입니다.
      - `UV_THREADPOOL_SIZE` 는 노드에서 기본적으로 사용하는 스레드풀의 스레드 개수를 조절할 수 있게 합니다.
    - process.env는 서비스의 중요한 키를 저장하는 공간으로도 사용됩니다.
      - 서버나 데이터베이스의 비밀번호와 각종 API키를 코드에 직접 입력하는 것은 위험합니다.
      - 중요한 비밀번호는 process.env의 속성으로 대체합니다.
        ```javascript
        const secretId = process.env.SECRET_ID
        const secretCode = process.env.SECRET_CODE
        ```

  - process.nextTick(콜백)

    - 이벤트 루프가 다른 콜백 함수들보다 nextTick의 콜백 함수를 우선으로 처리하도록 만듭니다.

      ```javascript
      setImmediate(() => {
        console.log('immediate')
      })

      process.nextTick(() => {
        console.log('nextTick')
      })

      setTimeout(() => {
        console.log('timeout')
      }, 0)

      Promise.resolve().then(() => console.log('promise'))

      // 출력결과
      nextTick
      promise
      timeout
      immediate
      ```

      - nextTick 은 setImmediate나 setTimeout보다 먼저 실행됩니다.
      - resolve된 Promise도 nextTick처럼 다른 콜백들보다 우선시됩니다.
      - 그래서 nextTick과 Promise를 마이크로태스크(microtask)라고 따로 구분지어 부릅니다.

    - 마이크로태스크의 재귀 호출
      - 마이크로태스크를 재귀 호출하게 되면 이벤트 루프는 다른 콜백 함수보다 마이크로태스크를 우선하여 처리하므로 콜백 함수들이 실행되지 않을 수도 있습니다.

  - process.exit(코드)

    - 실행 중인 노드 프로세스를 종료합니다.
    - 서버 환경에서 이 함수를 사용하면 서버가 멈추므로 특수한 경우를 제외하고는 서버에서 잘 사용하지 않습니다.
    - 하지만 서버 외의 독립적인 프로그램에서는 수동으로 노드를 멈추기 위해 사용합니다.

      ```javascript
      let i = 1
      setInterval(() => {
        if (i === 5) {
          console.log('종료')
          process.exit()
        }
        console.log(i)
        i += 1
      }, 1000)

      // 출력결과
      1
      2
      3
      4
      종료
      ```

      - 인수를 주지 않거나 0을 주면 정상 종료를 뜻하고,
      - 1을 주면 비정상 종료를 뜻합니다. 에러가 발생해서 종료하는 경우에는 1을 넣으면 됩니다.

## 📌 3.5 노드 내장 모듈 사용하기

- 노드는 운영체제 정보에도 접근할 수 있고, 클라이언트가 요청한 주소에 대한 정보도 가져올 수 있습니다.

### ➕ 3.5.1 os

```javascript
const os = require('os')

console.log('[ 운영체제 정보 ] =============================')
console.log('os.arch : ', os.arch())
console.log('os.platform : ', os.platform())
console.log('os.type : ', os.type())
console.log('os.uptime : ', os.uptime())
console.log('os.hostname : ', os.hostname())
console.log('os.release : ', os.release())

console.log('[ 경로 ] ====================================')
console.log('os.homedir : ', os.homedir())
console.log('os.tmpdir : ', os.tmpdir())

console.log('[ CPU 정보 ] ================================')
console.log('os.cpus : ', os.cpus())
console.log('os.cpus().length : ', os.cpus().length)
```

- os.arch(): process.arch 와 동일합니다.
- os.platform(): process.platform 과 동일합니다.
- os.type(): 운영체제의 종류를 보여줍니다.
- os.uptime(): 운영체제 부팅 이후 흐른 시간(초)을 보여줍니다. process.uptime()은 노드의 실행 시간이었습니다.
- os.hostname(): 컴퓨터의 이름을 보여줍니다.
- os.release(): 운영체제의 버전을 보여줍니다.
- os.homedir(): 홈 디렉터리 경로를 보여줍니다.
- os.tmpdir(): 임시 파일 저장 경로를 보여줍니다.
- os.cpus(): 컴퓨터의 코어 정보를 보여줍니다.
- os.freemem(): 사용 가능한 메모리(RAM)를 보여줍니다.
- os.totalmem(): 전체 메모리 용량을 보여줍니다.

- 코어 개수 확인하기
  - os.cpus().length를 하면 코어의 개수가 숫자로 나옵니다.
  - 노드에서 싱글 스레드 프로그래밍을 하면 코어가 몇 개이든 상관없이 대부분의 경우 코어를 하나밖에 사용하지 않습니다.
  - cluster 모듈을 사용하는 경우에는 코어 개수에 맞춰서 프로세스를 늘릴 수 있습니다. 이때 cpus() 메서드를 사용할 것입니다.

### ➕ 3.5.2 path

- 폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈입니다.
- path 모듈이 필요한 이유 중 하나는 운영체제별로 경로 구분자가 다르기 때문입니다.
  - 윈도 : C:\Users\ZeroCho 처럼 `\` 로 구분합니다.
  - POSIX : /home/zerocho 처럼 `/` 로 구분합니다.

```javascript
const path = require('path')

const string = __filename
console.log('string: ', string)
console.log('===============================================================')

console.log('path.sep: ', path.sep)
console.log('path.delimiter: ', path.delimiter)
console.log('===============================================================')

console.log('path.dirname(): ', path.dirname(string))
console.log('path.extname(): ', path.extname(string))
console.log('path.basename(): ', path.basename(string))
console.log(
  'path.basename - extname: ',
  path.basename(string, path.extname(string))
)
console.log('===============================================================')

console.log('path.parse(): ', path.parse(string))
console.log(
  'path.format(): ',
  path.format({
    dir: 'C:/users/zerocho',
    name: 'path',
    ext: '.js',
  })
)
console.log(
  'path.normalize(): ',
  path.normalize('C:/users////zerocho///path.js')
)
console.log('===============================================================')

console.log('path.isAbsolute(C:/): ', path.isAbsolute('C:/'))
console.log('path.isAbsolute(./home):', path.isAbsolute('./home'))
console.log('===============================================================')

console.log(
  'path.relative(): ',
  path.relative('C:/users/zerocho/path.js', 'C:/')
)
console.log(
  'path.join(): ',
  path.join(__dirname, '..', '..', '/users', '.', '/zerocho')
)
console.log(
  'path.resolve(): ',
  path.resolve(__dirname, '..', 'users', '.', '/zerocho')
)
```

- path.sep : 경로의 구분자입니다.
- path.delimiter : 환경 변수의 구분자입니다.
- path.dirname(경로) : 파일이 위치한 폴더 경로를 보여줍니다.
- path.extname(경로) : 파일의 확장자를 보여줍니다.
- path.basename(경로, 확장자) : 파일의 이름을 표시합니다. 파일의 이름만 표시하고 싶다면 두번째 인수로 파일의 확장자를 넣으면 됩니다.
- path.parse(경로) : 파일 경로를 root, dir, base, ext, name 으로 분리합니다.
- path.format(객체) : path.parse()한 객체를 파일 경로로 합칩니다.
- path.normalize(경로) : 경로의 구분자를 실수로 여러 번 사용했거나 혼용했을 때 정상적인 경로로 변환합니다.
- path.isAbsolute(경로) : 파일의 경로가 절대경로인지 상대경로인지를 알려줍니다.
- path.relative(기준경로, 비교경로) : 경로를 두 개 넣으면 첫 번째 경로에서 두 번째 경로로 가는 방법을 알립니다.
- path.join(경로, ...) : 여러 인수를 넣으면 하나의 경로로 합칩니다. 상대경로인 ..(부모 디렉터리)과 .(현 위치)도 알아서 처리합니다.
- path.resolve(경로, ...) : path.join() 과 비슷하지만 차이가 있습니다.
  - path.join과 path.resolve 메서드는 비슷해 보이지만 동작 방식이 다릅니다.
  - / 를 만나면 path.resolve는 절대 경로로 인식해서 앞의 경로를 무시하고, path.join은 상대경로로 처리합니다.
    ```javascript
    const path = require('path')
    path.join('/a', '/b', 'c') // /a/b/c/
    path.resolve('/a', '/b', 'c') // /b/c
    ```

### ➕ 3.5.3 url

- 인터넷 주소를 쉽게 조작하도록 도와주는 모듈입니다.
- url 처리에는 크게 두 가지 방식이 있습니다.
  - WHATWG(웹 표준을 정하는 단체의 이름) 방식의 url과 예전부터 노드에서 사용하던 방식의 url이 있습니다.
  ```plainText
  |-------------------------------------------------------------------------------------------|
  |                                             href                                          |
  |-------------------------------------------------------------------------------------------|
  | protocol |  |         auth        |         href       |           path          |  hash  |
  |          |  |                     |--------------------|-------------------------|        |
  |          |  |                     |   hostname  | port | pathname |    search    |        |
  |          |  |                     |             |      |          |--------------|        |
  |          |  |                     |             |      |          | |   query    |        |
  |"https:    //      user : pass     @ sub.host.com: 8080   /p/a/t/h  ? query=string  #hash" |
  |          |  |          |          |   hostname  | port |          |              |        |
  |          |  |          |          |--------------------|          |              |        |
  | protocol |  | username | password |         host       |          |              |        |
  |-------------|---------------------|--------------------|          |              |        |
  |   origin    |                     |       origin       | pathname |    search    |  hash  |
  |-------------------------------------------------------------------------------------------|
  |                                             href                                          |
  |-------------------------------------------------------------------------------------------|
  ```
  - 가운데 주소를 기준으로 위쪽은 기존 노드 url 구분 방법
  - 아래쪽은 WHATWG의 url 구분 방법입니다.

```javascript
const url = require('url')

// WHATWG의 url
const { URL } = url
const myURL = new URL(
  'http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor'
)

console.log('new URL(): ', myURL)
console.log('url.format(): ', url.format(myURL))

// 기존 노드 방식
const parsedUrl = url.parse(
  'http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor'
)
console.log('url.parse(): ', parsedUrl)
console.log('url.format(): ', url.format(parsedUrl))
```

- WHATWG와 노드의 url은 취향에 따라 사용하면 되지만, 노드의 url형식을 꼭 사용해야 되는 경우가 있습니다.

  - host 부분 없이 pathname 부분만 오는 주소인 경우(/book/bookList.apsx)에는 WHATWG 방식이 처리할 수 없습니다.

- WHATWG 방식은 search 부분을 searchParams 라는 특수한 객체로 반환하므로 유용합니다.

  ```javascript
  const { URL } = require('url')
  const myURL = new URL(
    'http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript'
  )

  console.log('searchParams: ', myURL.searchParams)
  console.log('searchParams.getAll(): ', myURL.searchParams.getAll('category'))
  console.log('searchParams.get(): ', myURL.searchParams.get('limit'))
  console.log('searchParams.has(): ', myURL.searchParams.has('page'))
  console.log('searchParams.keys(): ', myURL.searchParams.keys())
  console.log('searchParams.values(): ', myURL.searchParams.values())

  myURL.searchParams.append('filter', 'es3')
  myURL.searchParams.append('filter', 'es5')
  console.log(myURL.searchParams.getAll('filter'))

  myURL.searchParams.set('filter', 'es6')
  console.log(myURL.searchParams.getAll('filter'))

  myURL.searchParams.delete('filter', 'es6')
  console.log(myURL.searchParams.getAll('filter'))

  console.log('searchParams.toString(): ', myURL.searchParams.toString())
  myURL.search = myURL.searchParams.toString()
  ```

  - getAll(키) : 키에 해당하는 모든 값들을 가져옵니다.
  - get(키) : 키에 해당하는 첫 번째 값만 가져옵니다.
  - has(키) : 해당 키가 있는지 없는지를 검사합니다.
  - keys() : searchParams의 모든 키를 반복기(iterator) 객체로 가져옵니다.
  - values() : searchParams의 모든 값을 반복기(iterator) 객체로 가져옵니다.
  - append(키, 값) : 해당 키를 추가합니다. 같은 키의 값이 있다면 유지하고 하나 더 추가합니다.
  - set(키, 값) : append 와 비슷하지만, 같은 키의 값들을 모두 지우고 새로 추가합니다.
  - delete(키) : 해당 키를 제거합니다.
  - toString() : 조작한 searchParams 객체를 다시 문자열로 만듭니다. 이 문자열을 search에 대입하면 주소 객체에 반영됩니다.

### ➕ 3.5.4 querystring

- WHATWG 방식의 url 대신 기존 노드의 url을 사용할 때, search 부분을 사용하기 쉽게 객체로 만드는 모듈입니다.

```javascript
const url = require('url')
const querystring = require('querystring')

const parsedUrl = url.parse(
  'http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript'
)
const query = querystring.parse(parsedUrl.query)
console.log('querystring.parse(): ', query)
console.log('querystring.stringify(): ', querystring.stringify(query))
```

### ➕ 3.5.5 crypto

- 다양한 방식의 암호화를 도와주는 모듈입니다.

  - 단방향 암호화

    - 비밀번호는 보통 단방향 암호화 알고리즘을 사용해서 암호화합니다.
    - 단방향 암호화란 복호화할 수 없는 암호화 방식을 뜻합니다.
    - 즉, 단방향 암호화는 한 번 암호화하면 원래 문자열을 찾을 수 없습니다.
    - 복호화할 수 없으므로 암호화라고 표현하는 대신 해시 함수라고 부르기도 합니다.
    - 단방향 암호화 알고리즘은 주로 해시 기법을 사용합니다.

      - 해시 기법이란 어떠한 문자열을 고정된 길이의 다른 문자열로 바꿔버리는 방식입니다.

        ```javascript
        const crypto = require('crypto')

        console.log(
          'base64: ',
          crypto.createHash('sha512').update('비밀번호').digest('base64')
        )
        console.log(
          'hex: ',
          crypto.createHash('sha512').update('비밀번호').digest('hex')
        )
        console.log(
          'base64: ',
          crypto.createHash('sha512').update('다른 비밀번호').digest('base64')
        )
        ```

      - createHash(알고리즘) : 사용할 해시 알고리즘을 넣습니다. md5, sha1, sha256, sha512 등이 가능하지만, md5와 sha1은 이미 취약점이 발견되었습니다.
      - update(문자열) : 변환할 문자열을 넣습니다.
      - digest(인코딩) : 인코딩할 알고리즘을 넣습니다.

    - 노드에서 지원하는 pbkdf2 알고리즘에 대해 알아보겠습니다.

      - pdkdf2는 간단히 말하면 기존 문자열에 salt라고 불리는 문자열을 붙인 후 해시 알고리즘을 반복해서 적용하는 겁니다.

        ```javascript
        const crypto = require('crypto')

        crypto.randomBytes(64, (err, buf) => {
          const salt = buf.toString('base64')
          console.log('salt: ', salt)
          crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {
            console.log('password: ', key.toString('base64'))
          })
        })
        ```

        - randomBytes() 메서드로 64바이트 길이의 문자열을 만듭니다. 이것이 salt가 됩니다.
        - pbkdf2() 메서드에는 순서대로 비밀번호, salt, 반복 횟수, 출력 바이트, 해시 알고리즘을 인수로 넣는다.
        - 즉, sha512로 변환된 결과값을 다시 sha512로 변환하는 과정을 반복 횟수만큼 반복하는 것 입니다.
        - crypto.randomBytes 와 crypto.pbkdf2 메서드는 내부적으로 스레드풀을 사용해 멀티 스레딩으로 동작합니다.
        - randomBytes 이므로 매번 실행할 때마다 결과가 달라집니다. 따라서 salt를 잘 보관하고 있어야 비밀번호도 찾을 수 있습니다.

  - 양방향 암호화

    - 암호화된 문자열을 복호화할 수 있으며, 키라는 것이 사용됩니다.
    - 대칭형 함호화에서 암호를 복호화하려면 암호화할 때 사용한 키와 같은키를 사용해야 합니다.

      ```javascript
      const crypto = require('crypto')

      const algorithm = 'aes-256-cbc'
      const key = 'abcdefghijklmnopqrstuvwxyz123456'
      const iv = '1234567890123456'

      const cipher = crypto.createCipheriv(algorithm, key, iv)
      let result = cipher.update('암호화할 문장', 'utf8', 'base64')
      result += cipher.final('base64')
      console.log('암호화: ', result)

      const decipher = crypto.createDecipheriv(algorithm, key, iv)
      let result2 = decipher.update(result, 'base64', 'utf8')
      result2 += decipher.final('utf8')
      console.log('복호화: ', result2)
      ```

      - crypto.createCipheriv(알고리즘, 키, iv)

        - 암호화 알고리즘과 키, iv를 넣습니다.
        - iv 는 암호화할 때 사용하는 초기화 벡터를 의미합니다.
        - 사용 가능한 알고리즘 목록은 crypto.getCiphers() 를 호출하면 볼 수 있습니다.

      - cipher.update(문자열, 인코딩, 출력 인코딩)

        - 암호화할 대상과 대상의 인코딩, 출력결과물의 인코딩을 넣습니다.
        - 보통 문자열은 utf8 인코딩을 암호는 base64를 많이 사용합니다.

      - cipher.final(출력 인코딩)

        - 출력 결과물의 인코딩을 넣으면 암호화가 완료됩니다.

      - crypto.createDecipheriv(알고리즘, 키, iv)

        - 복호화할 때 사용합니다.
        - 암호화할 때 사용했던 알고리즘과 키, iv를 그대로 넣어야 합니다.

      - decipher.update(문자열, 인코딩, 출력 인코딩)

        - 암호화된 문장, 그 문장의 인코딩, 복호화할 인코딩을 넣습니다.

      - decipher.final(출력 인코딩)
        - 복호화 결과물의 인코딩을 넣습니다.

### ➕ 3.5.6 util

- 각종 편의 기능을 모아둔 모듈입니다.

  ```javascript
  const util = require('util')
  const crypto = require('crypto')

  const dontUseMe = util.deprecate((x, y) => {
    console.log(x + y)
  }, 'dontUseMe 함수는 deprecated 되었으니 더 이상 사용하지 마세요.')

  dontUseMe(1, 2)

  const randomBytesPromise = util.promisify(crypto.randomBytes)
  randomBytesPromise(64)
    .then((buf) => {
      console.log(buf.toString('base64'))
    })
    .catch((error) => {
      console.error(error)
    })
  ```

  - util.deprecate
    - 함수가 deprecated 처리되었음을 알립니다. 첫 번째 인수로 넣은 함수를 사용했을 때 경고 메세지가 출력됩니다.
  - util.promisify
    - 콜백 패턴을 프로미스 패턴으로 바꿉니다.

### ➕ 3.5.7 worker_threads

- 노드에서 멀티 스레드 방식으로 작업하는 방법은 worker_threads 모듈로 가능합니다.

  ```javascript
  const { Worker, isMainThread, parentPort } = require('worker_threads')

  if (isMainThread) {
    // 부모일 때
    const worker = new Worker(__filename)
    worker.on('message', (message) => console.log('from worker', message))
    worker.on('exit', () => console.log('worker exit'))
    worker.postMessage('ping')
  } else {
    // 워커일 때
    parentPort.on('message', (value) => {
      console.log('from parent', value)
      parentPort.postMessage('pong')
      parentPort.close()
    })
  }
  ```

  - isMainThread 를 통해 현재 코드가 메인 스레드(기존에 동작하던 싱글 스레드를 메인 스레드 또는 부모 스레드라고 합니다.)에서 실행되는지, 아니면 우리가 생성한 워커 스레드에서 실행되는지 구분합니다.
  - 메인 스레드에서는 new Worker를 통해 현재 파일(\_\_filename)을 워커 스레드에서 실행시키고 있습니다.
  - 부모에서는 워커 생성 후 worker.postMessage 로 워커에 데이터를 보낼 수 있습니다.
  - 워커는 parentPort.on('message') 이벤트 리스너로 부모로부터 메시지를 받고, parentPost.postMessage 로 부모에게 메시지를 보냅니다.
  - 부모는 worker.on('message') 로 메시지를 받습니다. 참고로 메시지를 한 번만 받고 싶다면 once('message')를 사용하면 됩니다.
  - 워커에서 on 메서드를 사용할 때는 직접 워커를 종료해야 한다는 점에 주의해야 합니다.
    - parentPort.close() 를 하면 부모와의 연결이 종료됩니다.
    - 종료될 때는 worker.on('exit')이 실행됩니다.

  ```javascript
  const {
    Worker,
    isMainThread,
    parentPort,
    workerData,
  } = require('worker_threads')

  if (isMainThread) {
    // 부모일 때
    const threads = new Set()
    threads.add(
      new Worker(__filename, {
        workerData: { start: 1 },
      })
    )
    threads.add(
      new Worker(__filename, {
        workerData: { start: 2 },
      })
    )

    for (let worker of threads) {
      worker.on('message', (message) => console.log('from worker', message))
      worker.on('exit', () => {
        threads.delete(worker)
        if (threads.size === 0) {
          console.log('job done')
        }
      })
    }
  } else {
    // 워커일 때
    const data = workerData
    parentPort.postMessage(data.start + 100)
  }
  ```

  - new Worker 를 호출할 때 두 번째 인수의 workerData 속성으로 원하는 데이터를 보낼 수 있습니다.
  - 워커에서는 workerData로 부모로부터 데이터를 받습니다.

  ```javascript
  const {
    Worker,
    isMainThread,
    parentPort,
    workerData,
  } = require('worker_threads')

  const min = 2
  let primes = []

  function findPrimes(start, range) {
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

  if (isMainThread) {
    const max = 10000000
    const threadCount = 8
    const threads = new Set()
    const range = Math.ceil((max - min) / threadCount)
    let start = min
    console.time('prime')
    for (let i = 0; i < threadCount - 1; i += 1) {
      const wStart = start
      threads.add(
        new Worker(__filename, { workerData: { start: wStart, range } })
      )
      start += range
    }
    threads.add(
      new Worker(__filename, {
        workerData: { start, range: range + ((max - min + 1) % threadCount) },
      })
    )
    for (let worker of threads) {
      worker.on('exit', () => {
        threads.delete(worker)
        if (threads.size === 0) {
          console.timeEnd('prime')
          console.log(primes.length)
        }
      })
      worker.on('message', (msg) => {
        primes = primes.concat(msg)
      })
    }
  } else {
    findPrimes(workerData.start, workerData.range)
    parentPort.postMessage(primes)
  }
  ```

### ➕ 3.5.8 child_process

- 노드에서 다른 프로그램을 실행하고 싶거나 명령어를 수행하고 싶을 때 사용하는 모듈입니다.
- 이 모듈을 통해 다른 언어의 코드(예를 들면, 파이썬)를 실행하고 결괏값을 받을 수 있습니다.
- 이름이 child_process 인 이유는 현재 노드 프로세스 외에 새로운 프로세스를 띄워서 명령을 수행하고, 노드 프로세스에 결과를 알려주기 때문입니다.

```javascript
const { exec } = require('child_process')

const process = exec('ls')

process.stdout.on('data', (data) => {
  console.log(data.toString())
})

process.stderr.on('data', (data) => {
  console.error(data.toString())
})
// 실행 결과
// (현재 폴더의 파일 목록 표시)
```

### ➕ 3.5.9 기타 모듈들

- assert : 값을 비교하여 프로그램이 제대로 동작하는지 테스트하는 데 사용합니다.
- dns : 도메인 이름에 대한 IP 주소를 얻어내는 데 사용합니다.
- net : HTTP 보다 로우 레벨인 TCP나 IPC 통신을 할 때 사용합니다.
- string_decoder : 버퍼 데이터를 문자열로 바꾸는 데 사용합니다.
- tls : TLS와 SSL에 관련된 작업을 할 때 사용합니다.
- tty : 터미널과 관련된 작업을 할 때 사용합니다.
- dgram : UDP와 관련된 작업을 할 때 사용합니다.
- v8 : V8 엔진에 직접 접근할 때 사용합니다.
- vm : 가상 머신에 직접 접근할 때 사용합니다.

## 📌 3.6 파일 시스템 접근하기

- fs 모듈은 파일 시스템에 접근하는 모듈입니다.
- 즉, 파일을 생성하거나 삭제하고, 읽거나 쓸 수 있습니다.

  ```javascript
  const fs = require('fs')

  fs.readFile(`./readme.txt`, (err, data) => {
    if (err) {
      throw err
    }

    console.log(data)
    console.log(data.toString())
  })

  // 출력결과
  <Buffer ec a0 80 eb a5 bc 20 ec 9d bd ec 96 b4 ec a3 bc ec 84 b8 ec 9a 94 2e>
  저를 읽어주세요.
  ```

  - 여기서 파일의 경로가 현재 파일 기준이 아니라 node 명령어를 실행하는 콘솔 기준이라는 점에 유의해야 합니다.
  - readFile의 결과물은 `버퍼(buffer)` 라는 형식입니다.

- fs는 기본적으로 콜백 형식의 모듈이므로 fs모듈을 프로미스 형식으로 바꿔보겠습니다.

  ```javascript
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
  ```

- 파일 만들기

  ```javascript
  const fs = require('fs')

  fs.promises
    .writeFile(`${__dirname}/writeme.txt`, '글이 입력됩니다.')
    .then(() => fs.promises.readFile(`${__dirname}/writeme.txt`))
    .then((data) => {
      console.log(data.toString())
    })
    .catch((err) => {
      console.error(err)
    })
  ```

### ➕ 3.6.1 동기 메서드와 비동기 메서드

- 노드는 대부분의 메서드를 비동기 방식으로 처리합니다.

- 파일 하나를 여러 번 읽어보겠습니다.

  ```javascript
  const fs = require('fs')
  const path = require('path')

  const filePath = path.resolve(__dirname, './readme2.txt')

  console.log('시작')

  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err
    }
    console.log('1번', data.toString())
  })

  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err
    }
    console.log('2번', data.toString())
  })

  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err
    }
    console.log('3번', data.toString())
  })

  console.log('끝')

  // 처리결과
  시작
  끝
  1번 저를 여러 번 읽어보세요.
  2번 저를 여러 번 읽어보세요.
  3번 저를 여러 번 읽어보세요.
  ```

  - 비동기 메서드들은 백그라운드에 해당 파일을 읽으라고만 요청하고 다음 작업으로 넘어갑니다.
  - 파일 읽기 요청만 세 번을 보내고 끝을 찍습니다. 나중에 읽기가 완료되면 백그라운드가 다시 메인 스레드에 알립니다.
  - 메인 스레드는 그제서야 등록된 콜백 함수를 실행합니다.

- 수백 개의 I/O 요청이 들어와도 메인 스레드는 백그라운드에 요청 처리를 위임합니다.
- 나중에 백그라운드가 각각의 요청 처리가 완료되었다고 알리면 그때 콜백 함수를 처리하면 됩니다.

- 동기와 비동기, 블로킹과 논 블로킹

  - 동기와 비동기
    - 백그라운드 작업 완료 확인 여부
  - 블로킹과 논 블로킹
    - 함수가 바로 return 되는지 여부
  - 노드에서는 `동기-블로킹` 방식과 `비동기-논 블로킹` 방식이 대부분입니다. 동기-논 블로킹이나 비동기-블로킹 방식은 없다고 봐도 된다.
    - 동기-블로킹 방식
      - 백그라운드 작업 완료 여부를 계속 확인하며, 호출한 함수가 바로 return 되지 않고 백그라운드 작업이 끝나야 return됩니다.
    - 비동기-논 블로킹 방식
      - 호출한 함수가 바로 return 되어 다음 작업으로 넘어가며, 백그라운드 작업 완료 여부는 신경 쓰지 않고 나중에 백그라운드가 알림을 줄 때 처리합니다.

- 순서대로 파일 여러번 읽기

  ```javascript
  const fs = require('fs')
  const path = require('path')

  const filePath = path.resolve(__dirname, './readme2.txt')

  console.log('시작')
  let data = fs.readFileSync(filePath)
  console.log('1번', data.toString())
  data = fs.readFileSync(filePath)
  console.log('2번', data.toString())
  data = fs.readFileSync(filePath)
  console.log('3번', data.toString())
  console.log('끝')
  // 처리결과
  시작
  1번 저를 여러 번 읽어보세요.
  2번 저를 여러 번 읽어보세요.
  3번 저를 여러 번 읽어보세요.
  끝
  ```

  - readFileSync 메서드를 사용하면 요청이 수백 개 이상 들어올 때 성능에 문제가 생깁니다.
  - Sync 메서드는 이전 작업이 완료되어야 다음 작업을 진행할 수 있습니다.
  - 즉, 백그라운드가 작업하는 동안 메인 스레드는 아무것도 하지 못하고 대기하고 있어야 합니다.
  - 메인 스레드가 일을 하지 않고 노는 시간이 생기므로 비효율적입니다.

- 비동기 방식으로 하되 순서를 유지

  ```javascript
  const fs = require('fs')
  const path = require('path')

  const filePath = path.resolve(__dirname, './readme2.txt')

  console.log('시작')
  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err
    }
    console.log('1번', data.toString())
    fs.readFile(filePath, (err, data) => {
      if (err) {
        throw err
      }
      console.log('2번', data.toString())
      fs.readFile(filePath, (err, data) => {
        if (err) {
          throw err
        }
        console.log('3번', data.toString())
        console.log('끝')
      })
    })
  })
  // 처리결과
  시작
  1번 저를 여러 번 읽어보세요.
  2번 저를 여러 번 읽어보세요.
  3번 저를 여러 번 읽어보세요.
  끝
  ```

- 콜백방식을 프로미스 방식으로 변경

  ```javascript
  const fs = require('fs')
  const path = require('path')
  const filePath = path.resolve(__dirname, './readme2.txt')

  async function main() {
    console.log('시작')
    try {
      let data = await fs.promises.readFile(filePath)
      console.log('1번', data.toString())
      data = await fs.promises.readFile(filePath)
      console.log('2번', data.toString())
      data = await fs.promises.readFile(filePath)
      console.log('3번', data.toString())
      console.log('끝')
    } catch (err) {
      console.error(err)
    }
  }

  main()
  // 처리결과
  시작
  1번 저를 여러 번 읽어보세요.
  2번 저를 여러 번 읽어보세요.
  3번 저를 여러 번 읽어보세요.
  끝
  ```

### ➕ 3.6.2 버퍼와 스트림 이해하기

- 파일을 읽거나 쓰는 두 가지 방식

  - 버퍼를 이용하는 방식
    - 버퍼링 : 영상을 재생할 수 있을 때까지 데이터를 모으는 동작
  - 스트림을 이용하는 방식
    - 스트리밍 : 방송인의 컴퓨터에서 시청자의 컴퓨터로 영상 데이터를 조금씩 전송하는 동작

- 노드의 버퍼와 스트림

  - 버퍼

    - 노드는 파일을 읽을 때 메모리에 파일 크기만큼 공간을 마련해두며 파일 데이터를 메모리에 저장한 뒤 사용자가 조작할 수 있도록 합니다.
    - 이때, 메모리에 저장된 데이터가 바로 버퍼입니다.

      ```javascript
      const buffer = Buffer.from('저를 버퍼로 바꿔보세요.')
      console.log('from(): ', buffer)
      console.log('length: ', buffer.length)
      console.log('toString(): ', buffer.toString())

      const array = [
        Buffer.from('띄엄 '),
        Buffer.from('띄엄 '),
        Buffer.from('띄어쓰기'),
      ]

      const buffer2 = Buffer.concat(array)
      console.log('concat(): ', buffer2.toString())

      const buffer3 = Buffer.alloc(5)
      console.log('alloc(): ', buffer3)
      ```

      - from(문자열)
        - 문자열을 버퍼로 바꿀 수 있습니다. length 속성은 버퍼의 크기를 나타냅니다. 바이트 단위입니다.
      - toString(버퍼)
        - 버퍼를 다시 문자열로 바꿀 수 있습니다. 이때 base64나 hex를 인수로 넣으면 해당 인코딩으로도 변환 가능합니다.
      - concat(배열)
        - 배열 안에 든 버퍼들을 하나로 합칩니다.
      - alloc(바이트)
        - 빈 버퍼를 생성합니다. 바이트를 인수로 넣으면 해당 크기의 버퍼가 생성됩니다.

  - 스트림

    - 버퍼가 편리하기는 하지만 문제점도 있습니다. 용량이 100MB 인 파일이 있으면 읽을 때 메모리에 100MB인 버퍼를 만들어야 합니다.
    - 그래서 버퍼의 크기를 작게 만든 후 여러 번으로 나눠 보내는 방식이 등장했습니다.
    - 예를 들어, 버퍼 1MB를 만든 후 100MB 파일을 100번에 걸쳐서 나눠 보내는 것입니다.
    - 이를 편리하게 만든 것이 스트림입니다.

      ```javascript
      const fs = require('fs')
      const path = require('path')

      const filePath = path.resolve(__dirname, './readme3.txt')

      const readStream = fs.createReadStream(filePath, { highWaterMark: 16 })
      const data = []

      readStream.on('data', (chunk) => {
        data.push(chunk)
        console.log('data : ', chunk, chunk.length)
      })

      readStream.on('end', () => {
        console.log('end : ', Buffer.concat(data).toString())
      })

      readStream.on('error', (err) => {
        console.error(err)
      })
      ```

      - createReadStream 으로 읽기 스트림을 만듭니다.
      - 두번째 인수는 옵션 객체인데, highWaterMark 라는 옵션이 버퍼의 크기(바이트 단위)를 정할 수 있습니다. 기본값은 64KB 입니다.
      - readStream 은 이벤트 리스너를 붙여서 사용합니다.
        - 보통 data, end, error 이벤트를 사용합니다.

    - 파일쓰기

      ```javascript
      const fs = require('fs')
      const path = require('path')

      const filePath = path.resolve(__dirname, './writeme2.txt')

      const writeStream = fs.createWriteStream(filePath)
      writeStream.on('finish', () => {
        console.log('파일 쓰기 완료')
      })

      writeStream.write('이 글을 씁니다.\n')
      writeStream.write('한 번 더 씁니다.')
      writeStream.end()
      ```

      - write 메서드로 넣을 데이터를 씁니다. 여러 번 호출할 수 있습니다.
      - 데이터를 다 쓴 후 end 메서드로 종료를 알립니다. 이 때 finish 이벤트가 발생합니다.

    - 파일을 읽고 그 스트림을 전달받아 파일을 쓸 수도 있습니다.
    - 스트림끼리 연결하는 것을 '파이핑한다'고 표현합니다.

      ```javascript
      const fs = require('fs')
      const path = require('path')

      const readFilePath = path.resolve(__dirname, './readme4.txt')
      const writeFilePath = path.resolve(__dirname, './writeme3.txt')

      const readStream = fs.createReadStream(readFilePath)
      const writeStream = fs.createWriteStream(writeFilePath)
      readStream.pipe(writeStream)
      ```

    - pipe는 여러 번 연결할 수 있습니다.

      ```javascript
      const zlib = require('zlib')
      const fs = require('fs')
      const path = require('path')

      const readFilePath = path.resolve(__dirname, './readme4.txt')
      const writeFilePath = path.resolve(__dirname, './readme4.txt.gz')

      const readStream = fs.createReadStream(readFilePath)
      const zlibStream = zlib.createGzip()
      const writeStream = fs.createWriteStream(writeFilePath)
      readStream.pipe(zlibStream).pipe(writeStream)
      ```

### ➕ 3.6.3 기타 fs 메서드 알아보기

```javascript
const fs = require('fs').promises
const constants = require('fs').constants
const path = require('path')

const dirPath = path.resolve(__dirname, './folder')
const filePath = path.resolve(dirPath, './file.js')
const newFilePath = path.resolve(dirPath, './newfile.js')

fs.access(dirPath, constants.F_OK | constants.W_OK | constants.R_OK)
  .then(() => Promise.reject('이미 폴더 있음'))
  .catch((err) => {
    if (err.code === 'ENOENT') {
      console.log('폴더 없음')
      return fs.mkdir(dirPath)
    }
    return Promise.reject(err)
  })
  .then(() => {
    console.log('폴더 만들기 성공')
    return fs.open(filePath, 'w')
  })
  .then((fd) => {
    console.log('빈 파일 만들기 성공', fd)
    return fs.rename(filePath, newFilePath)
  })
  .then(() => {
    console.log('이름 바꾸기 성공')
  })
  .catch((err) => {
    console.error(err)
  })
```

- fs.access(경로, 옵션, 콜백)
  - 폴더나 파일에 접근할 수 있는지를 체크합니다.
  - 두 번째 인수로 들어가는 상수는 F_OK는 파일 존재 여부, R_OK는 읽기 권한 여부, W_OK는 쓰기 권한 여부를 체크합니다.
  - 파일/폴더나 권한이 없다면 에러가 발생하는데 파일/폴더가 없을 때의 에러 코드는 ENOENT 입니다.
- fs.mkdir(경로, 콜백)
  - 폴더를 만드는 메서드 입니다.
  - 이미 폴더가 잇다면 에러가 발생하므로 먼저 access 메서드로 확인해야 됩니다.
- fs.open(경로, 옵션, 콜백)
  - FileHandle 객체를 가져오는 메서드입니다.
  - 파일이 없다면 파일을 생성한 뒤 FileHandle 객체를 가져옵니다.
  - 옵션으로 쓰려면 w, 읽으려면 r, 기존 파일에 추가하려면 a 입니다.
- fs.rename(기존 경로, 새 경로, 콜백)
  - 파일의 이름을 바꾸는 메서드입니다.

```javascript
const fs = require('fs').promises
const path = require('path')

const dirname = path.resolve(__dirname, './folder')
const filename = path.resolve(dirname, './newfile.js')

fs.readdir(dirname)
  .then((dir) => {
    console.log('폴더 내용 확인', dir)
    return fs.unlink(filename)
  })
  .then(() => {
    console.log('파일 삭제 성공')
    return fs.rmdir(dirname)
  })
  .then(() => {
    console.log('폴더 삭제 성공')
  })
  .catch((err) => {
    console.error(err)
  })
```

- fs.readdir(경로, 콜백) : 폴더 안의 내용물을 확인할 수 있습니다.
- fs.unlink(경로, 콜백) : 파일을 지울 수 있습니다. 파일이 없다면 에러가 발생하므로 먼저 파일이 있는지 확인해야 합니다.
- fs.rmdir(경로, 콜백) : 폴더를 지울 수 있습니다. 폴더 안에 파일들이 있다면 에러가 발생하므로 먼저 내부 파일을 지우고 호출해야 합니다.

```javascript
const fs = require('fs').promises
const path = require('path')

const readFilename = path.resolve(__dirname, './readme4.txt')
const writeFilename = path.resolve(__dirname, './writeme4.txt')

fs.copyFile(readFilename, writeFilename)
  .then(() => {
    console.log('복사 완료')
  })
  .catch((err) => {
    console.error(err)
  })
```

```javascript
const fs = require('fs')

fs.watch(`${__dirname}/target.txt`, (eventType, filename) => {
  console.log(eventType, filename)
})
```

### ➕ 3.6.4 스레드풀 알아보기

- fs 비동기 메서드들은 백그라운드에서 실행되고, 실행된 후에 다시 메인 스레드의 콜백 함수나 프로미스의 then 부분이 실행됩니다.
- 이때 fs 메서드를 여러 번 실행해도 백그라운드에서 동시에 처리되는데, 바로 스레드풀이 있기 때문입니다.
- fs 외에도 내부적으로 스레드풀을 사용하는 모듈로는 crypto, zlib, dns, lookup 등이 있습니다.

  ```javascript
  const crypto = require('crypto')

  const pass = 'pass'
  const salt = 'salt'
  const start = Date.now()

  crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('1 : ', Date.now() - start)
  })
  crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('2 : ', Date.now() - start)
  })
  crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('3 : ', Date.now() - start)
  })
  crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('4 : ', Date.now() - start)
  })
  crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('5 : ', Date.now() - start)
  })
  crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('6 : ', Date.now() - start)
  })
  crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('7 : ', Date.now() - start)
  })
  crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('8 : ', Date.now() - start)
  })
  // 처리 결과
  3 :  1067
  4 :  1077
  1 :  1077
  2 :  1077
  5 :  2136
  7 :  2142
  8 :  2146
  6 :  2148
  ```

  - 실행할 때마다 시간과 순서가 달라집니다. 스레드풀이 작업을 동시에 처리하므로 여덟 개의 작업 중에서 어느 것이 먼저 처리될지 모릅니다.
  - 1~4와 5~8이 그룹으로 묶여져 있고, 5~8이 1~4보다 시간이 더 소요됩니다.
  - 기본적인 스레드풀의 개수가 네 개이기 때문입니다. 스레드풀을 직접 컨트롤할 수는 없지만 개수를 조절할 수 있습니다.
  - `UV_THREADPOOL_SIZE` 라는 환경변수를 통해서 조절이 가능합니다.

## 📌 3.7 이벤트 이해하기

- 스트림을 사용할 때 on('data', 콜백) 또는 on('end', 콜백) 을 사용했습니다.
- 바로 data라는 이벤트와 end라는 이벤트가 발생할 때 콜백 함수를 호출하도록 이벤트를 등록한 것입니다.

  ```javascript
  const { EventEmitter } = require('events')

  const myEvent = new EventEmitter()
  myEvent.addListener('event1', () => {
    console.log('이벤트 1')
  })
  myEvent.on('event2', () => {
    console.log('이벤트 2')
  })
  myEvent.on('event2', () => {
    console.log('이벤트 2 추가')
  })
  myEvent.once('event3', () => {
    console.log('이벤트 3')
  })

  myEvent.emit('event1')
  myEvent.emit('event2')
  myEvent.emit('event3')
  myEvent.emit('event3')

  myEvent.on('event4', () => {
    console.log('이벤트 4')
  })

  myEvent.removeAllListeners('event4')
  myEvent.emit('event4')

  const listener = () => {
    console.log('이벤트 5')
  }

  myEvent.on('event5', listener)
  myEvent.removeListener('event5', listener)
  myEvent.emit('event5')

  console.log(myEvent.listenerCount('event2'))

  // 처리결과
  이벤트 1
  이벤트 2
  이벤트 2 추가
  이벤트 3
  2
  ```

  - on(이벤트명, 콜백)
    - 이벤트 이름과 이벤트 발생 시의 콜백을 연결합니다.
    - 이렇게 연결하는 동작을 이벤트 리스닝이라고 합니다.
    - event2 처럼 이벤트 하나에 이벤트 여러 개를 달아줄 수도 있습니다.
  - addListener(이벤트명, 콜백)
    - on과 기능이 같습니다.
  - emit(이벤트명)
    - 이벤트를 호출하는 메서드입니다.
  - once(이벤트명, 콜백)
    - 한 번만 실행되는 이벤트입니다.
  - removeAllListeners(이벤트명)
    - 이벤트에 연결된 모든 이벤트 리스너를 제거합니다.
  - removeListener(이벤트명, 리스너)
    - 이벤트에 연결된 리스너를 하나씩 제거합니다.
  - off(이벤트명, 콜백)
    - 노드 10버전에서 추가도니 메서드로, removeListener와 기능이 같습니다.
  - listenerCount(이벤트명)
    - 현재 리스너가 몇 개 연결되어 있는지 확인합니다.

## 📌 3.8 예외 처리하기

- 예외란 보통 처리하지 못한 에러를 가리킵니다. 이러한 예외들은 실행 중인 노드 프로세스를 멈추게 만듭니다.
- 멀티 스레드 프로그램에서는 스레드 하나가 멈추면 그 일을 다른 스레드가 대신합니다.
- 노드의 메인 스레드는 하나뿐이므로 그 하나를 소중히 보호해야 합니다.

  ```javascript
  setInterval(() => {
    console.log('시작')
    try {
      throw new Error('서버를 고장내주마')
    } catch (err) {
      console.log(err)
    }
  }, 1000)

  // 처리결과
  시작
  Error: 서버를 고장내주마
      at Timeout._onTimeout (/Users/haeny/dev/workspace/TIL/book/nodejs-textbook/src/chapter03/ch03-8/error1.js:4:11)
      at listOnTimeout (node:internal/timers:557:17)
      at processTimers (node:internal/timers:500:7)
  시작
  Error: 서버를 고장내주마
      at Timeout._onTimeout (/Users/haeny/dev/workspace/TIL/book/nodejs-textbook/src/chapter03/ch03-8/error1.js:4:11)
      at listOnTimeout (node:internal/timers:557:17)
      at processTimers (node:internal/timers:500:7)
  //...계속
  ```

  - throw 를 하면 노드 프로세스가 멈춰버립니다.
  - 에러는 발생하지만 try/catch 로 잡을 수 있고 setInterval도 직접 멈추기 전까지 계속 실행됩니다.

- 노드 자체에서 잡아주는 에러

  ```javascript
  const fs = require('fs')

  setInterval(() => {
    fs.unlink('./abdsad.js', (err) => {
      if (err) {
        console.error(err)
      }
    })
  }, 1000)

  // 처리결과
  [Error: ENOENT: no such file or directory, unlink './abdsad.js'] {
    errno: -2,
    code: 'ENOENT',
    syscall: 'unlink',
    path: './abdsad.js'
  }
  [Error: ENOENT: no such file or directory, unlink './abdsad.js'] {
    errno: -2,
    code: 'ENOENT',
    syscall: 'unlink',
    path: './abdsad.js'
  }
  // ...계속
  ```

  - 에러가 발생하지만 다행히 노드 내장 모듈의 에러는 실행 중인 프로세스를 멈추지 않습니다.
  - 에러 로그를 기록해두고 나중에 원인을 찾아 수정하면 됩니다.

- 프로미스의 에러

  ```javascript
  const fs = require('fs')

  setInterval(() => {
    fs.promises.unlink('./dsadsad.js')
  }, 1000)

  // 처리결과
  node:internal/process/promises:246
          triggerUncaughtException(err, true /* fromPromise */);
          ^

  [Error: ENOENT: no such file or directory, unlink './dsadsad.js'] {
    errno: -2,
    code: 'ENOENT',
    syscall: 'unlink',
    path: './dsadsad.js'
  }
  ```

  - 프로미스에서 에러가 발생하는 경우 프로세스가 멈춥니다.
  - 그러므로 항상 catch를 붙여줘서 에러를 처리할 수 있도록 해야 합니다.

- 예측이 불가능한 에러 처리

  ```javascript
  process.on('uncaughtException', (err) => {
    console.log('예기치 못한 에러', err)
  })

  setInterval(() => {
    throw new Error('서버를 고장내주마')
  }, 1000)

  setTimeout(() => {
    console.log('실행됩니다.')
  }, 2000)

  // 처리결과
  예기치 못한 에러 Error: 서버를 고장내주마
      at Timeout._onTimeout (/Users/haeny/dev/workspace/TIL/book/nodejs-textbook/src/chapter03/ch03-8/error4.js:6:9)
      at listOnTimeout (node:internal/timers:557:17)
      at processTimers (node:internal/timers:500:7)
  실행됩니다.
  예기치 못한 에러 Error: 서버를 고장내주마
      at Timeout._onTimeout (/Users/haeny/dev/workspace/TIL/book/nodejs-textbook/src/chapter03/ch03-8/error4.js:6:9)
      at listOnTimeout (node:internal/timers:557:17)
      at processTimers (node:internal/timers:500:7)
  // ...계속
  ```

  - setInterval 에서 에러가 발생하였지만, process 객체에 uncaughtException 이벤트 리스너를 달아주었습니다.
  - 처리하지 못한 에러를 이벤트 리스너가 실행되고 프로세스가 유지됩니다.
  - uncaughtException 이벤트 리스너로 모든 에러를 처리할 수 있을 것처럼 보입니다.
  - 실제로 uncaughtException의 콜백 함수에 에러 발생 시 복구 작업을 하는 코드를 넣어둔 사람도 있습니다.
  - 노드 공식 문서에서는 uncaughtException 이벤트를 최후의 수단으로 사용할 것을 명시하고 있습니다.
  - 노드는 uncaughtException 이벤트 발생 후 다음 동작이 제대로 동작하는지 보증하지 않습니다.
  - 즉, 복구 작업 코드를 넣어 두었더라도 그것이 동작하는지 확신할 수 없습니다.
  - 따라서, uncaughtException은 단순히 에러 내용을 기록하는 정도로 사용하고, 에러를 기록한 후 process.exit()으로 프로세스를 종료하는 것이 좋습니다.

### ➕ 3.8.1 자주 발생하는 에러들

- `node: command not found`
  - 노드를 설치했지만 이 에러가 발생하는 경우는 환경 변수가 제대로 설정되지 않은 것입니다.
  - node 외의 다른 명령어도 마찬가지입니다. 그 명령어를 수행할 수 있는 파일이 환경 변수에 들어 있어야 명령어를 콘솔에서 사용할 수 있습니다.
- `ReferenceError: {모듈명} is not defined`
  - 모듈을 require 했는지 확인합니다.
- `Error: Cannot find module {모듈명}`
  - 해당 모듈을 require 했지만 설치하지 않았습니다.
- `Error: Can't set headers after they are sent`
  - 요청에 대한 응답을 보낼 때 응답을 두 번 이상 보냈습니다.
  - 요청에 대항 응답은 한 번만 보내야 합니다.
- `FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory`
  - 코드를 실행할 때 메모리가 부족하여 스크립트가 정상 동작하지 않은 경우입니다.
  - 코드가 잘못되었을 확률이 높으므로 코드를 점검해보세요.
  - 만약 코드가 정상이지만 노드가 활용할 수 있는 메모리가 부족한 경우라면 노드의 메모리를 늘릴 수 있습니다.
    - 노드를 실행할 때 node --max-old-space-size=4096 파일명과 같은 명령어를 사용하면 됩니다.
- `UnhandledPromiseRejectionWarning: Unhandled promise rejection`
  - 프로미스 사용 시 catch 메서드를 붙이지 않으면 발생합니다.
- `EADDRINUSE {포트 번호}`
  - 해당 포트 번호에 이미 다른 프로세스가 연결되어 있습니다.
- `EACCES 또는 EPERM`
  - 노드가 작업을 수행하는 데 권한이 충분하지 않습니다.
- `EJSONPARSE`
  - package.json 등의 JSON 파일에 문법 오류가 있을 때 발생합니다.
- `ECONNREFUSED`
  - 요청을 보냈으나 연결이 성립하지 않을 때 발생합니다.
- `ETARGET`
  - package.json에 기록한 패키지 버전이 존재하지 않을 때 발생합니다.
- `ETIMEOUT`
  - 요청을 보냈으나 응답이 일정 시간 내에 오지 않을 때 발생합니다.
- `ENOENT: no such file or directory`
  - 지정한 폴더나 파일이 존재하지 않는 경우입니다.
