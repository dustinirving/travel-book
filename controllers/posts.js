// Require path to allow for relative paths
const path = require('path')
// Require router
const router = require('express').Router()
// Destructure Post and User from the sequelize models
const { Post, User } = require('../models')
// Use authentication middleware to only grant access to logged in users
const isAuthenticated = require('../config/middleware/isAuthenticated')

//  GET route for getting all of the posts
router.get('/home', isAuthenticated, async function (req, res) {
  try {
    // Query the database for all posts ordered by createdAt
    const postsData = await Post.findAll({ order: [['createdAt', 'DESC']] })
    // const postsData = await Post.findAll({ include: [{ model: User }] })
    // Define a postsArray as an empty array
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
        if (travelExperienceStr.length > 975) {
          travelExperienceStr = travelExperienceStr.slice(0, 975) + '...'
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
      // Render the posts with the postsArray object
      res.render('home', { postsArray })
    }
    start()
  } catch (err) {
    console.log('GET /posts failed \n', err)
    res.status(500).json({ errors: [err] })
  }
})

// Get route for getting new post form
router.get('/post/new', isAuthenticated, function (req, res) {
  res.render('create')
})

// Route for creating a new post
router.post('/post/new', isAuthenticated, async (req, res, next) => {
  // Validation to ensure that the location and travel experience are not empty
  const emptyLocationErr = 'You cannot leave the location empty.'
  const emptyTravelExperienceErr =
    'You cannot leave the travel experience empty.'
  const errors = []
  // Data object with location, travel experience and userid
  const data = {
    location: req.body.location,
    travelExperience: req.body.travelExperience,
    UserId: req.user.id
  }
  // Adding errors based on conditions
  if (data.location === '') errors.push({ msg: emptyLocationErr })
  if (data.travelExperience === '') {
    errors.push({ msg: emptyTravelExperienceErr })
  }
  // If there are no errors, create the data in the database
  if (errors.length === 0) {
    try {
      const post = await Post.create(data)
      // Used to add the upload the files
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
      // If everything is successful render the main posts page with the newly created content
      res.status(201).redirect('/posts/home')
    } catch (err) {
      res.status(500).json({ errors: [err] })
      next(err)
    }
    // If there are validation errors render the page again with the errors
  } else res.render('create', { errors })
})

// Route to view the full post
router.get('/view/:id', isAuthenticated, async function (req, res) {
  try {
    // Query the database for the specific post
    const post = await Post.findOne({
      where: { id: req.params.id },
      include: [User]
    })
    // From the query, create an object and render the page with the data
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
router.delete('/view/delete/:id', isAuthenticated, async function (req, res) {
  try {
    // Find the post to delete by its primary key
    const post = await Post.findByPk(req.params.id)
    // Delete the post
    await post.destroy()
    res.status(200).json(post)
  } catch (err) {
    console.log('GET /posts failed \n', err)
    res.status(500).json({ errors: [err] })
  }
})

// Get route to edit the post
router.get('/edit/post/:id', isAuthenticated, async function (req, res) {
  try {
    // Query for the post to be updated by its primary key
    const post = await Post.findByPk(req.params.id)
    const postObject = {
      id: post.dataValues.id,
      authorId: post.dataValues.UserId,
      location: post.dataValues.location,
      travelExperience: post.dataValues.travelExperience,
      imageURL: post.dataValues.imageURL,
      userId: req.user.id
    }
    // Render the page with the current data
    res.render('edit', postObject)
  } catch (err) {
    // console.log(`GET failed \n`, err)
    res.status(500).json({ errors: [err] })
    // res.redirect('home')
  }
})
//  PUT route for updating posts
router.put('/edit/post/:id', isAuthenticated, async function (req, res) {
  try {
<<<<<<< HEAD
    // Query by its primary key
    const post = await Post.findByPk(req.params.id)
    // Select data to be updated
=======
    const post = await Post.findByPk(req.params.id)
>>>>>>> master
    const data = {
      location: req.body.location,
      travelExperience: req.body.travelExperience,
      UserId: req.user.id
    }
<<<<<<< HEAD
    // Update the database
=======

>>>>>>> master
    const updatedPost = await post.update(data)
    // Upload the picture if it exists and has an imageURL
    if (req.files && req.files.imageURL) {
      // Image url
      const image = req.files.imageURL
      // name of the file
      const fileName = `${updatedPost.id}_${image.name}`
      // Saving the image
      await image.mv(path.join(__dirname, '..', 'public', 'images', fileName))
      // specifying the path
      updatedPost.imageURL = `/images/${fileName}`
      // Saving the post
      updatedPost.save()
    }
    // Redirect to the main posts page after the put request has been successfully completed
    res.status(200).redirect('/posts/home')
  } catch (err) {
    console.log('GET /posts failed \n', err)
    res.status(500).json({ errors: [err] })
  }
})
// Export the router
module.exports = router
