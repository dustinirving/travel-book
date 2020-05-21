// // Error message sent to the client on signup attempt
// const errMsg = (username, password, htmlElement, isChecked, usernameExists) => {
//   // Error Strings
//   const usernameErr = 'Your username must be at least 6 characters.'
//   const passwordErr = 'Your password must be at least 6 characters.'
//   const termsErr = 'You must agree to the Terms and Conditions.'
//   const userExistsErr = 'That username already exists.'
//   let errorTemplate = ''

//   //   Setting the classes for semantic ui error message
//   htmlElement.className = 'ui red message'

//   //   Possible cases for user input
//   if (username.length < 6) {
//     errorTemplate = usernameErr
//     if (usernameExists) errorTemplate += '<br>' + userExistsErr
//     if (password.length < 6) errorTemplate += '<br>' + passwordErr
//     if (!isChecked) errorTemplate += '<br>' + termsErr
//   } else if (usernameExists) {
//     errorTemplate = userExistsErr
//     if (password.length < 6) errorTemplate += '<br>' + passwordErr
//     if (!isChecked) errorTemplate += '<br>' + termsErr
//   } else if (password.length < 6) {
//     errorTemplate = passwordErr
//     if (!isChecked) errorTemplate += '<br>' + termsErr
//   } else errorTemplate = termsErr

//   //   Setting the innerHTML to the error template string
//   htmlElement.innerHTML = errorTemplate
// }

// // Success message sent to the client for creating an account
// const successMsg = htmlElement => {
//   htmlElement.className = 'ui green message'
//   htmlElement.textContent = 'You have successfully created an account.'
// }

// const setDefaultValues = () => {
//   document.getElementById('username').value = ''
//   document.getElementById('password').value = ''
//   document.getElementById('checkbox').checked = false
// }

// // Querying the database to get all of the usernames
// const retrieveUsers = async () => {
//   const data = await fetch('/api/users', {
//     method: 'GET',
//     headers: { 'Content-type': 'application/json' }
//   })
//     .then(response => response.json())
//     .then(({ data }) => data)
//     .catch(err => console.log(err))
//   return data
// }

// // Post request
// const addUser = async newUser => {
//   const data = await fetch('/api/signup', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(newUser)
//   })
//     .then(response => response.json())
//     .then(({ data }) => data)
//     .catch(err => console.log(err))
//   return data
// }

// // Checks to see if the username exists
// const usernameExists = users => {
//   let exists = false
//   const newUsername = document.getElementById('username').value.trim()
//   for (const user of users) {
//     console.log(user)
//     if (newUsername === user.username) exists = true
//   }
//   return exists
// }

// // Checks the length of the username and password
// const validator = async (username, password, htmlElement, isChecked) => {
//   if (username.length >= 6 && password.length >= 6 && isChecked) {
//     const newUser = {
//       username: username,
//       password: password
//     }
//     await addUser(newUser)
//     successMsg(htmlElement)
//     setDefaultValues()
//   } else {
//     errMsg(username, password, htmlElement, isChecked, exists)
//   }
// }

// // Select the form to add an event listener
// const form = document.getElementById('signup-form')

// // Submit event on the form
// form.addEventListener('submit', event => {
//   // Prevent the form submission default
//   event.preventDefault()

//   //   HTML selectors for username and password
//   const username = document.getElementById('username').value.trim()
//   const password = document.getElementById('password').value.trim()

//   //   HTML element for success or error message
//   const message = document.getElementById('message')
//   //   The checkbox is either checked or not (true or false)
//   const isChecked = document.getElementById('checkbox').checked

//   validator(username, password, message, isChecked)
// })
