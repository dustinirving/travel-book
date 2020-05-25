const bio = document.querySelector('#bio')
const posts = document.querySelector('#post')
const recommendations = document.querySelector('#recommendations')
const settings = document.querySelector('#settings')
const bioBTN = document.querySelector('#user-bio')
const postBTN = document.querySelector('#user-post')
const recommendationBTN = document.querySelector('#user-recommendations')
const settingsBTN = document.querySelector('#user-settings ')
const btnsContainer = document.getElementById('btns-DIV')
const btns = btnsContainer.getElementsByClassName('btns')

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function () {
    const currentBTN = document.getElementsByClassName('active')
    currentBTN[0].className = currentBTN[0].className.replace('active', '')
    if (this.className !== 'active') {
      this.className += ' active'
    }
  })
}

bioBTN.addEventListener('click', function () {
  bio.style.display = 'block'

  // Hide other page divs
  posts.style.display = 'none'
  recommendations.style.display = 'none'
  settings.style.display = 'none'
})

postBTN.addEventListener('click', function () {
  posts.style.display = 'block'

  // Hide other page divs
  bio.style.display = 'none'
  recommendations.style.display = 'none'
  settings.style.display = 'none'
})

recommendationBTN.addEventListener('click', function () {
  recommendations.style.display = 'block'
  // Hide other page divs
  bio.style.display = 'none'
  posts.style.display = 'none'
  settings.style.display = 'none'
})

settingsBTN.addEventListener('click', function () {
  settings.style.display = 'block'
  // Hide other page divs
  posts.style.display = 'none'
  recommendations.style.display = 'none'
  bio.style.display = 'none'
})
