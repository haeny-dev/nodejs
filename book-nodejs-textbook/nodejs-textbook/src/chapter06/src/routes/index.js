const express = require('express')

const router = express.Router()

// GET '/'
router.get('/', (req, res) => {
  res.render('pug/index.pug', { title: 'Express' })
})

module.exports = router
