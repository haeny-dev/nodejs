// @ts-check

const express = require('express')

const multer = require('multer')

const upload = multer({ dest: 'uploads/' })

const router = express.Router()

const USERS = {
  15: {
    nickname: 'foo',
    profileImageKey: undefined,
  },
  16: {
    nickname: 'bar',
    profileImageKey: undefined,
  },
}

router.get('/', (req, res) => {
  res.send('User list')
})

router.param('id', async (req, res, next, value) => {
  try {
    // @ts-ignore
    const user = USERS[value]
    if (!user) {
      const err = new Error('User not found.')
      // @ts-ignore
      err.statusCode = 404
      throw err
    }

    // @ts-ignore
    req.user = user
    next()
  } catch (err) {
    next(err)
  }
})

/* /users/15 */
router.get('/:id', (req, res) => {
  const resMimeType = req.accepts(['json', 'html'])

  if (resMimeType === 'json') {
    // @ts-ignore
    res.send(req.user)
  } else if (resMimeType === 'html') {
    res.render('user-profile', {
      // @ts-ignore
      nickname: req.user.nickname,
      userId: req.params.id,
      // profileImageURL: '/uploads/d5910094e24eb2ada19c7239fb523d08',
      profileImageURL: `/uploads/${req.user.profileImageKey}`,
    })
  }
})

router.post('/', (req, res) => {
  // Register User
  res.send('User Registered')
})

router.post('/:id/nickname', (req, res) => {
  // req.body => {"nickname": "bar"}
  // @ts-ignore
  const { user } = req
  const { nickname } = req.body

  user.nickname = nickname
  res.send(`User nickname updated: ${user}`)
})

router.post('/:id/profile', upload.single('profile'), (req, res, next) => {
  const { user } = req
  const { filename } = req.file
  user.profileImageKey = filename
  res.send(`User Profile image uploaded: ${filename}`)
})

module.exports = router
