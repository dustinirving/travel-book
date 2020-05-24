const deleteBtn = document.getElementById('delete-btn')
const editBtn = document.getElementById('edit-btn')

deleteBtn.addEventListener('click', event => {
  event.preventDefault()
  const id = deleteBtn.getAttribute('postId')
  console.log(id)
  fetch('/posts/view/delete/' + id, {
    method: 'DELETE'
  })
    .then(res => (window.location.href = '/posts/home'))
    .catch(console.log)
})

// deleteBtn.addEventListener('click', event => {
//   event.preventDefault()
//   fetch('/api/chirps', {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(newChirp)
//   })
//     .then(response => response.json())
//     .then(({ data }) => renderChirp(data))
//     .catch(console.log)
// })
