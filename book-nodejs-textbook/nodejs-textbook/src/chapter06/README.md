# Chapter06. 익스프레스 웹 서버 만들기

- 노드의 http 모듈을 가지고 웹 서버를 만들 때 코드가 보기 좋지 않고 확장성도 떨어진다는 것을 느낄수 있었다.

- 서버를 제작하는 과정에서의 불편함을 해소하고 편의 기능을 추가한 웹 서버 프레임워크가 있다.

- 대표적인 것이 익스프레스이다.

  - 익스프레스는 http 모듈의 요청과 응답 객체의 기존 메서드들도 계속 사용할 수 있지만, 편리한 메서드들을 추가하여 기능을 보완하였다.

- 익스프레스 외에도 koa나 hapi 같은 웹 서버 프레임워크가 있지만 npm 패키지의 다운로드 수를 비교하면 압도적으로 익스프레스가 높은 것을 알 수 있다.

- 다운로드 수가 많다고 항상 더 좋은 것은 아니지만 다운로드 수가 많은 것이 좋다는 데는 충분한 이유가 있다.
  - 많은 사람이 사용할수록 버그가 적고, 기능 추가나 유지 보수도 활발하게 일어난다.

## 📌 6.1 익스프레스 프로젝트 시작하기

```javascript
const express = require('express')

const app = express()
app.set('port', process.env.PORT || 4000)

app.get('/', (req, res) => {
  res.send('Hello, Express')
})

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중')
})
```

- app.set(키, 값) 을 사용해서 데이터를 저장할 수 있습니다.
- app.get(키) 로 가져올 수 있습니다.
- app.get(주소, 라우터) 는 주소에 대한 GET 요청이 올 때 어떤 동작을 할지 적는 부분입니다.

  - req 는 요청에 관한 정보가 들어 있는 객체이고, res는 응답에 관한 정보가 들어 있는 객체입니다.
  - 익스프레스에서는 res.write나 res.end 대신 res.sned를 사용하면 됩니다.

- GET 요청 외에도 POST, PUT, PATCH, DELETE, OPTIONS 에 대한 라우터를 위한 app.post, app.put, app.patch, app.delete, app.options 메서드가 존재합니다.
- 파일을 전송하고 싶을 경우

  ```javascript
  const express = require('express')
  const path = require('path')

  const app = express()
  app.set('port', process.env.PORT || 4000)

  app.get('/', (req, res) => {
    // res.send('Hello, Express')
    res.sendFile(path.resolve(__dirname, './index.html'))
  })

  app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
  })
  ```

## 📌 6.2 자주 사용하는 미들웨어

- 미들웨어는 익스프레스의 핵심이다.
- 요청과 응답의 중간(미들(middle))에 위치하여 미들웨어라고 부른다.
- 라우터와 에러 핸들러 또한 미들웨어의 일종이므로 미들웨어가 익스프레스의 핵심이다.
- 미들웨어는 요청과 응답을 조작하여 기능을 추가하기도 하고, 나쁜 요청을 걸러내기도 한다.
- 미들웨어는 app.use(미들웨어) 형태로 사용됩니다.

  ```javascript
  const express = require('express')
  const path = require('path')

  const app = express()
  app.set('port', process.env.PORT || 4000)

  app.use((req, res, next) => {
    console.log('모든 요청에 다 실행됩니다.')
    next()
  })

  app.get(
    '/',
    (req, res, next) => {
      console.log('GET / 요청에서만 실행됩니다.')
      next()
    },
    (req, res) => {
      throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
    }
  )

  app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send(err.message)
  })

  app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
  })
  ```

  - app.use 에 매개변수가 req, res, next 인 함수를 넣으면 된다.

  - 미들웨어는 위에서부터 아래로 순서대로 실행되면서 요청과 응답 사이에 특별한 기능을 추가할 수 있다.
  - next 라는 세번째 매개변수는 다음 미들웨어로 넘어가는 함수이다. next를 실행하지 않으면 다음 미들웨어가 실행되지 않는다.
  - 주소를 첫 번째 인수로 넣어주지 않는다면 미들웨어는 모든 요청에서 실행되고, 주소를 넣는다면 해당하는 요청에서만 실행된다.
  - app.use 나 app.get 같은 라우터에 미들웨어를 여러 개 장착할 수 있다. 다만, 이때도 next를 호출해야 다음 미들웨어로 넘어갈 수 있다.
  - 에러 처리 미들웨어는 매개변수가 err, req, res, next로 네 개이다. 모든 매개변수를 사용하지 않더라도 매개변수가 반드시 네 개여야 한다.
  - 기본적으로 익스프레스가 에러를 처리하긴 하지만 실무에서는 직접 에러 처리 미들웨어를 연결해주는 것이 좋다.
  - 에러 처리 미들웨어는 특별한 경우가 아니면 가장 아래에 위치하도록 한다.

