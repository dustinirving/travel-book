// const editForm = document.getElementById('edit-form')
// const $location = document.getElementById('location')
// const $travelExperience = document.getElementById('travel-experience')
// const id = editForm.getAttribute('postId')
// const image = document.getElementById('img')

// editForm.addEventListener('submit', event => {
//   event.preventDefault()
//   console.log(image.files[0])
//   const post = {
//     location: $location.value.trim(),
//     travelExperience: $travelExperience.value.trim(),
//     image: image.files[0]
//   }
//   fetch('/posts/edit/post/' + id, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(post)
//   })
//     .then(res => (window.location.href = '/posts/home'))
//     .catch(console.log)
// })
