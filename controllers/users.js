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
// router.post('api/login', passport.authenticate('local'), function (req, res) {
//   // res.redirect('/users/' + req.user.username)
//   res.status(200).json(req.user.username)
//   console.log(req.user)
// })

router.post(
  '/api/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users',
    failureFlash: true
  })
)
// router.post(
//   '/api/login',
//   passport.authenticate('local', function (req, res, err, user, info) {
//     if (err) return res.status(500).send()
//     if (!user) return res.status(400).json({ error: info.message })
//     req.logIn(user, function (err) {
//       if (err) return next(err)
//       return res.status(200).json(info.message)
//     })
//   })(req, res, next)
// )

router.post('/api/signup', async function (req, res) {
  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password
  })
  res.status(201).json({ data: newUser })
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
