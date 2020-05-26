// Import Dependencies
const router = require('express').Router()
const { Post, User } = require('../models')
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
    let localDate = new Date(utcDate).toDateString().split(' ')
    localDate.splice(0, 1)
    localDate = localDate.join(' ')

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

    // Get longitude and latitude from request body
    const longitude = req.user.longitude
    const latitude = req.user.latitude

    /*
     Use Sequelize to calculate distance between the user and other users
     Reference: https://stackoverflow.com/questions/44012932/sequelize-geospatial-query-find-n-closest-points-to-a-location
    */
    const distanceArray = await User.findAll({
      attributes: [
        'username',
        'createdAt',
        [
          User.sequelize.literal(
            '6371 * acos(cos(radians(' +
              latitude +
              ')) * cos(radians(latitude)) * cos(radians(' +
              longitude +
              ') - radians(longitude)) + sin(radians(' +
              latitude +
              ')) * sin(radians(latitude)))'
          ),
          'distance'
        ]
      ],
      order: User.sequelize.col('distance'),
      limit: 6
    })

    /*
      - Set seed = 100 (to make faker data generation predicatable)
      Loop through the array of other user's data
        - increment seeds to create new instance of faker avatar
        - get the createdAt, username, and distance variables
    */
    const recommendedFriends = []
    let seedNum = 100
    for (const user of distanceArray) {
      if (req.user.username !== user.dataValues.username) {
        const { username, createdAt, distance } = user.dataValues
        const utcDate = createdAt
        let joinDate = new Date(utcDate).toDateString().split(' ')
        joinDate.splice(0, 1)
        joinDate = joinDate.join(' ')

        seedNum++
        faker.seed(seedNum)
        const userImage = faker.image.avatar()
        const data = { username, joinDate, distance, userImage: userImage }
        recommendedFriends.push(data)
      }
    }
    // send all the data to display on the profile page
    res.render('profile', { userBio: userBio, postsArray, recommendedFriends })
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: [err] })
  }
})

module.exports = router
