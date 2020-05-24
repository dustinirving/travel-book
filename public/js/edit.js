const editForm = document.getElementById('edit-form')
const $location = document.getElementById('location')
const $travelExperience = document.getElementById('travel-experience')
const id = editForm.getAttribute('postId')

// editForm.addEventListener('submit', event => {
//   event.preventDefault()
//   const post = {
//     location: $location.value.trim(),
//     travelExperience: $travelExperience.value.trim()
//   }
//   fetch('/posts/edit/post/' + id, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(post)
//   })
//     .then(res => (window.location.href = '/posts/home'))
//     .catch(console.log)
// })
