const db = require('../models')
const router = require('express').Router()
const passport = require('passport')

// root route //
router.get('/', function (req, res) {
  res.render('landing')
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
router.post('/signup', async function (req, res) {
//   console.log(req.body)
  const newUser = await db.User.create({
    username: req.body.username,
    password: req.body.password
  })
  res.status(201).json({ data: newUser })
})

router.post('/login', (req, res, next) =>
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  })(req, res, next)
)

module.exports = router