## 📌 실무에서 자주 사용하는 패키지 설치

```shell
npm install morgan cookie-parser express-session dotenv
```

- dotenv 를 제외한 다른 패키지는 미들웨어이다.

```javascript
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')

require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 4000)

app.use(morgan('dev'))
app.use('/', express.static(path.resolve(__dirname, './public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: 'session-cookie',
  })
)

app.use((req, res, next) => {
  console.log('모든 요청에 다 실행됩니다.')
  next()
})

...
})
```

### ➕ 6.2.0 dotenv

- process.env를 관리하기 위한 패키지이다.

- .env 파일을 읽어서 process.env 에 추가해줍니다.

### ➕ 6.2.1 morgan

- morgan 미들웨어는 요청과 응답에 대한 정보를 콘솔에 기록한다.

  ```powershell
  4000 번 포트에서 대기 중
  모든 요청에 다 실행됩니다.
  GET / 요청에서만 실행됩니다.
  Error: 에러는 에러 처리 미들웨어로 갑니다.
  # 에러 스택 트레이스 생략
  GET / 500 3.203 ms - 50
  ```

  - `GET / 500 3.203 ms - 50` 로그는 morgan 미들웨어에서 나오는 것이다.

  - 인수로 dev 외에 combined, common, short, tiny 등을 넣을 수 있다.
  - dev 기준으로 `GET / 500 3.203 ms - 50` 는 각각 [HTTP 메서드][주소][HTTP 상태 코드][응답속도] - [응답 바이트]를 의미한다.

### ➕ 6.2.2 static

- static 미들웨어는 정적인 파일들을 제공하는 라우터 역할을 한다.

  - 기본적으로 제공되기에 따로 설치할 필요 없이 express 객체 안에서 꺼내 장착하면 된다.

  - `app.use([요청 경로], express.static([실제 경로]))` 형태로 사용한다.

  - 함수의 인수로 정적 파일들이 담겨 있는 폴더를 지정하면 된다.

    - 예를 들어 public/stylesheets/style.css 는 http://localhost:4000/stylesheets/style.css로 접근할 수 있다.

    - public 폴더를 만들고 css, js, 이미지 파일들을 넣으면 브라우저에서 접근할 수 있게 해준다.

  - 정적 파일들을 알아서 제공해주므로 fs.readFile 과 같이 파일을 직접 읽어 전송할 필요가 없다.

  - 요청 경로에 해당하는 파일이 없으면 알아서 내부적으로 next를 호출한다.

  - 파일을 발견했다면 다음 미들웨어는 실행되지 않는다. 응답으로 파일을 보내고 next를 호출하지 않는다.

### ➕ 6.2.3 body-parser

- 요청의 본문에 있는 데이터를 해석해서 req.body 객체로 만들어주는 미들웨어다.

  - 보통 폼 데이터나 ajax 요청의 데이터를 처리한다. 단, 멀티파트 데이터는 처리하지 못한다. 그 경우에는 multer 모듈을 사용하면 된다.

  - 다른 코드에서 body-parser 를 설치하는 것을 볼 수도 있다. 하지만 익스프레스 4.16.0 버전부터 body-parser 미들웨어 일부 기능이 익스프레스에 내장되어 있다.

    - body-parser 를 직접 설치해야 하는 경우
      - body-parser 는 json과 urlencoded 형식의 데이터 외에도 raw, text 형식의 데이터를 추가로 해석할 수 있다.
      - raw 는 요청의 본문이 버퍼 데이터 일 때, text는 텍스트 데이터일 때 이다.

  - body-parser 는 다음과 같이 사용한다.

    ```javascript
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    ```

  - json 은 json 형식의 데이터 전달 방식이고, urlencoded는 주소 형식으로 데이터를 보내는 방식이다.
  - urlencoded 의 { extended: false } 옵션이 있는데,
    - 이 옵션이 false면 노드의 querystring 모듈을 사용하여 쿼리스트링을 해석하고,
    - true면 qs모듈을 사용하여 쿼리스트링을 해석한다.
      - qs모듈은 내장 모듈이 아니라 npm패키지이며, querystring 모듈의 기능을 좀 더 확장한 모듈이다.

### ➕ 6.2.4 cookie-parser

