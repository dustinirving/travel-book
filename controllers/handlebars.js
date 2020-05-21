const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('index')
})
router.get('/signup', (req, res) => {
  res.render('signup')
})
router.get('/login', (req, res) => {
  res.render('login')
})
router.get('/edit', (req, res) => {
  res.render('edit')
})
router.get('/home', (req, res) => {
  res.render('home')
})
router.get('/create', (req, res) => {
  res.render('create')
})

module.exports = router
