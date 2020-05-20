const path = require('path')
const router = require('express').Router()
// The route for viewing the blog posts
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/index.html'))
})
// The route for viewing the blog posts
router.get('/signup', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/sign-up.html'))
})
// The route for viewing the blog posts
router.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/login.html'))
})
module.exports = router
