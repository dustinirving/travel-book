const errMsg = (err, user) => {
  const message = document.getElementById('message')
  const emptyUsername = 'You have not entered a username'
  const emptyPass = 'You have not entered a password'
  let errTemplate = ''
  if (user.username === '') {
    errTemplate = emptyUsername
    if (user.password === '') errTemplate += '<br>' + emptyPass
  } else if (user.password === '') errTemplate = emptyPass
  else errTemplate = err

  message.className = 'ui red message'
  message.innerHTML = errTemplate
}
// Post request
const loginUser = user => {
  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
    .then(() => (window.location.href = '../home.html'))
    .catch(err => {
      console.log(err)
      errMsg(err, user)
    })
}
// Select the form to add an event listener
const form = document.getElementById('login-form')

// Submit event on the form
form.addEventListener('submit', event => {
  // Prevent the form submission default
  event.preventDefault()
  const username = document.getElementById('username')
  const password = document.getElementById('password')
  const user = {
    username: username.value.trim(),
    password: password.value.trim()
  }
  loginUser(user)
})