- cookie-parser 는 요청에 동봉된 쿠키를 해석해 req.cookies 객체로 만든다.

  ```javascript
  app.use(cookieParser([비밀키]))
  ```

  - 해석된 쿠키들은 req.cookies에 들어간다. 이 때, name=zerocho 쿠키를 보냈다면 req.cookies는 { name: 'zerocho' } 가 된다.
  - 유효 기간이 지난 쿠키는 알아서 걸러낸다.
  - 첫 번째 인수로 비밀 키를 넣어줄 수 있는데, 서명된 쿠키가 있는 경우, 제공한 비밀 키를 통해 해당 쿠키가 내 서버가 만든 쿠키임을 검증할 수 있다.
    - 쿠키는 클라이언트에서 위조하기 쉬우므로 비밀 키를 통해 만들어낸 서명을 쿠키 값 뒤에 붙인다.
    - 서명이 붙으면 쿠키가 name=zerocho.sign 과 같은 모양이 된다.
    - 서명된 쿠키는 req.cookies 대신 req.signedCookies 객체에 들어 있다.
  - cookie-parser는 쿠키를 생성할 때 쓰이는 것이 아니다.
    - 쿠키를 생성/제거하기 위해서는 res.cookie, res.clearCookie 메서드를 사용해야 한다.
    - res.cookie(키, 값, 옵션) 형식으로 사용한다.
    - 쿠키 옵션은 domain, expires, httpOnly, maxAge, path, secure 등이 있다.
    - 쿠키를 지우려면, 키와 값 외에 옵션도 정확히 일치해야 쿠키가 지워진다. 단, expires나 maxAge옵션은 일치할 필요가 없다.
    - 옵션 중에는 signed라는 옵션이 있는데, true로 설정하면 쿠키 뒤에 서명이 붙는다.

### ➕ 6.2.5 express-session

- 세션 관리용 미들웨어입니다. 로그인 등의 이유로 세션을 구현하거나 특정 사용자를 위한 데이터를 임시적으로 저장해둘 때 매우 유용합니다.
- 1.5 버전 이전에는 내부적으로 cookie-parser 를 사용하고 있어서 cookie-parser 미들웨어보다 뒤에 위치해야 했지만, 1.5 버전 이후부터는 사용하지 않게 되어 순서가 상관없어졌습니다.

  ```javascript
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        secure: false,
      },
      name: 'session-cookie',
    })
  )
  ```

  - resave : 요청이 올 때 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할지 설정하는 것이다.
  - saveUninitialized : 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정하는 것이다.
  - express-session은 세션 관리 시 클라이언트에 쿠키를 보낸다. 이것이 세션 쿠키이다.
    - 안정하게 쿠키를 전송하려면 쿠키에 서명을 추가해야 하고, 쿠키를 서명하는 데 secret의 값이 필요하다.
    - cookie-parser의 secret과 같게 설정하는 것이 좋다.
    - 세션 쿠키의 이름은 name 옵션으로 정한다. 기본 이름은 connect.sid 이다.
    - cookie 옵션은 세션 쿠키에 대한 설정이다. maxAge, domain, path, expires, sameSite, httpOnly, secure 등 일반적인 쿠키 옵션이 모두 제공된다.
  - store 라는 옵션도 있다.
    - 현재는 메모리에 세션을 저장하도록 되어 있다.
    - 문제는 서버를 재시작하면 메모리가 초기화되어 세션이 모두 사라진다는 것이다.
    - 배포 시에는 store에 데이터베이스를 연결하여 세션을 유지하는 것이 좋다. 보통 레디스가 자주 쓰인다.

### ➕ 6.2.6 미들웨어의 특성 활용하기

- 미들웨어는 req, res, next를 매개변수로 가지는 함수로서 app.use나 app.get, app.post 등으로 장착한다.

- 특정한 주소의 요청에만 미들웨어가 실행되게 하려면 첫 번째 인수로 주소를 넣으면 된다.
- 동시에 여러 개의 미들우에어를 장착할 수도 있으며, 다음 미들웨어로 넘어가려면 next함수를 호출해야 한다.
- next 함수에 인수를 넣을 수도 있습니다.

  - route 라는 문자열을 넣으면 다음 라우터의 미들웨어로 바로 이동하고, 그 외의 인수를 넣는다면 바로 에러 처리 미들웨어로 이동한다.
  - 이때의 인수는 에러 처리 미들웨어의 err 매개변수가 된다.

- 미들웨어 간에 데이터를 전달하는 방법도 있다.

  - 세션을 사용한다면 req.session 객체에 데이터를 넣어도 되지만, 세션이 유지되는 동안에 데이터도 계속 유지된다는 단점이 있다.
  - 만약 요청이 끝날 때까지만 데이터를 유지하고 싶다면 req 객체에 데이터를 넣어두면 된다.
  - 요청이 처리되는 동안 req.data를 통해 미들웨어 간에 데이터를 공유할 수 있다.
  - 새로운 요청이 오면 req.data는 초기화된다.
  - app.set과의 차이
    - app.set은 익스프레스 전역적으로 사용되므로 사용자 개개인의 값을 넣기에는 부적절하며, 앱 전체의 설정을 공유할 때 사용하면 된다.

