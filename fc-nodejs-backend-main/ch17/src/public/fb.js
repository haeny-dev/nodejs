window.fbAsyncInit = () => {
  FB.init({
    appId: APP_CONFIG.FB_APP_ID,
    // cookie: true,
    // xfbml: true,
    version: 'v12.0',
  })

  document.getElementById('fb-login').addEventListener('click', () => {
    FB.login(
      (response) => {
        console.log(response)

        fetch(
          `/user/auth/facebook?access_token=${response.authResponse.accessToken}`,
          {
            method: 'POST',
          }
        ).then(() => window.location.reload())
      },
      {
        scope: 'public_profile,email',
      }
    )
  })

  FB.AppEvents.logPageView()
}
;((d, s, id) => {
  const fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) {
    return
  }
  const js = d.createElement(s)
  js.id = id
  js.src = 'https://connect.facebook.net/en_US/sdk.js'
  fjs.parentNode.insertBefore(js, fjs)
})(document, 'script', 'facebook-jssdk')
