const router = require('express').Router()
const { Post, User } = require('../models')
const isAuthenticated = require('../config/middleware/isAuthenticated')

//  GET route for getting all of the posts
router.get('/home', isAuthenticated, async function (req, res) {
  try {
    const postsData = await Post.findAll({ order: [['createdAt', 'DESC']] })
    // const postsData = await Post.findAll({ include: [{ model: User }] })
    // This maps the posts Array to be displayed in the client
    const postsArray = []
    const start = async () => {
      async function asyncForEach (array, callback) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array)
        }
      }

      await asyncForEach(postsData, async item => {
        const dataObject = await User.findByPk(item.dataValues.UserId)
        const user = await dataObject.dataValues.username
        let travelExperienceStr = item.dataValues.travelExperience
        if (travelExperienceStr.length > 20) {
          travelExperienceStr = travelExperienceStr.slice(0, 20) + '...'
        }
        // Creating a new object with desired properties
        const postObject = {
          id: item.dataValues.id,
          author: user,
          location: item.dataValues.location,
          travelExperience: travelExperienceStr,
          imageURL: item.dataValues.imageURL
        }
        postsArray.push(postObject)
      })
      res.render('home', { postsArray })
    }
    start()
  } catch (err) {
    console.log('GET /posts failed \n', err)
    res.status(500).json({ errors: [err] })
  }
})

// edit posts route //
router.get('/edit', function (req, res) {
  res.render('edit')
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

// UPDATE ROUTE
router.get('/post/:id/edit', async function (req, res) {
  console.log(req.params.id)
  try {
    // let editPost = await Post.findByPk(req.params.id)
    // res.status(200).json({ data: editPost })
    res.render('view')
  } catch (err) {
    // console.log(`GET failed \n`, err)
    res.status(500).json({ errors: [err] })
    // res.redirect('home')
  }
})

router.get('/view/:id', async function (req, res) {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
      include: [User]
    })
    console.log(req.user.id)
    const postObject = {
      author: post.dataValues.User.username,
      authorId: post.dataValues.UserId,
      location: post.dataValues.location,
      travelExperience: post.dataValues.travelExperience,
      imageURL: post.dataValues.imageURL,
      userId: req.user.id
    }
    console.log(postObject)
    res.render('view', postObject)
  } catch (err) {
    // console.log(`GET failed \n`, err)
    res.status(500).json({ errors: [err] })
    // res.redirect('home')
  }
})

//  PUT route for updating posts
router.put('/post/:id', async function (req, res) {
  try {
    const post = await Post.findByPk(req.params.id)
    await post.update(req.body)
    res.status(200).json({ data: post })
  } catch (err) {
    console.log('GET /posts failed \n', err)
    res.status(500).json({ errors: [err] })
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

module.exports = router