- 미들웨어를 사용할 때 유용한 패턴 - 미들웨어 안에 미들웨어를 넣는 방식

  ```javascript
  app.use(morgan('dev'))
  // or
  app.use((req, res, next) => {
    morgan('dev')(req, res, next)
  })
  ```

  - 위 두 방식은 같은 기능을 한다. 이 패턴이 유용한 이유는 기존 미들웨어의 기능을 확장할 수 있기 때문이다.
  - 예를 들어 조건에 따라 분기 처리를 할 수도 있다.

    ```javascript
    app.use((req, res, next) => {
      if (process.env.NODE_ENV === 'production') {
        morgan('combined')(req, res, next)
      } else {
        morgan('dev')(req, res, next)
      }
    })
    ```

### ➕ 6.2.7 multer

- 이미지, 동영상 등을 비롯한 여러 가지 파일들을 멀티파트 형식으로 업로드할 때 사용하는 미들웨어이다.

  ```javascript
  const multer = require('multer')
  const path = require('path')

  const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, done) {
        done(null, 'uploads/')
      },
      filename(req, file, done) {
        const ext = path.extname(file.originalname)
        done(null, path.basename(file.originalname, ext) + Date.now() + ext)
      },
    }),
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  })
  ```

  - storage

    - 어디에(destination) 어떤 이름으로(filename) 저장할지를 넣는다.
    - req 객체에는 요청에 대한 정보, file 객체에는 업로드한 파일에 대한 정보가 있고, done 매개변수는 함수이다.
    - done 함수의 첫 번째 인수에는 에러가 있다면 에러를 넣고, 두 번째 인수에는 실제 경로나 파일 이름을 넣어주면 된다.
    - req, file의 데이터를 가공해서 done으로 넘기는 형식이다.

  - limits
    - 업로드에 제한 사항을 설정할 수 있다.

- 위에서 생성한 upload 에는 다양한 종류의 미들웨어가 들어있다.

  - 파일을 하나만 업로드 하는 경우에는 single 미들웨어를 사용한다.

    ```javascript
    app.post('/upload', upload.single('image'), (req, res) => {
      console.log(req.file, req.body)
      res.send('ok')
    })
    ```

  - 여러 파일을 업로드 하는 경우

    - HTML 에는 multiple 을 적용한다.

      ```html
      <form
        action="/upload-multiple"
        method="post"
        ,
        enctype="multipart/form-data"
      >
        <input type="file" name="many" multiple />
        <input type="text" name="title" />
        <button type="submit">업로드</button>
      </form>
      ```

    - 미들웨어는 single이 아닌 array를 사용한다.

      ```javascript
      app.post('/upload-multiple', upload.array('many'), (req, res) => {
        console.log(req.files, req.body)
        res.send('ok')
      })
      ```

  - 파일을 여러 개 업로드하지만 input 태그나 폼 데이터의 키가 다른 경우에는 fields 미들웨어를 사용한다.

    ```html
    <form action="/upload-fields" method="post" , enctype="multipart/form-data">
      <input type="file" name="image1" />
      <input type="file" name="image2" />
      <input type="text" name="title" />
      <button type="submit">업로드</button>
    </form>
    ```

    ```javascript
    app.post(
      '/upload-fields',
      upload.fields([{ name: 'image1' }, { name: 'image2' }]),
      (req, res) => {
        console.log(req.files, req.body)
        res.send('ok')
      }
    )
    ```

  - 특수한 경우지만, 파일을 업로드하지 않고도 멀티파트 형식으로 업로드하는 경우가 있다. 그럴 때는 none 미들웨어를 사용한다.

    ```javascript
    app.post('/upload-none', upload.none(), (req, res) => {
      console.log(req.body)
      res.send('ok')
    })
    ```

## 📌 6.3 Router 객체로 라우팅 분리하기

- http 모듈만을 사용하여 라우터를 만들 때는 요청 메서드와 주소별로 분기 처리를 하느라 코드가 매우 복잡했다.
- Express 를 사용하는 이유 중 하나는 라우팅을 깔끔하게 관리할 수 있다는 점이다.
- 라우터를 많이 연결하면 app.js 코드가 길어지므로 Express 에서는 라우터를 분리할 수 있는 방법을 제공한다.

  ```javascript
  /* ./routes/index.js */
  const express = require('express')

  const router = express.Router()

  // GET '/'
  router.get('/', (req, res) => {
    res.send('Hello, Express')
  })

  module.exports = router
  ```

  ```javascript
  /* ./routes/user.js */
  const express = require('express')

  const router = express.Router()

  // GET /user
  router.get('/', (req, res) => {
    res.send('Hello, User')
  })

  module.exports = router
  ```

  ```javascript
  /* app.js */
  ...
  const indexRouter = require('./routes/index')
  const userRouter = require('./routes/user')

  const app = express()
  app.set('port', process.env.PORT || 4000)

  app.use(morgan('dev'))
  app.use('/', express.static(path.resolve(__dirname, './public')))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser(process.env.COOKIE_SECRET))
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        secure: false,
      },
      name: 'session-cookie',
    })
  )

  app.use('/', indexRouter)
  app.use('/user', userRouter)

  app.use((req, res, next) => {
    res.status(404).send('Not Found')
  })
  ...
  ```

