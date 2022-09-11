
//VAR/LET + CONST
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull'); 
//const timerBlock = document.querySelector('timer-count') //add to HTML!!

//setting current question as object & true
let currentQuestion = {};
let acceptedAnswers = true;
//starting score is 0
let score = 0;
//question counter starts at 0
let questionCounter = 0;
let timer;
let timerCount;

//quiz questions
let questions = [
    {
        question: "What is the name of Harry's owl?",
        choice1: "Hedwig",
        choice2: "Hufflepuff",
        choice3: "Shadowfax",
        choice4: "Barnie",
        answer: 1
    },
    {
        question: "What type of plant will not stop crying when pulled?",
        choice1: "Gillyweed",
        choice2: "Devil's Snare",
        choice3: "Mandrake",
        choice4: "Tentacula",
        answer: 3
    },
    {
        question: "What breed of dragon is Norbert?",
        choice1: "Chinese Fireball",
        choice2: "Hungarian Horntail",
        choice3: "Swedish Short-Snout",
        choice4: "Norwegian Ridgeback",
        answer: 4
    },
    {
        question: "What is Hermione's patronus?",
        choice1: "horse",
        choice2: "Jack Russel Terrier",
        choice3: "otter",
        choice4: "cat",
        answer: 3
    }

];  

//Constants
//points go up by 10
const CORRECT_BONUS = 10;
//total number of questions is 4
const MAX_QUESTIONS = 4;

//Game function
startGame = () => {
    questionCounter = 0;
    score = 0;
    //timerCount = 10;
    //startTimer();
    //choose questions from question array
    availableQuestions = [...questions]
    //print question to console and run getNewQuestion function to populate next question
    console.log(availableQuestions);
    getNewQuestion();
}

//ADD TIMER!!
getNewQuestion = () => {
    //if no more questions, go to end page
    if(availableQuestions.lenth === 0 || questionCounter >= MAX_QUESTIONS){
    localStorage.setItem('mostRecentScore', score);
    //locate end page
    return window.location.assign('end.html');
    }

    //Question count and progress bar
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionIndex];
        question.innerText = currentQuestion.question;

        //run loop on question array
        choices.forEach (choice => {
            const number = choice.dataset["number"];
            choice.innerText = currentQuestion['choice' + number];
        })

        availableQuestions.splice(questionIndex, 1);
        acceptedAnswers = true;
};

//Event listener to questions, adding classes to questions
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptedAnswers) return;

        acceptedAnswers = false;
        //returns choice to event
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = 
        selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct' ) {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    })
})

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();