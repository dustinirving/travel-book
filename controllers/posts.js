const router = require('express').Router()
const { Post } = require('../models')
const isAuthenticated = require('../config/middleware/isAuthenticated')

//  GET route for getting all of the posts
router.get('/', isAuthenticated, async function (req, res) {
  try {
    const postsArray = await Post.findAll()
    res.status(200).json({ data: postsArray })
  } catch (err) {
    console.log('GET /posts failed \n', err)
    res.status(500).json({ errors: [err] })
  }
})

router.get('/post/new', (req, res) => res.send('I can post'))

router.post('/post/new', isAuthenticated, async (req, res, next) => {
  const data = {}
  data.location = req.body.location
  data.travelExperience = req.body.travelExperience
  data.imageURL = req.body.imageURL
  data.UserId = req.user.id
  data.createdAt = req.user.createdAt
  data.updatedAt = req.user.updatedAt

  try {
    const post = await Post.create(data)
    res.status(201).json({ data: post })
  } catch (err) {
    res.status(500).json({ errors: [err] })
    next(err)
  }
})

//  Get route for retrieving a single post
// router.get('/posts/:id', function (req, res) {
//   Post.findByPk(req.params.id)
//     .then(post => res.status(200).json({ data: post }))
//     .catch(err => {
//       console.log('GET /posts failed \n', err)
//       res.status(500).json({ errors: [err] })
//     })
// })

//  DELETE route for deleting posts
// router.delete('/posts/:id', async function (req, res) {
//   try {
//     const post = await Post.findByPk(req.params.id)
//     await post.destroy()
//     res.status(200).json({ data: post })
//   } catch (err) {
//     console.log('GET /posts failed \n', err)
//     res.status(500).json({ errors: [err] })
//   }
// })

//  PUT route for updating posts
// router.put('/posts/:id', async function (req, res) {
//   try {
//     const post = await Post.findByPk(req.params.id)
//     await post.update(req.body)
//     res.status(200).json({ data: post })
//   } catch (err) {
//     console.log('GET /posts failed \n', err)
//     res.status(500).json({ errors: [err] })
//   }
// })

module.exports = router