- next 함수에 다음 라우터로 넘어가는 기능이 있다.

  - next('route') 이며, 라우터에 연결된 나머지 미들웨어들을 건너뛰고 싶을 때 사용한다.

    ```javascript
    router.get(
      '/',
      (req, res, next) => {
        next('route')
      },
      (req, res, next) => {
        console.log('실행되지 않습니다.')
        next()
      },
      (req, res, next) => {
        console.log('실행되지 않습니다.')
        next()
      }
    )
    router.get('/', (req, res, next) => {
      console.log('실행됩니다')
      res.send('Hello, Express')
    })
    ```

    - 같은 주소의 라우터를 여러 개 만들어도 된다. 라우터가 몇 개든 간에 next() 를 호출하면 다음 미들웨어가 실행된다.
    - next() 대신 next('route') 를 호출하면, 실행하지 않은 미들웨어가 있더라도 주소에 일치하는 다음 라우터로 간다.

- 라우터 주소에는 정규표현식을 비롯한 특수 패턴을 사용할 수 있다.

  - 자주 쓰이는 패턴 중 라우트 매개변수라고 불리는 패턴

    ```javascript
    router.get('/user/:id', (req, res) => {
      console.log(req.params, req.query)
    })
    ```

    - 주소에 :id 는 문자 그대로 :id를 의미하는 것이 아니다. 이 부분에는 다른 값을 넣을수 있다.

      - /user/1 이나 /user/123 등의 요청도 이 라우터가 처리하게 된다.

      - req.params 객체 안에 들어있고, :id 면 req.params.id로 조회할 수 있다.

    - 이 패턴을 사용할 때 주의할 점

      - 일반 라우터보다 뒤에 위치해야 한다. 다양한 라우터를 아우르는 와일드카드 역할을 하므로 일반 라우터보다는 뒤에 위치해야 다른 라우터를 방해하지 않는다.

        ```javascript
        router.get('/user/:id', (req, res) => {
          console.log('얘만 실행됩니다.')
        })
        router.get('/user/like', (req, res) => {
          console.log('전혀 실행되지 않습니다.')
        })
        ```

        - /user/like 라우터는 /user/:id 라우터보다 위에 위치해야 한다.

    - 주소에 쿼리스트링을 쓸 경우 쿼리스트링의 키-값 정보는 req.query 객체 안에 있다.

- 라우터에서 자주 쓰이는 활용법으로 app.route 나 router.route 가 있다.

  ```javascript
  router.get('/abc', (req, res) => {
    res.send('GET /abc')
  })
  router.post('/abc', (req, res) => {
    res.send('POST /abc')
  })
  ```

  ```javascript
  router
    .route('/abc')
    .get((req, res) => {
      res.send('GET /abc')
    })
    .post((req, res) => {
      res.send('POST /abc')
    })
  ```

## 📌 6.4 req, res 객체 살펴보기

- Express의 req, res 객체는 http 모듈의 req, res 객체를 확장한 것이다.

- 기존 http 모듈의 메서드도 사용할 수 있고, express 가 추가한 메서드나 속성을 사용할 수도 있다.
- 자주 쓰이는 속성과 메서드

  - req

    - req.app : req객체를 통해 app객체에 접근할 수 있다. req.app.get('port') 와 같은 식으로도 사용할 수 있다.
    - req.body : body-parser 미들웨어가 만드는 요청의 본문을 해석한 객체
    - req.cookies : cookie-parser 미들웨어가 만드는 요청의 쿠키를 해석한 객체
    - req.ip : 요청의 ip 주소가 담겨 있다.
    - req.params : 라우트 매개변수에 대한 정보가 담긴 객체
    - req.query : 쿼리스트링에 대한 정보가 담긴 객체
    - req.signedCookies : 서명된 쿠키들은 req.cookies 대신 여기에 담겨 있다.
    - req.get(헤더 이름) : 헤더의 값을 가져오고 싶을 때 사용하는 메서드

  - res
    - res.app : req.app처럼 res객체를 통해 app 객체에 접근할 수 있다.
    - res.cookie(키, 값, 옵션) : 쿠키를 설정하는 메서드
    - res.clearCookie(키, 값, 옵션) : 쿠키를 제거하는 메서드
    - res.end() : 데이터 없이 응답을 보낸다.
    - res.json(JSON) : JSON 형식의 응답을 보낸다.
    - res.redirect(주소) : 리다이렉트할 주소와 함께 응답을 보낸다.
    - res.render(뷰, 데이터) : 템플릿 엔진을 렌더링해서 응답할 때 사용하는 메서드
    - res.send(데이터) : 데이터와 함께 응답을 보낸다. 데이터는 문자열일 수도 있고 HTML일 수도 있으며, 버퍼일 수도 있고 객체나 배열일 수도 있다.
    - res.sendFile(경로) : 경로에 위치한 파일을 응답한다.
    - res.set(헤더, 값) : 응답의 헤더를 설정한다.
    - res.status(코드) : 응답 시의 HTTP 상태 코드를 지정한다.

