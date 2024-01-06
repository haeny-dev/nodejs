const passport = require('passport')
const local = require('./localStrategy')
const kakao = require('./kakaoStrategy')
const User = require('../models/user')

module.exports = () => {
  /**
   * 로그인 시 실행되며, req.session 객체에 어떤 데이터를 저장할지 정하는 메서드이다.
   * done 함수의 첫 번째 인수는 에러 발생 시 사용하는 것이고, 두 번째 인수에는 저장하고 싶은 데이터를 넣는다.
   * 로그인 시 사용자 데이터를 세션에 저장하는데, 세션에 사용자 정보를 모두 저장하면 세션의 용량이 커지고 데이터 일관성에 문제가 발생하므로 사용자 아이디만 저장한다.
   */
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  /**
   * 매 요청 시 실행되며, passport.session 미들웨어가 이 메서드를 호출한다.
   * serialize시 done의 두 번째 인수로 넣었던 데이터가 deserialize시 매개변수가 된다.
   * 여기서는 사용자의 아이디이며, 아이디를 받아 데이터베이스에서 사용자 정보를 조회합니다.
   * 그 정보를 req.user에 저장하므로 앞으로 req.user를 통해 로그인한 사용자의 정보를 가져올 수 있다.
   */
  passport.deserializeUser((id, done) => {
    User.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ['id', 'nick'],
          as: 'Followers',
        },
        {
          model: User,
          attributes: ['id', 'nick'],
          as: 'Followings',
        },
      ],
    })
      .then((user) => done(null, user))
      .catch((err) => done(err))
  })

  local()
  kakao()
}
