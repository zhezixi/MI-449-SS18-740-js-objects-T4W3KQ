 // ----
// DATA
// ----

// A couple jokes to start with
var jokes = {
  'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
  'Orion\'s pants': {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
}

// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// -------------
// PAGE UPDATERS
// -------------

var getJokes = function () {
  var jokeString = window.localStorage.getItem('jokes')
  if (jokeString != null) {
    jokes = JSON.parse(jokeString)
  }
}

var setJokes = function () {
  var jokeString = JSON.stringify(jokes)
  if (jokeString != null) {
    window.localStorage.setItem('jokes', jokeString)
  }
  updatePage()
}

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')
var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value
  if (jokes[requestedJokeKey]) {
    jokeBox.innerHTML = '<p>' + jokes[requestedJokeKey].setup + '</p>' + '<p>' + jokes[requestedJokeKey].punchline + '</p>'
  } else {
    jokeBox.innerHTML = '<p>' + 'No matching joke found.' + '</p>'
  }
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
  getJokes()
  pageClear()
}

var pageClear = function () {
  document.getElementById('title').value = ''
  document.getElementById('setup').value = ''
  document.getElementById('punchline').value = ''
  document.getElementById('forgetJoke').value = ''
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)

var rememberButton = document.getElementById('remember')
var forgetButton = document.getElementById('forget')

forgetButton.addEventListener('click', function () {
  var forgetJoke = document.getElementById('forgetJoke').value
  delete jokes[forgetJoke]
  setJokes()
  window.alert('Joke forgot!')
})

rememberButton.addEventListener('click', function () {
  var jokeTitle = document.getElementById('title').value
  var jokeSetup = document.getElementById('setup').value
  var jokePunchline = document.getElementById('punchline').value
  jokes[jokeTitle] = {setup: jokeSetup, punchline: jokePunchline}
  setJokes()
  window.alert('Joke set!')
})
