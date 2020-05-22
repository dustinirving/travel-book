const router = require('express').Router()
const { Post } = require('../models')
const isAuthenticated = require('../config/middleware/isAuthenticated')

//  GET route for getting all of the posts
router.get('/home', isAuthenticated, async function (req, res) {
  try {
    const postsData = await Post.findAll()
    // This maps the posts Array to be displayed in the client
    const postsArray = postsData.map((item) => {
      let travelExperienceStr = item.dataValues.travelExperience
      if (travelExperienceStr.length > 20) {
        travelExperienceStr = travelExperienceStr.slice(0, 20) + '...'
      }
      // Creating a new object with desired properties
      const postObject = {
        author: item.dataValues.UserId,
        location: item.dataValues.location,
        travelExperience: travelExperienceStr,
        imageURL: item.dataValues.imageURL
      }
      return postObject
    })
    res.render('home', { postsArray })
  } catch (err) {
    console.log('GET /posts failed \n', err)
    res.status(500).json({ errors: [err] })
  }
})

// edit posts route //
router.get('/edit', function (req, res) {
  res.render('edit')
})

// view post route //
router.get('/view', function (req, res) {
  res.render('view')
})

// Get route for getting new post form
router.get('/post/new', function (req, res) {
  res.render('create')
})

router.post('/post/new', isAuthenticated, async (req, res, next) => {
  const data = {}
  data.location = req.body.location
  data.travelExperience = req.body.travelExperience
  data.imageURL = req.body.imageURL
  data.UserId = req.user.id
  data.createdAt = req.body.createdAt
  data.updatedAt = req.body.updatedAt

  try {
    await Post.create(data)
    res.status(201).redirect('/posts/home')
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
