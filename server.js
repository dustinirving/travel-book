// Import Dependencies
// =============================================================
const express = require('express')
const session = require('express-session')
const passport = require('./config/passport')
const db = require('./models')
const flash = require('connect-flash')
const expressLayouts = require('express-ejs-layouts')

// Sets up the Express App
// =============================================================
const app = express()
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Allow Express to automatically serve static resource like the
app.use(express.static('public'))

// Use handlebars
app.use(expressLayouts)
app.set('view engine', 'ejs')

// Authentication middleware
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: 'LSD: Larry Solomon Dustin', resave: true, saveUninitialized: true })
)

// Connects flash
app.use(flash())
app.use((req, res, next) => {
  res.locals.error = req.flash('error')
  next()
})

app.use(passport.initialize())
app.use(passport.session())

// Routes
// =============================================================
// app.use('/users', require('./controllers/users'))
// app.use('/posts', require('./controllers/posts'))
app.use('/', require('./controllers/index'))

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({force: true}).then(() => {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`))
})
