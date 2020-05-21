const db = require('../models')
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

// execute user sign up
router.post('/signup', async (req, res) => {
  console.log(req.body)
  let { username, password } = req.body
  const errors = []
  const success = []
  const usernameErr = 'Your username must be at least 6 characters.'
  const passwordErr = 'Your password must be at least 6 characters.'
  const userExistsErr = 'That username already exists.'

  const usernameExists = await db.User.findOne({
    where: {
      username: username
    }
  })
  if (username.length < 6) errors.push({ msg: usernameErr })
  if (password.length < 6) errors.push({ msg: passwordErr })
  if (usernameExists) errors.push({ msg: userExistsErr })

  // There is an issue
  if (errors.length > 0) {
    res.render('signup', { errors, username, password })
  } else {
    await db.User.create({
      username: username,
      password: username
    })

    success.push({ msg: 'You have successfully registered.' })
    username = ''
    password = ''
    res.status(201).render('signup', { success, username, password })
  }
})

router.post('/login', (req, res, next) =>
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  })(req, res, next)
)

module.exports = router
