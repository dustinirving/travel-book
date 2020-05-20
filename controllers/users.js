// Dependencies
// =============================================================

const express = require('express')
const router = express.Router()
const { User } = require('../models')
const passport = require('../config/passport')
const isAuthenticated = require('../config/middleware/isAuthenticated')

// Routes
// =============================================================

// User api routes
router.get('/users', isAuthenticated, function (req, res) {
  User.findAll()
    .then(usersArray => {
      res.status(200).json({ data: usersArray })
    })
    .catch(err => {
      console.log('GET /posts failed \n', err)
      res.status(500).json({ errors: [err] })
    })
})

// !REFACTOR TO CATCH & HANDLE ERRORS
router.post(
  '/api/login',
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/api/login'
  }),
  function (req, res) {
    res.status(200).json(req.user)
  }
)

router.post('/api/signup', function (req, res) {
  User.create({
    username: req.body.username,
    password: req.body.password
  })
    .then(function () {
      res.redirect(307, '/api/login')
    })
    .catch(function (err) {
      res.status(401).json(err)
    })
})

router.post('/users', function (req, res) {
  console.log('New post data received: \n', req.body)
  User.create(req.body)
    .then(user => res.status(201).json({ data: user }))
    .catch(err => {
      console.log('GET /posts failed \n', err)
      res.status(500).json({ errors: [err] })
    })
})

module.exports = router
