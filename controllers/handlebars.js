const router = require('express').Router()

router.get('/signup', (req, res) => {
  res.render('signup')
})
router.get('/login', (req, res) => {
  res.render('login')
})
router.get('/home', (req, res) => {
  res.render('home')
})

module.exports = router
