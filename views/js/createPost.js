// 

document.getElementById('create-post').addEventListener('submit', event => {
  event.preventDefault()

  // grab all post form contents when the user submits the form
  const newPost = {
    location: document.getElementById('location').value.trim(),
    travelExperience: document.getElementById('travel-experience').value.trim(),
    imageURL: ''
  }

  fetch('/posts/new', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost)
  }).then(response => {
    // REMOVE CONSOLE LOG DURING PRODUCTION
      console.log(response)
      if (response.ok) {
          // UPGRADE LATER TO SEMANTIC UI MODAL
          alert('New post created')
          location.reload()
      }
  })
})
