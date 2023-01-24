const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

// pulls the highScores info from local storage
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

// sets the number of scores to show
const MAX_HIGH_SCORES = 5

// sets the HTML for the user's score
finalScore.innerText = mostRecentScore

// enables the save button when you press & release any key
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

// function to save the high scores
saveHighScore = e => {
    // cancels the normal submit behaviour
    e.preventDefault()

    // turns the score and user in to a new object
    const score = {
        score: mostRecentScore,
        name: username.value
    }

    // adds the user score to the high scores
    highScores.push(score)

    // sorts the high scores in order
    highScores.sort((a,b) => {
        return b.score - a.score
    })

    // ?? removes 5 from the high scores - NOT SURE WHY
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')
}