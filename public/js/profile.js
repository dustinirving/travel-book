// const bioBTN = document.querySelector('#user-bio')
// const postBTN = document.querySelector('#user-post')
// const recommendationBTN = document.querySelector('#user-recommendations')
// const settingsBTN = document.querySelector('#user-bio')
// const bio = document.querySelector('#bio')
// const post = document.querySelector('#post')
// const recommendations = document.querySelector('#recommendations')
// const settings = document.querySelector('#settings')

const btnsContainer = document.getElementById('btns-DIV')
const btns = btnsContainer.getElementsByClassName('btns')

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function () {
    const current = document.getElementsByClassName('active')
    console.log(current[0])
    current[0].className = current[0].className.replace('active', '')
    if (this.className !== 'active') {
      this.className += ' active'
    }
  })
}

// bioBTN.addEventListener('click', function () {
// //   bio.style.display = 'block'

//   // Hide other page divs
// //   post.style.display = 'none'
// //   recommendations.style.display = 'none'
// //   settings.style.display = 'none'
//   /*
//     Make other buttons inactive
//     Reference for using Regex: https://www.w3schools.com/howto/howto_js_remove_class.asp
//   */
// //   postBTN.className = postBTN.className.replace(/\bmystyle\b/g, '')
// //   postBTN.className = postBTN.className.replace(/\bmystyle\b/g, '')
// //   recommendationBTN.className = recommendationBTN.className.replace(/\bmystyle\b/g, '')
// //   settings.className = settings.className.replace(/\bmystyle\b/g, '')
// })

// postBTN.addEventListener('click', function () {
// //   post.style.display = 'block'

//   // Hide other page divs
// //   document.querySelector('#bio').style.display = 'none'
// //   document.querySelector('#recommendations').style.display = 'none'
// //   document.querySelector('#settings').style.display = 'none'
// })

// recommendationBTN.addEventListener('click', function () {
// //   recommendations.style.display = 'block'

//   // Hide other page divs
// //   document.querySelector('#bio').style.display = 'none'
// //   document.querySelector('#post').style.display = 'none'
// //   document.querySelector('#settings').style.display = 'none'
// })

// settingsBTN.addEventListener('click', function () {
// //   settings.style.display = 'block'

//   // Hide other page divs
// //   document.querySelector('#post').style.display = 'none'
// //   document.querySelector('#recommendations').style.display = 'none'
// //   document.querySelector('#bio').style.display = 'none'
// })
