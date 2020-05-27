// Select the delete button
const deleteBtn = document.getElementById('delete-btn')

// Add a click event on the delete button
// Make a fetch request to delete the post and then redirect back to the main posts page
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
