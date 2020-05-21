// Dependencies
// =============================================================

const express = require('express')
const router = express.Router()
const { User } = require('../models')
const passport = require('../config/passport')
// const isAuthenticated = require('../config/middleware/isAuthenticated')

// Routes
// =============================================================

router.post('/login', (req, res, next) =>
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next)
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

// router.post('/api/signup', async function (req, res) {
//   console.log(req.body)
//   const newUser = await User.create({
//     username: req.body.username,
//     password: req.body.password
//   })
//   res.status(201).json({ data: newUser })
// })
router.post('/signup', async (req, res) => {
  console.log(req.body)
  const { username, password } = req.body
  const errors = []
  const success = {}
  const usernameErr = 'Your username must be at least 6 characters.'
  const passwordErr = 'Your password must be at least 6 characters.'
  // const termsErr = 'You must agree to the Terms and Conditions.'
  const userExistsErr = 'That username already exists.'

  const usernameExists = await User.findOne({
    where: {
      username: username
    }
  })
  if (username.length < 6) errors.push({ msg: usernameErr })
  if (password.length < 6) errors.push({ msg: passwordErr })
  if (usernameExists) errors.push({ msg: userExistsErr })

  // There is an issue
  if (errors.length > 0) {
    res.render('signup', { errors })
  } else {
    await User.create({
      username: username,
      password: username
    })

    success.msg = 'You have successfully registered'
    console.log(success)
    res.status(201).render('signup', success)
  }
})

// router.post('/users', function (req, res) {
//   console.log('New post data received: \n', req.body)
//   User.create(req.body)
//     .then(user => res.status(201).json({ data: user }))
//     .catch(err => {
//       console.log('GET /posts failed \n', err)
//       res.status(500).json({ errors: [err] })
//     })
// })

module.exports = router
