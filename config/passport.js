const passport = require('passport')
const { Strategy } = require('passport-local')
const LocalStrategy = Strategy
const db = require('../models')

passport.use(
  new LocalStrategy(async function (username, password, done) {
    let dbUser
    try {
      dbUser = await db.User.findOne({
        where: {
          username: username
        }
      })
      // console.log(dbUser)
      if (!dbUser) {
        return done(null, false, {
          message: 'User does not exist!'
        })
      }
    } catch (err) {
      return done(err)
    }

    const correctPassword = await dbUser.validPassword(password)
    if (!correctPassword) {
      return done(null, false, { message: 'Incorrect password!' })
    }

    return done(null, dbUser)
  })
)

// Ensures authentication state persistent across HTTP requests
// code was refactored for best practices, rather than pass the entire user object as a parameter
// only the userID is passsed as a parameter to serialized in the session
// references: http://www.passportjs.org/docs/configure/
// references: https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  db.User.findByPk(id, function (err, user) {
    done(err, user)
  })
})

module.exports = passport
