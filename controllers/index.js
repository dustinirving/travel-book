// Pull out the User sequelize model
const { User } = require('../models')
// Requrie router to add routing
const router = require('express').Router()
// Require passport to authenticate user login
const passport = require('passport')

// Render the home page
router.get('/', function (req, res) {
  res.render('index')
})

// Render the signup page
router.get('/signup', function (req, res) {
  res.render('signup')
})

// Render the login page
router.get('/login', function (req, res) {
  res.render('login')
})

// Route for logging the user out, and redirect them to the home page
router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

// To make a signup post request
router.post('/signup', async (req, res) => {
  // Object destructuring from the req.body
  const { username, password, checkbox } = req.body
  // Initialize an empty array for error messages
  const errors = []
  // Initialize an empty array for the success message
  const success = []
  // Username length error
  const usernameErr = 'Your username must be at least 6 characters.'
  // Password length error
  const passwordErr = 'Your password must be at least 6 characters.'
  // The username already exists error
  const userExistsErr = 'That username already exists.'
  // Agree to the terms and conditions error
  const termsErr = 'You must agree to the Terms and Conditions'
  // Query the database to see if the user already exists
  const usernameExists = await User.findOne({
    where: {
      username: username
    }
  })
  // Add the appropriate errors if the confitions are true
  if (username.length < 6) errors.push({ msg: usernameErr })
  if (password.length < 6) errors.push({ msg: passwordErr })
  if (usernameExists) errors.push({ msg: userExistsErr })
  if (!checkbox) errors.push({ msg: termsErr })

  // There is an error, so render the errors
  if (errors.length > 0) {
    res.render('signup', { errors, username })
  } else {
    // otherwise create a new user with username and password in the database
    await User.create({
      username: username,
      password: username
    })
    // Render the page with a success message
    success.push({ msg: 'You have successfully registered.' })
    res.status(201).render('signup', { success })
  }
})

// Post route for logging in
// Use passport to authenticate the user
// If successful, redirect to the main posts page, otherwise re render the login page with flash message errors
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
// Export the router
module.exports = router
