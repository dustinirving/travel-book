// Dependencies
// =============================================================

const express = require('express')
const router = express.Router()

// Import the Post model using object destructuring assignment
const { User } = require('../models')

// Routes
// =============================================================

// User api routes
router.get('/users', function (req, res) {
  User.findAll()
    .then(usersArray => {
      res.status(200).json({ data: usersArray })
    })
    .catch(err => {
      console.log('GET /posts failed \n', err)
      res.status(500).json({ errors: [err] })
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
