// middleware restricts routes a user is not allowed to access if not logged in
module.exports = function (req, res, next) {
  // If the user is logged in, grant access to restricted routes
  if (req.user) {
    return next()
  }

  // If the user isn't logged in, redirect them to the landing page
  return res.redirect('/')
}
