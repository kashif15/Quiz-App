const categories = {
    Cricket: [
        {
            question: "Who is known as the 'Little Master' in cricket?",
            options: ["Sachin Tendulkar", "Rahul Dravid", "Sunil Gavaskar", "Virat Kohli"],
            correctAnswer: ["Sachin Tendulkar"]
        },
        {
            question: "Which country won the first-ever Cricket World Cup held in 1975?",
            options: ["England", "West Indies", "Australia", "India"],
            correctAnswer: ["West Indies"]
        },
        {
            question: "Who holds the record for the highest individual score in a ODI cricket match?",
            options: ["Rohit Sharma", "Chris Gayle", "Sachin Tendulkar", "Virat Kohli"],
            correctAnswer: ["Rohit Sharma"]
        },
        {
            question: "What is the term for a batsman being dismissed without scoring any runs in cricket?",
            options: ["No Ball", "Zeroed Out", "Cleaned Bowled", "Duck"],
            correctAnswer: ["Duck"]
        },
        {
            "question": "Who is the highest run-scorer in the history of Test cricket?",
            "options": ["Ricky Ponting", "Jacques Kallis", "Sachin Tendulkar", "Alastair Cook"],
            "correctAnswer": ["Sachin Tendulkar"]
        },
          
        
        // Add more cricket questions here
    ],
    Bollywood: [
        {
            question: "Who played the lead role in the movie 'Dilwale Dulhania Le Jayenge'?",
            options: ["Shah Rukh Khan", "Amitabh Bachchan", "Salman Khan", "Aamir Khan"],
            correctAnswer: ["Shah Rukh Khan"]
        },
        {
            "question": "Who is the actress known as the 'Queen of Bollywood'?",
            "options": ["Deepika Padukone", "Kareena Kapoor Khan", "Priyanka Chopra", "Kangana Ranaut"],
            "correctAnswer": ["Kangana Ranaut"]
        },
        {
            "question": "Which Bollywood actor played the iconic role of 'Mogambo' in the movie 'Mr. India'?",
            "options": ["Amrish Puri", "Pran", "Prem Chopra", "Amjad Khan"],
            "correctAnswer": ["Amrish Puri"]
        },
        {
            "question": "In the movie '3 Idiots,' what is the mantra that Rancho teaches his friends?",
            "options": ["'All is well'", "'Follow your dreams'", "'Be successful at any cost'", "'Study hard'"],
            "correctAnswer": ["'All is well'"]
        },
        {
            "question": "Which Bollywood movie is often credited with popularizing the concept of 'Bollywood Masala' cinema?",
            "options": ["Sholay", "Dilwale Dulhania Le Jayenge", "Kabhi Khushi Kabhie Gham", "Mughal-e-Azam"],
            "correctAnswer": ["Sholay"]
        },
          
       
    ],
    World: [
        {
            question: "What is the capital of France?",
            options: ["London", "Berlin", "Madrid", "Paris"],
            correctAnswer: ["Paris"]
        },
        {
            "question": "Which continent is known as the 'Land Down Under'?",
            "options": ["Africa", "South America", "Australia", "Asia"],
            "correctAnswer": ["Australia"]
        },
        {
            "question": "Which river is the longest in the world?",
            "options": ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
            "correctAnswer": ["Nile River"]
        },
        {
            "question": "Which country is famous for its tulips and windmills?",
            "options": ["Italy", "Spain", "Netherlands", "France"],
            "correctAnswer": ["Netherlands"]
          },
          {
            "question": "Which mountain range is the longest in the world?",
            "options": ["Andes", "Himalayas", "Rocky Mountains", "Alps"],
            "correctAnswer": ["Andes"]
          },
          
          
          
          
        // Add more world-related questions here
    ],
    Movies: [
        {
            question: "Who directed the movie 'The Shawshank Redemption'?",
            options: ["Christopher Nolan", "Quentin Tarantino", "Martin Scorsese", "Frank Darabont"],
            correctAnswer: ["Frank Darabont"]
        },
        {
            "question": "Which movie won the Academy Award for Best Picture in 2020?",
            "options": ["1917", "Joker", "Parasite", "Once Upon a Time in Hollywood"],
            "correctAnswer": ["Parasite"]
        },
        {
            "question": "Which actor played the character Jack Dawson in the movie 'Titanic'?",
            "options": ["Brad Pitt", "Leonardo DiCaprio", "Tom Hanks", "Johnny Depp"],
            "correctAnswer": ["Leonardo DiCaprio"]
        },
        {
            "question": "Which movie features a young wizard named Harry Potter?",
            "options": ["The Hobbit", "Eragon", "Harry Potter and the Sorcerer's Stone", "Percy Jackson & the Olympians: The Lightning Thief"],
            "correctAnswer": ["Harry Potter and the Sorcerer's Stone"]
        },
        {
            "question": "In the film 'The Shawshank Redemption,' what is the name of the main character?",
            "options": ["Andy Dufresne", "Frank Underwood", "Ellis Redding", "John Nash"],
            "correctAnswer": ["Andy Dufresne"]
        },
          
          
          
          
        // Add more movie-related questions here
    ]
};