## 📌 6.5 템플릿 엔진 사용하기

- 템플릿 엔진은 자바스크립트를 사용해서 HTML을 렌더링할 수 있게 한다.
- 기존 HTML과는 문법이 살짝 다를 수 있고, 자바스크립트 문법이 들어 있기도 한다.

### ➕ 6.5.1 퍼그(제이드)

- Express와 연결

  ```javascript
  ...
  const app = express()
  app.set('port', process.env.PORT || 4000)
  app.set('views', path.resolve(__dirname, './views'))
  app.set('view engine', 'pug')
  ...
  ```

  - views 는 템플릿 파일들이 위치한 폴더를 지정하는 것이다.

    - res.render 메서드가 이 폴더를 기준으로 템플릿 엔진을 찾아서 렌더링한다.
    - res.render('index') 라면 ./views/index.pug 를 렌더링 한다.

  - view engine 은 어떠한 종류의 템플릿 엔진을 사용할지를 나타낸다.

#### 6.5.1.1 HTML 표현

- HTML
  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <title>Express</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div id="login-button"></div>
      <div class="post-image"></div>
      <span id="highlight"></span>
      <p class="hidden full"></p>
      <p>Welcome to Express</p>
      <button type="submit">전송</button>
      <p>
        안녕하세요. 여러 줄을 입력합니다.
        <br />
        태그도 중간에 넣을 수 있습니다.
      </p>
      <style>
        h1 {
          font-size: 30px;
        }
      </style>
      <script>
        const message = 'Pug'
        alert(message)
      </script>
    </body>
  </html>
  ```
- Pug

  ```pug
  doctype html
  html
    head
      title= title
      link(rel="stylesheet", href="/style.css")
    body
      #login-button
      .post-image
      span#highlight
      p.hidden.full
      p Welcome to Express
      button(type='submit') 전송
      p
        | 안녕하세요.
        | 여러 줄을 입력합니다.
        br
        | 태그도 중간에 넣을 수 있습니다.
      style.
        h1{
          font-size: 30px;
        }
      script.
        const message = 'Pug'
        alert(message)
  ```

#### 6.5.1.2 변수

- HTML과 다르게 자바스크립트 변수를 템플릿에 렌더링할 수 있다.

- res.render 호출 시 보내는 변수가 퍼그를 처리한다.

  ```javascript
  // GET '/'
  router.get('/', (req, res) => {
    res.render('pug/index', { title: 'Express' })
  })
  ```

  - res.render(템플릿, 변수 객체)
  - 렌더링 하면서 { title: 'Express' } 객체를 변수로 집어넣으면, index.pug의 title 부분이 모두 Express로 치환된다.

- res.render 메서드에 변수 객체를 넣는 대신, res.locals 객체를 사용해서 변수를 넣을 수도 있다.

  ```javascript
  router.get('/', (req, res) => {
    res.locals.title = 'Express'
    res.render('pub/index')
  })
  ```

  - 템플릿 엔진이 res.locals 객체를 읽어서 변수를 집어 넣습니다.
  - 이 방식의 장점은 현재 라우터뿐만 아니라 다른 미들웨어에서도 res.locals 객체에 접근할 수 있다는 것이다.
  - 다른 미들웨어에서 템플릿 엔진용 변수를 미리 넣을 수도 있다.

- HTML

  ```html
  <h1>Express</h1>
  <p>Welcome to Express</p>
  <button class="Express" type="submit">전송</button>
  <input placeholder="Express 연습" />
  ```

- Pug

  ```text
  h1= title
  p Welcome to #{title}
  button(class=title, type='submit') 전송
  input(placeholder=title + ' 연습')
  ```

  - 변수를 텍스트로 사용하고 싶다면 태그 뒤에 =을 붙인 후 변수를 입력

  - 속성에도 =을 붙인 후 변수를 사용할 수 있다.
  - 텍스트 중간에 변수를 넣으려면 #{변수} 를 사용하면 된다.
  - #{} 의 내부와 = 기호 뒷부분은 자바스크립트로 해석하므로 input 태그의 경우처럼 자바스크립트 구문을 써도 된다.
  - 내부에 직접 변수를 선언할 수도 있다.

    - 빼기(-)를 먼저 입력하면 뒤에 자바스크립트 구문을 작성할 수 있다.

      ```javascript
      // Pug
      - const node = 'Node.js'
      - const js = 'Javascript'
      p #{node}와 #{js}
      ```

      ```html
      <!-- HTML -->
      <p>Node.js와 Javascript</p>
      ```

  - 퍼그는 기본적으로 변수의 특수 문자를 HTML 엔티티로 이스케이프한다. 원치않는다면 = 대신 != 을 사용하면 된다.

    ```javascript
    // Pug
    p = '<strong>이스케이프</strong>'
    p != '<strong>이스케이프 하지 않음</strong>'
    ```

    ```html
    <!-- HTML -->
    <p>&lt;strong&gt;이스케이프&lt;/strong&gt;</p>
    <p><strong>이스케이프 하지 않음</strong></p>
    ```

#### 6.5.1.3 반복문

```javascript
// Pug
ul
  each fruit, index in ['사과', '배', '오렌지', '바나나', '복숭아']
    li= (index + 1) + '번째 ' + fruit
