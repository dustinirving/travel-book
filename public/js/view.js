const deleteBtn = document.getElementById('delete-btn')

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
