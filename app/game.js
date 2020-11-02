const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const game = document.getElementbyID('game');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
      question: "What was Tandem previous name?",
      choice1: "Tandem", 
      choice2: "Burger Shack", 
      choice3: "Devmynd",
      choice4: "Extraordinary Humans",
      answer : 3
    },
    {
      question: "In Shakespeare's play Julius Caesar, Caesar's last words were...",
      choice1: "Iacta alea est!", 
      choice2: "Vidi, vini, vici",
      choice3: "Aegri somnia vana",
      choice4: "Et tu, Brute?",
      answer: 4
    },
    {
      question: "A group of tigers are referred to as:",
      choice1: "Ambush", 
      choice2: "Destruction",
      choice3: "Pride",
      choice4: "Chowder",
      answer: 1
    },
    {
      question: "What is the top speed an average cat can travel?",
      choice1: "42 mph", 
      choice2: "31 mph",
      choice3: "9 mph",
      choice4: "13 mph",
      answer: 2
    },
    {
      question: "A cat can jump to _____ times its own height:",
      choice1: "3", 
      choice2: "9",
      choice3: "7",
      choice4: "5",
      answer: 4
    },
    {
      question: "What is the only letter that doesn't appear in a US state name?",
      choice1: "M", 
      choice2: "Z",
      choice3: "Q",
      choice4: "X",
      answer: 3
    },
    {
      question: "What is the name for a cow-bison hybrid?",
      choice1: "Cowson", 
      choice2: "Mooson",
      choice3: "Bicow",
      choice4: "Beefalo",
      answer: 4
    },
    {
      question: "What is the largest freshwater lake in the world?",
      choice1: "Lake Superior", 
      choice2: "Lake Victoria",
      choice3: "Lake Michigan",
      choice4: "Lake Baikal",
      answer: 1
    },
  
    {
      question: "In a website address bar, what does WWW stand for?",
      choice1: "Wild Wild West", 
      choice2: "War World Web",
      choice3: "World Wide Web",
      choice4: "Whackos Wacky World",
      answer: 3
    },
    {
      question: "In a game of bingo, what number is represented by the name two little ducks?",
      choice1: "20", 
      choice2: "55",
      choice3: "77",
      choice4: "22",
      answer: 4
      
    },
    {
      question: "According to Greek mythology, who was the first woman on Earth?",
      choice1: "Pandora", 
      choice2: "Hera",
      choice3: "Eve",
      choice4: "Lilith",
      answer: 1
    },
    {
      question: "In which European city would you find Orly airport?",
      choice1: "London", 
      choice2: "Belgium",
      choice3: "Paris",
      choice4: "Munich",
      answer: 3
    },
    {
      question: "Where would you find the Sea of Tranquility?",
      choice1: "California", 
      choice2: "The Moon",
      choice3: "Siberia",
      choice4: "China",
      answer: 2
    },
    {
      question: "Which artist painted 'Girl with a Pearl Earrin'?",
      choice1: "Van Gogh", 
      choice2: "Picasso",
      choice3: "Da Vinci",
      choice4: "Vermeer",
      answer: 4
      
    },
    {
      question: "What is the official name for the 'hashtag' symbol?",
      choice1: "Number sign", 
      choice2: "Hash Sign",
      choice3: "Pound",
      choice4: "Octothorpe",
      answer: 4
    },
    {
      question: "Not American at all, where is apple pie from?",
      choice1: "Japan", 
      choice2: "England",
      choice3: "Ethiopia",
      choice4: "Canada",
      answer: 2
    },
    {
      question: "What is the national animal of Scotland?",
      choice1: "Bear", 
      choice2: "Rabbit",
      choice3: "Unicorn",
      choice4: "Seal",
      answer: 3
    },
    {
      question: "Where in the world is the only place where Canada is *due south*",
      choice1: "Detroit", 
      choice2: "Washington",
      choice3: "Russia",
      choice4: "Alaska",
      answer: 1
    },
    {
      question: "Approximately how many grapes go into a bottle of wine?",
      choice1: "500", 
      choice2: "200",
      choice3: "1000",
      choice4: "700",
      answer: 4
    },
    {
      question: "How much does a US One Dollar Bill cost to make?",
      choice1: "$0.25", 
      choice2: "$1",
      choice3: "$0.05",
      choice4: "$5",
      answer: 3
    },
    {
      question: "The Vatican bank has the only ATM in the world that allows users to do what?",
      choice1: "Receive withdrawls in rosary beads", 
      choice2: "Perform transactions in Latin",
      choice3: "Purchase indulgences",
      choice4: "Vote for the Pope",
      answer: 2
    }
]
  
  
//Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};
getNewQuestion = () => {
    if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setTimeout('mostRecentScore', score);
        return window.location.assign('/end.html');
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", (e) => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false 
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        
        const classToApply = 
          selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
        if (classToApply == 'correct') {
            incrementScore(CORRECT_BONUS);
        }
        
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion()
        }, 1000);
        
    });
});
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();


  