```

```html
<!-- HTML -->
<ul>
  <li>1번째 사과</li>
  <li>2번째 배</li>
  <li>3번째 오렌지</li>
  <li>4번째 바나나</li>
  <li>5번째 복숭아</li>
</ul>
```

#### 6.5.1.4 조건문

- if

  ```javascript
  // Pug
  if isLoggedIn
    div 로그인 되었습니다.
  else
    div 로그인이 필요합니다.
  ```

  ```html
  <!-- isLoggedIn이 true일 때 -->
  <div>로그인 되었습니다.</div>
  <!-- isLoggedIn이 false일 때 -->
  <div>로그인이 필요합니다.</div>
  ```

- case

  ```javascript
  case fruit
    when 'apple'
      p 사과입니다.
    when 'banana'
      p 바나나입니다.
    when 'orange'
      p 오렌지입니다.
    default
      p 사과도 바나나도 오렌지도 아닙니다.
  ```

  ```html
  <!-- fruit이 apple일 때 -->
  <p>사과입니다.</p>
  <!-- fruit이 banana일 때 -->
  <p>바나나입니다.</p>
  <!-- fruit이 orange일 때 -->
  <p>오렌지입니다.</p>
  <!-- 기본값 -->
  <p>사과도 바나나도 오렌지도 아닙니다.</p>
  ```

#### 6.5.1.5 include

- 다른 퍼그나 HTML 파일을 넣을 수 있다.

  ```javascript
  // header.pug
  header
    a(href='/') Home
    a(href='/about') About

  // footer.pug
  footer
    div 푸터입니다.

  // main.pug
  include header
  main
    h1 메인 파일
    p 다른 파일을 include할 수 있습니다.
  include footer
  ```

  ```html
  <header>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </header>
  <main>
    <h1>메인 파일</h1>
    <p>다른 파일을 include할 수 있습니다.</p>
  </main>
  <footer>
    <div>푸터입니다.</div>
  </footer>
  ```

#### 6.5.1.6 extends 와 block

- 레이아웃을 정할 수 있습니다. 공통되는 레이아웃 부분을 따로 관리할 수 있어 좋습니다.

  ```javascript
  // layout.pug
  doctype html
  html
    head
      title= title
      link(rel='stylesheet', href='/style.css')
      block style
    body
      header 헤더입니다.
      block content
      footer 푸터입니다.
      block script

  // body.pug
  extends layout

  block content
    main
      p 내용입니다.

  block script
    script(src='/main.js')
  ```

  ```html
  <!-- HTML -->
  <!DOCTYPE html>
  <html>
    <head>
      <title>Express</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <header>헤더입니다.</header>
      <main>
        <p>내용입니다.</p>
      </main>
      <footer>푸터입니다.</footer>
      <script src="/main.js"></script>
    </body>
  </html>
  ```

  - 레이아웃이 될 파일에는 공통된 마크업을 넣되, 페이지마다 달라지는 부분을 block으로 비워둔다.
  - block 은 여러 개 만들어도 된다. block 은 block [블록명] 으로 선언한다.
  - block 이 되는 파일에서는 extends 키워드로 레이아웃 파일을 지정하고 block 부분을 넣는다.
  - block 선언보다 한 단계 더 들여쓰기되어 있어야 한다.

### ➕ 6.5.2 넌적스

- 넌적스는 퍼그의 HTML 문법 변화에 적응하기 힘든 분에게 적합한 템플릿 엔진이다.

- 파이어폭스를 만든 모질라에서 만들었다.
- HTML 문법을 그대로 사용하되 추가로 자바스크립트 문법을 사용할 수 있다.
- 파이썬의 템플릿 엔진인 Twig와 문법이 상당히 유사하다.

  ```javascript
  ...
  const nunjucks = require('nunjucks')

  ...
  const app = express()
  app.set('port', process.env.PORT || 4000)
  app.set('view engine', 'html')

  nunjucks.configure('views', {
    express: app,
    watch: true,
  })
  ...
  ```

  - configure의 첫 번째 인수로 views 폴더의 경로를 넣고, 두 번째 인수로 옵션을 넣는다.
    - express 옵션에 app 객체를 연결한다.
    - watch 옵션이 true이면 HTML 파일이 변경될 때 템플릿 엔진을 다시 렌더링한다.
  - 파일은 html을 그대로 사용해도 된다. 넌적스임을 구분하려면 njk를 쓰면 되는데, 이 때는 view engine도 njk로 바꿔야 한다.

#### 6.5.2.1 변수

```html
<!-- Nunjucks -->
<h1>{{title}}</h1>
<p>Welcome to {{title}}</p>
<button class="{{title}}" type="submit">전송</button>
<input placeholder="{{title}} 연습" />

