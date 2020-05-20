// Dependencies
// =============================================================

const express = require('express')
const router = express.Router()

// Import the Post model using object destructuring assignment
const { Post, User } = require('../models')

// Routes
// =============================================================

// User api routes
router.get('/users', function (req, res) {
  User.findAll()
    .then(usersArray => {
      res.status(200).json({ data: usersArray })
    })
    .catch(err => {
      console.log('GET /posts failed \n', err)
      res.status(500).json({ errors: [err] })
    })
})
router.post('/users', function (req, res) {
  console.log('New post data received: \n', req.body)
  User.create(req.body)
    .then(user => res.status(201).json({ data: user }))
    .catch(err => {
      console.log('GET /posts failed \n', err)
      res.status(500).json({ errors: [err] })
    })
})

// Post api routes
// GET route for getting all of the posts
router.get('/posts/', function (req, res) {
  Post.findAll()
    .then(postsArray => res.status(200).json({ data: postsArray }))
    .catch(err => {
      console.log('GET /posts failed \n', err)
      res.status(500).json({ errors: [err] })
    })
})

// Get route for retrieving a single post
router.get('/posts/:id', function (req, res) {
  Post.findByPk(req.params.id)
    .then(post => res.status(200).json({ data: post }))
    .catch(err => {
      console.log('GET /posts failed \n', err)
      res.status(500).json({ errors: [err] })
    })
})

// POST route for saving a new post
router.post('/posts', function (req, res) {
  console.log('New post data received: \n', req.body)
  Post.create(req.body)
    .then(post => res.status(201).json({ data: post }))
    .catch(err => {
      console.log('GET /posts failed \n', err)
      res.status(500).json({ errors: [err] })
    })
})

// DELETE route for deleting posts
router.delete('/posts/:id', async function (req, res) {
  try {
    const post = await Post.findByPk(req.params.id)
    await post.destroy()
    res.status(200).json({ data: post })
  } catch (err) {
    console.log('GET /posts failed \n', err)
    res.status(500).json({ errors: [err] })
  }
})

// PUT route for updating posts
router.put('/posts/:id', async function (req, res) {
  try {
    const post = await Post.findByPk(req.params.id)
    await post.update(req.body)
    res.status(200).json({ data: post })
  } catch (err) {
    console.log('GET /posts failed \n', err)
    res.status(500).json({ errors: [err] })
  }
})

module.exports = router
