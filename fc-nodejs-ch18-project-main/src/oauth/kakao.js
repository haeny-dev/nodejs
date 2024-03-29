const { default: fetch } = require('node-fetch')
const { createUserOrLogin, setAccessTokenCookie } = require('../auth/auth')
const { KAKAO_REST_KEY, KAKAO_REDIRECT_URI } = require('../common')

/**
 * @typedef KakaoTokenRes
 * @property {string} access_token
 */

/**
 * @typedef KakaoProfile
 * @property {string} nickname
 * @property {string} thumbnail_image_url
 * @property {string} profile_image_url
 * @property {boolean} is_default_image
 */

/**
 * @typedef KakaoAccount
 * @property {string} email
 * @property {KakaoProfile} profile
 */

/**
 * @typedef KakaoMeAPIResult
 * @property {number} id
 * @property {KakaoAccount} kakao_account
 */

/**
 * @param {import('express').Express} app
 */
function setupKakaoLogin(app) {
  app.get('/auth/kakao/callback', async (req, res) => {
    const { code } = req.query

    if (!code || typeof code !== 'string') {
      return res.status(400).end()
    }

    const url = new URL('https://kauth.kakao.com/oauth/token')
    url.searchParams.append('grant_type', 'authorization_code')
    url.searchParams.append('client_id', KAKAO_REST_KEY)
    url.searchParams.append('redirect_uri', KAKAO_REDIRECT_URI)
    url.searchParams.append('code', code)

    const kakaoTokenRes = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    })

    const accessToken = (await kakaoTokenRes.json()).access_token

    const userInfoRes = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    })

    /** @type {KakaoMeAPIResult} */
    const me = await userInfoRes.json()
    if (!me.id) {
      return res.status(500).end()
    }

    const user = await createUserOrLogin({
      platform: 'kakao',
      platformUserId: me.id.toString(),
      nickname: me.kakao_account.profile.nickname,
      profileImageURL: me.kakao_account.profile.profile_image_url,
    })
    setAccessTokenCookie(res, user.accessToken)
    res.redirect('/')
  })
}

module.exports = {
  setupKakaoLogin,
}
