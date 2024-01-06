// @ts-check
const { default: fetch } = require('node-fetch')
const { FB_APP_ID, FB_CLIENT_SECRET } = require('../common')
const { setAccessTokenCookie, createUserOrLogin } = require('../auth/auth')

/**
 * @param {string} accessToken
 * @returns {Promise<string>}
 */
async function getFacebookProfileFromAccessToken(accessToken) {
  const accessTokenRes = await fetch(
    `https://graph.facebook.com/oauth/access_token?client_id=${FB_APP_ID}&client_secret=${FB_CLIENT_SECRET}&grant_type=client_credentials`
  )
  const appAccessToken = (await accessTokenRes.json()).access_token

  const debugRes = await fetch(
    `https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${appAccessToken}`
  )
  const debugResult = await debugRes.json()

  if (debugResult.data.app_id !== FB_APP_ID) {
    throw new Error('Not a valid access token.')
  }

  const facebookId = debugResult.data.user_id

  const profileRes = await fetch(
    `https://graph.facebook.com/${facebookId}?fields=id,name,picture&access_token=${accessToken}`
  )
  return profileRes.json()
}

/**
 * @param {string} token
 */
async function getUserAccessTokenForFacebookAccessToken(token) {
  const fbProfile = await getFacebookProfileFromAccessToken(token)
  const { id: facebookUserId } = fbProfile

  const res = await createUserOrLogin({
    platform: 'facebook',
    platformUserId: facebookUserId,
  })

  return res.accessToken
}

/**
 * @param {import('express').Express} app
 */
function setupFacebookLogin(app) {
  app.post('/auth/facebook/signin', async (req, res) => {
    const { access_token: fbUserAccessToken } = req.query

    if (typeof fbUserAccessToken !== 'string') {
      res.sendStatus(400)
      return
    }

    const userAccessToken = await getUserAccessTokenForFacebookAccessToken(
      fbUserAccessToken
    )
    setAccessTokenCookie(res, userAccessToken)
    res.sendStatus(200)
  })
}

module.exports = {
  setupFacebookLogin,
  getUserAccessTokenForFacebookAccessToken,
  getFacebookProfileFromAccessToken,
}
