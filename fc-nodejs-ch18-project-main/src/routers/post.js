const express = require('express')
const { v1: uuidv1 } = require('uuid')
const { redirectWithMsg } = require('../util')
const { getPostsCollection } = require('../mongo')

const router = express.Router()

router.post('/', async (req, res) => {
  if (!req.user) {
    return res.status(403).end()
  }

  const posts = await getPostsCollection()
  const { content } = req.body

  await posts.insertOne({
    id: uuidv1(),
    userId: req.user.id,
    content,
    createdAt: new Date(),
  })

  redirectWithMsg({
    res,
    dest: '/',
    info: '게시물이 작성되었습니다.',
  })
})

router.post('/:postId/delete', async (req, res) => {
  const { postId } = req.params

  const posts = await getPostsCollection()

  const existingPost = await posts.findOne({
    id: postId,
  })

  if (existingPost.userId !== req.user.id) {
    return res.status(403).end()
  }

  await posts.deleteOne({
    id: postId,
  })

  redirectWithMsg({
    res,
    dest: '/',
    info: '포스트가 삭제되었습니다.',
  })
})

router.post('/:postId/update', async (req, res) => {
  const { postId } = req.params
  const { content } = req.body

  const posts = await getPostsCollection()

  const existingPost = await posts.findOne({
    id: postId,
  })

  if (existingPost.userId !== req.user.id) {
    return res.status(403).end()
  }

  await posts.updateOne(
    {
      id: postId,
    },
    {
      $set: {
        content,
      },
    }
  )

  redirectWithMsg({
    res,
    dest: '/',
    info: '포스트가 삭제되었습니다.',
  })
})

module.exports = router
