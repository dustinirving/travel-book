// Error message sent to the client on signup attempt
const errMsg = (username, password, htmlElement, isChecked) => {
  // Error Strings
  const usernameErr = 'Your username must be at least 6 characters.'
  const passwordErr = 'Your password must be at least 6 characters.'
  const termsErr = 'You must agree to the Terms and Conditions.'
  //   const userExistsErr = 'That username already exists.'
  let errorTemplate = ''

  //   Setting the classes for semantic ui error message
  htmlElement.className = 'ui red message'

  //   Possible cases for user input
  if (username.length < 6 && password.length >= 6 && isChecked) {
    errorTemplate = usernameErr
  } else if (username.length >= 6 && password.length < 6 && isChecked) {
    errorTemplate = passwordErr
  } else if (username.length < 6 && password.length < 6 && isChecked) {
    errorTemplate = `${usernameErr}<br>${passwordErr}`
  } else if (username.length < 6 && password.length >= 6 && !isChecked) {
    errorTemplate = `${usernameErr}<br>${termsErr}`
  } else if (username.length >= 6 && password.length < 6 && !isChecked) {
    errorTemplate = `${passwordErr}<br>${termsErr}`
  } else if (username.length >= 6 && password.length >= 6 && !isChecked) {
    errorTemplate = termsErr
  } else {
    errorTemplate = `${usernameErr}<br>${passwordErr}<br>${termsErr}`
  }
  //   Setting the innerHTML to the error template string
  htmlElement.innerHTML = errorTemplate
}

// Success message sent to the client for creating an account
const successMsg = htmlElement => {
  htmlElement.className = 'ui green message'
  htmlElement.textContent = 'You have successfully created an account.'
}

const setDefaultValues = () => {
  document.getElementById('username').value = ''
  document.getElementById('password').value = ''
  document.getElementById('checkbox').checked = false
}

// Checks the length of the username and password
const validator = (username, password, htmlElement, isChecked) => {
  if (username.length >= 6 && password.length >= 6 && isChecked) {
    successMsg(htmlElement)
    // postRequest()
    setDefaultValues()
  } else {
    errMsg(username, password, htmlElement, isChecked)
  }
}

// Select the form to add an event listener
const form = document.getElementById('signup-form')

// Submit event on the form
form.addEventListener('submit', event => {
  // Prevent the form submission default
  event.preventDefault()

  //   HTML selectors for username and password
  const username = document.getElementById('username')
  const password = document.getElementById('password')
  //   const newUser = {
  //     username: username.value.trim(),
  //     password: password.value.trim()
  //   }
  //   HTML element for success or error message
  const message = document.getElementById('message')
  //   The checkbox is either checked or not
  const isChecked = document.getElementById('checkbox').checked

  validator(username.value, password.value, message, isChecked)
})
