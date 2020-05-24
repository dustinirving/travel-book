const path = require('path')
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
        if (travelExperienceStr.length > 500) {
          travelExperienceStr = travelExperienceStr.slice(0, 500) + '...'
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
  const data = {
    location: req.body.location,
    travelExperience: req.body.travelExperience,
    UserId: req.user.id
  }
  try {
    const post = await Post.create(data)
    if (req.files && req.files.imageURL) {
      const image = req.files.imageURL
      // Prepend the fileName with the User.id to prevent naming collisions
      // with other users uploading files with the same name.
      const fileName = `${post.id}_${image.name}`
      // Move the file from the tmp location to the public folder.
      await image.mv(path.join(__dirname, '..', 'public', 'images', fileName))
      // Record the public URL on the User model and store it in the database.
      post.imageURL = `/images/${fileName}`
      post.save()
    }
    res.status(201).redirect('/posts/home')
  } catch (err) {
    res.status(500).json({ errors: [err] })
    next(err)
  }
})

router.get('/view/:id', async function (req, res) {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
      include: [User]
    })
    const postObject = {
      id: post.dataValues.id,
      author: post.dataValues.User.username,
      authorId: post.dataValues.UserId,
      location: post.dataValues.location,
      travelExperience: post.dataValues.travelExperience,
      imageURL: post.dataValues.imageURL,
      userId: req.user.id
    }
    res.render('view', postObject)
  } catch (err) {
    // console.log(`GET failed \n`, err)
    res.status(500).json({ errors: [err] })
    // res.redirect('home')
  }
})

//  DELETE route for deleting posts
router.delete('/view/delete/:id', async function (req, res) {
  try {
    const post = await Post.findByPk(req.params.id)
    await post.destroy()
    res.status(200).json(post)
  } catch (err) {
    console.log('GET /posts failed \n', err)
    res.status(500).json({ errors: [err] })
  }
})

// UPDATE ROUTE
router.get('/edit/post/:id', async function (req, res) {
  try {
    const post = await Post.findByPk(req.params.id)
    const postObject = {
      id: post.dataValues.id,
      authorId: post.dataValues.UserId,
      location: post.dataValues.location,
      travelExperience: post.dataValues.travelExperience,
      imageURL: post.dataValues.imageURL,
      userId: req.user.id
    }
    res.render('edit', postObject)
  } catch (err) {
    // console.log(`GET failed \n`, err)
    res.status(500).json({ errors: [err] })
    // res.redirect('home')
  }
})
//  PUT route for updating posts
router.post('/edit/post/:id', async function (req, res) {
  const post = await Post.findByPk(req.params.id)
  const data = {
    location: req.body.location,
    travelExperience: req.body.travelExperience,
    UserId: req.user.id
  }
  try {
    const updatedPost = await post.update(data)
    if (req.files && req.files.imageURL) {
      const image = req.files.imageURL
      const fileName = `${updatedPost.id}_${image.name}`
      await image.mv(path.join(__dirname, '..', 'public', 'images', fileName))
      updatedPost.imageURL = `/images/${fileName}`
      updatedPost.save()
    }
    res.status(200).redirect('/posts/home')
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

module.exports = router
