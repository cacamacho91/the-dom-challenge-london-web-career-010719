//stores all the likes for each time & keeps track of interval tasks
const likes = {}
let autoCounter = null
let autoLiker = null

//helper functions to return regularly used DOM Objects
function getCounter(){
  return document.querySelector('#counter')
}
function getLikes(){
  return document.querySelector('.likes')
}

//find and assign event listeners
const buttonPlus = document.getElementById('+')
buttonPlus.addEventListener('click', incrementCounter)

const buttonMinus = document.getElementById('-')
buttonMinus.addEventListener('click', decrementCounter)

const buttonLike = document.getElementById('<3')
buttonLike.addEventListener('click', likeTime)

const buttonPause = document.getElementById('pause')
buttonPause.addEventListener('click', pause)

const buttonSubmit = document.getElementById('submit')
buttonSubmit.addEventListener('click', comment)

//event handler functions
function incrementCounter(e) {
  getCounter().innerText = parseInt(counter.innerText)+1
}
function decrementCounter(e) {
  getCounter().innerText = parseInt(counter.innerText)-1
}
function likeTime(e){
  currentTime = getCounter().innerText
  if (likes[currentTime] === undefined){
    likes[currentTime] = 1
  } else {
    likes[currentTime] += 1
  }
}
function pause(e) {
  if (buttonPause.innerText === 'pause') {
    intervalManager(false)
    buttonPause.innerText = 'continue'
    toggleButtons(true)
  } else {
    intervalManager(true)
    buttonPause.innerText = 'pause'
    toggleButtons(false)
  }
}
function comment(e) {
  e.preventDefault()
  const commentText = document.getElementById('comment-text')
  if (commentText.value === ""){
    alert("Can't enter an empty comment")
  } else {
    liEl = document.createElement('li')
    liEl.innerText = commentText.value + `...at time #${getCounter().innerText}`
    document.querySelector('#comment-list').appendChild(liEl)
    commentText.value = ""
  }
}

//updates like display
function likeDisplay(){
  currentTime = getCounter().innerText
  if (likes[currentTime] === undefined){
    getLikes().innerText = `No likes for #${currentTime}`
  } else {
    getLikes().innerText = `${likes[currentTime]} likes for #${currentTime}`
  }
}

function toggleButtons(flag){
  buttonPlus.disabled = flag
  buttonMinus.disabled = flag
  buttonLike.disabled = flag
}

//auto increment counter & likes every second
function intervalManager(flag) {
   if(flag) {
     autoCounter = setInterval(incrementCounter, 1000)
     autoLiker = setInterval(likeDisplay, 1000)
   } else {
     clearInterval(autoCounter)
     clearInterval(autoLiker)
   }
}
//set initial state
intervalManager(true)
