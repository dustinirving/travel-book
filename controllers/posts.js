const router = require('express').Router()
const { Post } = require('../models')

router.post('/posts/new', async (req, res, next) => {
  try {
    const post = await Post.create(req.body)
    res.status(201).json({ data: post })
  } catch (err) {
    next(err)
  }
})

module.exports = router
