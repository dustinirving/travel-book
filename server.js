// Import Dependencies
// =============================================================
const express = require('express')
const session = require('express-session')
const passport = require('./config/passport')
const db = require('./models')
const flash = require('connect-flash')
const path = require('path')
const fileUpload = require('express-fileupload')
const methodOverride = require('method-override')
const compression = require('compression')

// Sets up the Express App
// =============================================================
const app = express()
// Ensure all traffic is passed through secure protocol only in production
if (process.env.NODE_ENV === 'production') {
  // Re-direct all unsecure traffic through the https protocol
  const requireHTTPS = (req, res, next) => {
    // The 'x-forwarded-proto' check is for Heroku
    if (
      !req.secure &&
      req.get('x-forwarded-proto') !== 'https' &&
      process.env.NODE_ENV !== 'development'
    ) {
      return res.redirect('https://' + req.get('host') + req.url)
    }
    next()
  }
  app.use(requireHTTPS)
}
app.use(compression())
app.set('trust proxy', true)

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Method override used for put request in the form
app.use(methodOverride('_method'))

// Middleware for uploading images
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'tmp')
  })
)

// Allow Express to automatically serve static resource like the
app.use(express.static('./public'))

// Use EJS template
app.set('view engine', 'ejs')

// Authentication middleware
// We need to use sessions to keep track of our user's login status
app.use(
  session({
    secret: 'LSD: Larry Solomon Dustin',
    resave: true,
    saveUninitialized: true
  })
)

// Connects flash to add an error message for login
app.use(flash())
app.use((req, res, next) => {
  res.locals.error = req.flash('error')
  next()
})

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())
app.use(compression())
// Routes Handler
// ================================================
app.use('/posts', require('./controllers/posts'))
app.use('/users', require('./controllers/users'))
app.use('/', require('./controllers/index'))
app.get('*', (req, res) => {
  res.redirect('/')
})

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: true }).then(() => {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`))
})