let currentCategory = "";
let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let timer = null;
let myArray = [];

const container = document.getElementById("contain");
//const startButton = document.getElementById("start-button");
const startButton = document.querySelectorAll(".start-button");
const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const timerElement = document.getElementById("timer");
const optionsElement = document.getElementById("options");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const resultContainer = document.getElementById("result-container");
const correctAnswersElement = document.getElementById("correct-answers");
const titleElement = document.getElementById("title");
const startAgain = document.getElementById("start-again");

function displayQuestion() {
    const current = categories[currentCategory][currentQuestion];
    questionElement.textContent = current.question;
    timerElement.textContent = "Time Left: 10 sec";

    optionsElement.innerHTML = "";

    for (let i = 0; i < current.options.length; i++) {
        const option = current.options[i];
        const li = document.createElement("li");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "options";
        radio.value = option;
        radio.id = `option${i}`;
        radio.addEventListener("change", () => {
            selectedOption = option;
            myArray[currentQuestion] = selectedOption;
            nextButton.disabled = false;
        });
        li.appendChild(radio);
        li.appendChild(document.createTextNode(option));
        optionsElement.appendChild(li);
    }

    nextButton.disabled = true;
    prevButton.disabled = currentQuestion === 0;

    // Start the timer
    startTimer();
}

function startTimer() {
    let timeLeft = 10;
    timer = setInterval(() => {
        timerElement.textContent = `Time Left: ${timeLeft} sec`;
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timer);
            timerElement.textContent = "";
            moveToNextQuestion();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    timerElement.textContent = "";
}

prevButton.addEventListener("click", () => {
    currentQuestion--;
    stopTimer();
    displayQuestion();
});

nextButton.addEventListener("click", () => {
    stopTimer();
    moveToNextQuestion();
});

/*
startButton.addEventListener("click", () => {
    currentCategory = startButton.value;
    titleElement.textContent = `${currentCategory} Quiz`;
    currentQuestion = 0;
    score = 0;
    selectedOption = null;
    container.style.display = "none";
    quizContainer.style.display = "block";
    resultContainer.style.display = "none";
    displayQuestion();
});



startAgain.addEventListener("click", () => {
     currentCategory = "";
    currentQuestion = 0;
     score = 0;
    selectedOption = null;
    timer = null;
     myArray = [];
    container.style.display = "block";
    quizContainer.style.display = "none";
    resultContainer.style.display = "none";
});

*/

// Event listener for the "Start Again" button within the result container
startAgain.addEventListener("click", () => {
    resetQuizState(); // Reset the quiz state
    container.style.display = "block";
    quizContainer.style.display = "none";
});

// Function to reset the quiz state
function resetQuizState() {
    currentCategory = "";
    currentQuestion = 0;
    score = 0;
    selectedOption = null;
    timer = null;
    myArray = [];
    questionContainer.style.display = "block";
    prevButton.style.display = "inline-block";
    nextButton.style.display = "inline-block";
    resultContainer.style.display = "none";

    // Reset the radio button selections
    
}




startButton.forEach((button) => {
    button.addEventListener("click", (event) => {
        currentCategory = event.target.value;
        titleElement.textContent = `${currentCategory} Quiz`;
        currentQuestion = 0;
        score = 0;
        selectedOption = null;
        container.style.display = "none";
        quizContainer.style.display = "block";
        resultContainer.style.display = "none";
        displayQuestion();
    });
});

function showResult() {
    questionContainer.style.display = "none";
    prevButton.style.display = "none";
    nextButton.style.display = "none";
    resultContainer.style.display = "block";
    correctAnswersElement.textContent = score;
}

function moveToNextQuestion() {
    currentQuestion++;
    if (currentQuestion < categories[currentCategory].length) {
        displayQuestion();
    } else
    {
        for(let i=0; i<myArray.length; i++)
        {
            
            if(myArray[i] == categories[currentCategory][i].correctAnswer)
            {
                score++;
            }
        }
        showResult();
    }
}