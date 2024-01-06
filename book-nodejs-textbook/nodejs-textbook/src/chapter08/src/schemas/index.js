const mongoose = require('mongoose')

const { MONGO_PASSWORD, MONGO_USER, MONGO_DBNAME, MONGO_CLUSTER } = process.env

const connect = () => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true)
  }

  mongoose.connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DBNAME}?retryWrites=true&w=majority`,
    {
      dbName: 'nodejs',
      // mongoose 6 이후 버전부터는 명시하지 않아도 자동으로 아래와 같이 설정한다.
      // useNewUrlParser: true,
      // useCreateIndex: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false
    },
    (error) => {
      if (error) {
        console.log('몽고디비 연결 에러', error)
      } else {
        console.log('몽고디비 연결 성공')
      }
    }
  )
}

mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error)
})

mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.')
  connect()
})

module.exports = connect
