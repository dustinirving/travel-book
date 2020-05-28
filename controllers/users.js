// Import Dependencies
const router = require('express').Router()
const { Post, User } = require('../models')
const isAuthenticated = require('../config/middleware/isAuthenticated')

/*
  GET ROUTE  for getting and rendering all user information
*/

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

    // Get all user data to be used in profile from the user object
    const userBio = {
      avatar: req.user.avatar,
      username: req.user.username,
      userID: req.user.id,
      firstName: req.user.firstname,
      lastName: req.user.lastname,
      email: req.user.email,
      phoneNumber: req.user.phonenumber,
      address: req.user.address,
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
        'avatar',
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
      Loop through the array of other user's data
        - get the createdAt, username, avatar, and distance variables
        - format createdAt date string
    */
    const recommendedFriends = []
    for (const user of distanceArray) {
      if (req.user.username !== user.dataValues.username) {
        const { avatar, username, createdAt, distance } = user.dataValues
        const utcDate = createdAt
        let joinDate = new Date(utcDate).toDateString().split(' ')
        joinDate.splice(0, 1)
        joinDate = joinDate.join(' ')

        const data = { username, joinDate, distance, avatar }
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

/*
  PUT ROUTE  for updating username and re-rendering the profiles page
*/
router.put('/edit/username', isAuthenticated, async function (req, res) {
  try {
    // const user = await User.findByPk(req.user.id)
    // const data = { username: req.body.newUsername }
    // await user.update(data)
    req.user.username = req.body.newUsername
    await User.update(
      { username: req.body.newUsername },
      {
        where: {
          id: req.user.id
        }
      }
    )

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

    // Get all user data to be used in profile from the user object
    const userBio = {
      avatar: req.user.avatar,
      username: req.body.newUsername,
      userID: req.user.id,
      firstName: req.user.firstname,
      lastName: req.user.lastname,
      email: req.user.email,
      phoneNumber: req.user.phonenumber,
      address: req.user.address,
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
        'avatar',
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
      Loop through the array of other user's data
        - get the createdAt, username, avatar, and distance variables
        - format createdAt date string
    */
    const recommendedFriends = []
    for (const user of distanceArray) {
      if (req.body.newUsername !== user.dataValues.username) {
        const { avatar, username, createdAt, distance } = user.dataValues
        const utcDate = createdAt
        let joinDate = new Date(utcDate).toDateString().split(' ')
        joinDate.splice(0, 1)
        joinDate = joinDate.join(' ')

        const data = { username, joinDate, distance, avatar }
        recommendedFriends.push(data)
      }
    }
    console.log(req.user.username)
    res.render('profile', { userBio, postsArray, recommendedFriends })
    // res.status(200).redirect('/posts/home')
  } catch (err) {
    console.log('GET /posts failed \n', err)
    res.status(500).json({ errors: [err] })
  }
})

module.exports = router
