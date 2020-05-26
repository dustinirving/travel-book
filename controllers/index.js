// const express = require('express')
const { User } = require('../models')
const router = require('express').Router()
const passport = require('passport')
const iplocate = require('node-iplocate')

// root route //
router.get('/', function (req, res) {
  res.render('index')
})

// show signup form //
router.get('/signup', function (req, res) {
  res.render('signup')
})

// show login form
router.get('/login', function (req, res) {
  res.render('login')
})

// Route for logging user out
router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/posts/home',
    failureRedirect: '/login',
    failureFlash: true
  }),
  function (req, res) {
    req.flash('error', 'Invalid password or username.')
  }
)

/*
  function to check various possibilities for the ip address in the req object
  returns an object of longtitude and latitude coordinates using iplocate
*/
const ipConvert = async req => {
  const address =
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null)
  if (address && address.includes(',')) {
    return iplocate(address.split(',')[0].trim())
  }
  return await iplocate(address)
}

router.post('/signup', async (req, res) => {
  const { username, password, checkbox } = req.body
  const errors = []
  const success = []
  const usernameErr = 'Your username must be at least 6 characters.'
  const passwordErr = 'Your password must be at least 6 characters.'
  const userExistsErr = 'That username already exists.'
  const termsErr = 'You must agree to the Terms and Conditions'

  // retrieve the long and lat by converting the ip address using the ip function
  let { longitude, latitude } = await ipConvert(req)
  longitude = parseFloat(longitude || 0.00)
  latitude = parseFloat(latitude || 0.00)

  // Check if the username already exists
  const usernameExists = await User.findOne({
    where: {
      username: username
    }
  })
  if (username.length < 6) errors.push({ msg: usernameErr })
  if (password.length < 6) errors.push({ msg: passwordErr })
  if (usernameExists) errors.push({ msg: userExistsErr })
  if (!checkbox) errors.push({ msg: termsErr })

  // Check to see if there is an error
  if (errors.length > 0) {
    res.render('signup', { errors, username })
  } else {
    await User.create({
      username: username,
      password: username,
      longitude,
      latitude
    })

    success.push({ msg: 'You have successfully registered.' })
    res.status(201).render('signup', { success })
  }
})

module.exports = router
