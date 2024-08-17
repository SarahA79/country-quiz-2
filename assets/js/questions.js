// questions.js

// Initialize variables
let imageObject;
let questNum = 0;
let selectedAnswer = null;
let score = 0;
let countryName = "";
let option = "";
let answered = false;

// Function to load the quiz
function loadQuiz() {
    document.getElementById("play").addEventListener("click", function () {
        if (questNum < countriesArray.length) {
            country = getCountry(questNum);
            displayImage(country.url);
            displayOptions(country.options);
        } else {
            alert(`Final Score: ${score} `);
        }
        //    removed code: document.getElementById("play").addEventListener("click", function() {
    });
}

// Function to get country object by number
function getCountry(num) {
    countryName = countriesArray[num].country;
    return countriesArray[num];
    console.log(country);
}

// Function to display the image
function displayImage(url) {
    const imageDiv = document.getElementById("image");
    imageDiv.innerHTML = ''; // Clears existing content
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Country Flag"; //future feature to implement description of flag
    img.className = "flag";
    imageDiv.appendChild(img);
}

// Function to display options
function displayOptions(options) {
    const choiceElements = document.querySelectorAll('.choicetext');
    options.forEach((option, index) => {
        choiceElements[index].textContent = option;
        choiceElements[index].addEventListener("click", function () {
            selectAnswer(option)
        });
    });
}

function getFlagImage(countryUrl) {

}

function getOptions() {

}

function selectAnswer(option, countryName) {
    selectedAnswer = option;
    checkAnswer(option, countryName)
    answered = true;
}

function checkAnswer(option, countryName) {
    if (option === countryName) {
        score += 10;
        console.log(option, countryName)
        alert(`Correct, Well Done! \n Your Score Is: ${score};`)
        selectedAnswer = null;
    } else {
        alert("Sorry, thats the wrong answer!");
        selectedAnswer = null;
    }

    questNum++;
    nextQuestion();
}

function displayInfo() {

}

//loads the next question when each question has been answered or displays final quiz score if all questions were answered.
function nextQuestion() {
    if (questNum < countriesArray.length) {
        country = getCountry(questNum);
        displayImage(country.url);
        displayOptions(country.options);
        answered = false;
    } else {
        if (score === 0) {
            alert("Sorry you didnt get any correct this time!")
        } else {
            alert(`Well Done! Your Final Score is ${score}`);
        }
    }
}

// Initialize the quiz when the DOM is loaded. 
document.addEventListener("DOMContentLoaded", loadQuiz);