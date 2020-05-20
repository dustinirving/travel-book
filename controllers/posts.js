const router = require('express').Router()
const { Post } = require('../models')

router.post('/posts/new', async (req, res, next) => {
  try {
    const post = await Post.create(req.body)
    res.status(201).json({ data: post })
  } catch (err) {
    res.status(500).json({ errors: [err] })
    next(err)
  }
})

// Other Post api routes
//  GET route for getting all of the posts
// router.get('/posts/', function (req, res) {
//   Post.findAll()
//     .then(postsArray => res.status(200).json({ data: postsArray }))
//     .catch(err => {
//       console.log('GET /posts failed \n', err)
//       res.status(500).json({ errors: [err] })
//     })
// })

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