{% set node = 'Node.js' %} {% set js = 'Javascript' %}
<p>{{node}}와 {{js}}</p>

<p>{{'<strong>이스케이프</strong>'}}</p>
<p>{{'<strong>이스케이프하지 않음</strong>' | safe}}</p>
```

```html
<!-- HTML -->
<h1>Express</h1>
<p>Welcome to Express</p>
<button class="Express" type="submit">전송</button>
<input placeholder="Express 연습" />

<p>Node.js와 Javascript</p>

<p>&lt;strong&gt;이스케이프&lt;/strong&gt;</p>
<p><strong>이스케이프 하지 않음</strong></p>
```

#### 6.5.2.2 반복문

```html
<!-- Nunjucks -->
<ul>
  {% set fruits = ['사과', '배', '오렌지', '바나나', '복숭아'] %} {% for item in
  fruits %}
  <li>{{loop.index}}번째 {{item}}</li>
  {% endfor %}
</ul>
```

```html
<!-- HTML -->
<ul>
  <li>1번째 사과</li>
  <li>2번째 배</li>
  <li>3번째 오렌지</li>
  <li>4번째 바나나</li>
  <li>5번째 복숭아</li>
</ul>
```

#### 6.5.2.3 조건문

```html
<!-- Nunjucks -->
{% if isLoggedIn %}
<div>로그인 되었습니다.</div>
{% else %}
<div>로그인이 필요합니다.</div>
{% endif %}
```

```html
<!-- isLoggedIn이 true일 때 -->
<div>로그인 되었습니다.</div>
<!-- isLoggedIn이 false일 때 -->
<div>로그인이 필요합니다.</div>
```

```html
<!-- Nunjucks -->
{% if fruit === 'apple' %}
<p>사과입니다.</p>
{% elif fruit === 'banana' %}
<p>바나나입니다.</p>
{% elif fruit === 'orange' %}
<p>오렌지입니다.</p>
{% else %}
<p>사과도 바나나도 오렌지도 아닙니다.</p>
{% endif %}
```

```html
<!-- fruit이 apple일 때 -->
<p>사과입니다.</p>
<!-- fruit이 banana일 때 -->
<p>바나나입니다.</p>
<!-- fruit이 orange일 때 -->
<p>오렌지입니다.</p>
<!-- 기본값 -->
<p>사과도 바나나도 오렌지도 아닙니다.</p>
```

```html
<!-- Nunjucks -->
<div>{{ '참' if isLoggedIn }}</div>
<div>{{ '참' if isLoggedIn else '거짓' }}</div>
```

```html
<!-- HTML -->
<!-- isLoggedIn이 true일 때 -->
<div>참</div>
<!-- isLoggedIn이 false일 때 -->
<div>거짓</div>
```

#### 6.5.2.4 include

```html
<!-- Nunjucks -->
<!-- header.html -->
<header>
  <a href="/">Home</a>
  <a href="/about">About</a>
</header>

<!-- footer.html -->
<footer>
  <div>푸터입니다.</div>
</footer>

<!-- main.html -->
{% include "header.html" %}
<main>
  <h1>메인 파일</h1>
  <p>다른 파일을 include할 수 있습니다.</p>
</main>
{% include "footer.html" %}
```

```html
<!-- HTML -->
<!DOCTYPE html>
<html>
  <head>
    <title>Express</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <header>헤더입니다.</header>
    <main>
      <p>내용입니다.</p>
    </main>
    <footer>푸터입니다.</footer>
    <script src="/main.js"></script>
  </body>
</html>
```

#### 6.5.2.5 extends와 block

```html
<!-- Nunjucks -->
<!-- layout.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>{{title}}</title>
    <link rel="stylesheet" href="/style.css" />
    {% block style %} {% endblock %}
  </head>
  <body>
    <header>헤더입니다.</header>
    {% block content %} {% endblock %}
    <footer>푸터입니다.</footer>
    {% block script %} {% endblock %}
  </body>
</html>

<!-- body.html -->
{% extends 'layout.html' %} {% block content %}
<main>
  <p>내용입니다.</p>
</main>
{% endblock %} {% block script %}
<script src="/main.js"></script>
{% endblock %}
```

```html
<!-- HTML -->
<!DOCTYPE html>
<html>
  <head>
    <title>Express</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <header>헤더입니다.</header>
    <main>
      <p>내용입니다.</p>
    </main>
    <footer>푸터입니다.</footer>
    <script src="/main.js"></script>
  </body>
</html>
```
