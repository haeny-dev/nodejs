/* eslint-disable prefer-destructuring */

const { default: fetch } = require('node-fetch')
const { v4: uuidv4 } = require('uuid')
const { getUsersCollection } = require('./mongo')
const { getAccessTokenForUserId } = require('./auth')

/** @type {string} */
const FB_APP_ID = process.env.FB_APP_ID
/** @type {string} */
const FB_CLIENT_SECRET = process.env.FB_CLIENT_SECRET

/**
 * @param {string} facebookId
 * @returns {Promise<string>}
 */
async function createUserWithFacebookProfileAndGetId({
  id: facebookId,
  name,
  picture,
}) {
  const users = await getUsersCollection()
  const userId = uuidv4()
  await users.insertOne({
    id: userId,
    facebookId,
    name,
    picture,
  })

  return userId
}

/**
 * @param {string} accessToken
 * @returns {Promise<string>}
 */
async function getFacebookProfileFromAccessToken(accessToken) {
  const appAccessTokenReq = await fetch(
    `https://graph.facebook.com/oauth/access_token?client_id=${FB_APP_ID}&client_secret=${FB_CLIENT_SECRET}&grant_type=client_credentials`
  )

  const appAccessToken = (await appAccessTokenReq.json()).access_token

  const debugReq = await fetch(
    `https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${appAccessToken}`
  )

  const debugResult = await debugReq.json()

  if (debugResult.data.app_id !== FB_APP_ID) {
    throw new Error('Not a valid access token')
  }

  const facebookId = debugResult.data.user_id

  const profileRes = await fetch(
    `https://graph.facebook.com/${facebookId}?fields=id,name,picture&access_token=${accessToken}`
  )
  return profileRes.json()
}

/**
 * @param {string} facebookId
 * @returns {Promise<string | undefined>}
 */
async function getUserIdWithFacebookId(facebookId) {
  const users = await getUsersCollection()
  const user = await users.findOne({
    facebookId,
  })

  return user ? user.id : undefined
}

/**
 * facebook 토큰을 검증하고, 해당 검증 결과로부터 우리 서비스의 유저를 만들거나,
 * 혹은 이미 있는 유저를 가져와서, 그 유저의 엑세스 토큰을 돌려준다.
 * @param {string} token
 */
async function getUserAccessTokenForFacebookAccessToken(token) {
  const fbProfile = await getFacebookProfileFromAccessToken(token)
  const { id: facebookId } = fbProfile

  const existingUserId = await getUserIdWithFacebookId(facebookId)

  // 2. 해당 Facebook ID에 해당하는 유저가 데이터베이스에 있는 경우
  if (existingUserId) {
    return getAccessTokenForUserId(existingUserId)
  }

  // 1. 해당 Facebook ID에 해당하는 유저가 데이터베이스에 없는 경우
  const userId = await createUserWithFacebookProfileAndGetId(fbProfile)
  return getAccessTokenForUserId(userId)
}

module.exports = {
  FB_APP_ID,
  FB_CLIENT_SECRET,
  getFacebookProfileFromAccessToken,
  getUserAccessTokenForFacebookAccessToken,
  getUserIdWithFacebookId,
}
