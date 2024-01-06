/* eslint-disable new-cap */
;(() => {
  const LOGIN_BUTTON_ID = 'naver-login'
  const ORIGINAL_LOGIN_BUTTON_ID = 'naver_id_login_anchor'

  const naver = new naver_id_login(
    APP_CONFIG.NAVER_CLIENT_ID,
    APP_CONFIG.NAVER_REDIRECT_URI
  )

  const state = naver.getUniqState()
  naver.setDomain(`https://${APP_CONFIG.HOST}/`)
  naver.setState(state)
  naver.init_naver_id_login()

  const el = document.getElementById(LOGIN_BUTTON_ID)
  if (!el) {
    throw new Error(
      `Failed to find Naver login button with ID: ${LOGIN_BUTTON_ID}`
    )
  }

  const originalButton = document.getElementById(ORIGINAL_LOGIN_BUTTON_ID)
  if (!originalButton) {
    throw new Error(
      `Failed to find original Naver login button with ID: ${ORIGINAL_LOGIN_BUTTON_ID}. Did you forget to initialize the SDK?`
    )
  }

  el.addEventListener('click', () => {
    originalButton.click()
  })
})()
