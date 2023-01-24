const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Who are you?",
        choice1: 'No one',
        choice2: 'Bob',
        choice3: 'Your worst nightmare',
        choice4: 'Trevor',
        answer: 4,
    },
    {
        question: "What do you want?",
        choice1: 'Your soul',
        choice2: 'World Domination',
        choice3: 'A trip to the park',
        choice4: 'Money',
        answer: 2,
    },
    {
        question: "Why won't you leave me alone?",
        choice1: 'Boredom',
        choice2: 'Hunger',
        choice3: 'Fear',
        choice4: 'You are very compelling',
        answer: 1,
    },
    {
        question: "What can I do to make you go away?",
        choice1: 'Passive agression',
        choice2: 'Punch me in the face',
        choice3: 'Sing the whole of Hamilton',
        choice4: 'Ask me that again...',
        answer: 3,
    }
];

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionsCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion();
}

getNewQuestion = () => {
    // sends you to quiz end page if no questions left
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
    }

    // adds 1 to the question counter
    questionCounter++
    // Sets the question number text
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    // Changes the width of the progress bar (Really neat method)
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    // Assigns a random number to questions Index
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    // Picks a random question from the array using the random number & assigns to a var
    currentQuestion = availableQuestions[questionsIndex]
    // Sets question inner text from array
    question.innerText = currentQuestion.question

    // A function that assigns the choice number to each question
    choices.forEach(choice => {
        // gets the number assigned to 'dataset' in the HTML of the parameter 'choice'
        const number = choice.dataset['number']
        // Sets the inner text of the 'choice' parameter to be 'choice' + number 
        choice.innerText = currentQuestion['choice' + number]
    })

    // removes the question from the array once it has appeared
    availableQuestions.splice(questionsIndex, 1);

    // allows the user to select an answer
    acceptingAnswers = true
}

// A function to handle what happens when a choice is selected
choices.forEach(choice => {
    // if not accepting answers return nothing??
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        // make sure no more answers can be submitted
        acceptingAnswers = false

        // sets a variable to be the selected answer
        // .target selects the element where the event happened (click)
        const selectedChoice = e.target

        // sets a var to hold the 'number' of the selected answer (from the HTML dataset)
        const selectedAnswer = selectedChoice.dataset['number'];

        // if statement (short syntax) - applies the correct or incorrect class - stored in a variable
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        // adds points if classToApply is correct
        if(classToApply === "correct") {
            incrementScore(SCORE_POINTS)
        }

        // adds the relevant correct or incorrect class to the selected answer
        selectedChoice.parentElement.classList.add(classToApply);

        // after a delay removes the correct or incorrect class
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            // replaces the question with the next question
            getNewQuestion();
        }, 1000);
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score;
}

startGame()