// Import Dependencies
const router = require('express').Router()
const { Post } = require('../models')
const isAuthenticated = require('../config/middleware/isAuthenticated')
const faker = require('faker')

// Get data to be used for the user's profile
router.get('/profile', isAuthenticated, async function (req, res) {
  try {
    // Find all posts written by the user
    const postsData = await Post.findAll({
      where: { UserId: req.user.id },
      order: [['createdAt', 'DESC']]
    })
    // Collect the post data values for each post
    const postsArray = []
    for (const array of postsData) {
      postsArray.push(array.dataValues)
    }

    // Get the date the user's account was created and convert to a readable format
    const utcDate = req.user.createdAt
    const localDate = new Date(utcDate)
      .toDateString()
      .replace(/T/, ' ')
      .replace(/\..+/, '')

    /*
      Faker is a package that generates random fake user data.
      - Calling faker.seed ensures the data returned is predictable
    */
    faker.seed(613)

    // Get all user data to be used in profile - a mix of real data from req.user and faker data
    const userBio = {
      avatar: faker.image.avatar(),
      username: req.user.username,
      userID: req.user.id,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.phoneNumber(),
      address: faker.address.streetAddress(),
      joinDate: localDate
    }
    res.render('profile', { userBio: userBio, postsArray })
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: [err] })
  }
})

module.exports = router
