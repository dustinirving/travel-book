// Dependencies
// =============================================================

const express = require('express')
const router = express.Router()
const { User } = require('../models')
const passport = require('../config/passport')
// const isAuthenticated = require('../config/middleware/isAuthenticated')

// Routes
// =============================================================

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
  }),
  function (req, res) {
    req.flash('error', 'Invalid password or username')
  }
)

router.post('/signup', async (req, res) => {
  console.log(req.body)
  let { username, password, checkbox } = req.body
  const errors = []
  const success = []
  const usernameErr = 'Your username must be at least 6 characters.'
  const passwordErr = 'Your password must be at least 6 characters.'
  const userExistsErr = 'That username already exists.'
  const termsErr = 'You must agree to the Terms and Conditions'

  const usernameExists = await User.findOne({
    where: {
      username: username
    }
  })
  if (username.length < 6) errors.push({ msg: usernameErr })
  if (password.length < 6) errors.push({ msg: passwordErr })
  if (usernameExists) errors.push({ msg: userExistsErr })
  if (!checkbox) errors.push({ msg: termsErr })

  // There is an issue
  if (errors.length > 0) {
    res.render('signup', { errors, username, password })
  } else {
    await User.create({
      username: username,
      password: username
    })

    success.push({ msg: 'You have successfully registered.' })
    username = ''
    password = ''
    res.status(201).render('signup', { success, username, password })
  }
})

module.exports = router
