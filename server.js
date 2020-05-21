// Import Dependencies
// =============================================================
const express = require('express')
const session = require('express-session')
const passport = require('./config/passport')
const db = require('./models')
const flash = require('connect-flash')

// Sets up the Express App
// =============================================================
const app = express()
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Allow Express to automatically serve static resource like the
app.use(express.static('views'))

app.use(flash())
// Authentication middleware
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })
)
app.use(passport.initialize())
app.use(passport.session())

// Routes
// =============================================================
app.use('/', require('./controllers/users'))
app.use('/', require('./controllers/posts'))

// Syncing our sequelize models and then starting our express app
db.sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`))
})
