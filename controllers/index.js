// const express = require('express')
const { User } = require('../models')
const router = require('express').Router()
const passport = require('passport')

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

router.post('/signup', async (req, res) => {
  const { username, password, checkbox } = req.body
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
    res.render('signup', { errors, username })
  } else {
    await User.create({
      username: username,
      password: username
    })

    success.push({ msg: 'You have successfully registered.' })
    res.status(201).render('signup', { success })
  }
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

module.exports = router
