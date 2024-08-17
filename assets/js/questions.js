// questions.js// Initialize variables
let questNum = 0;
let selectedAnswer = null;
let score = 0;
let country = {};

// Function to load the quiz
function loadQuiz() {
    const playButton = document.getElementById("play");
    playButton.addEventListener("click", function () {
        resetQuiz();
        playButton.textContent = 'Play Again'; // Change button text to "Play Again"
        nextQuestion();
    });
}

// Function to reset the quiz
function resetQuiz() {
    questNum = 0;  // Reset question number at the start
    score = 0;     // Reset score at the start
    selectedAnswer = null;
    country = {};
    document.getElementById("image").innerHTML = ''; // Clear image container
    const choiceElements = document.querySelectorAll('.choicetext');
    choiceElements.forEach(choiceElement => {
        choiceElement.textContent = ''; // Clear choices text content
    });
}

// Function to get country object by number
function getCountry(num) {
    return countriesArray[num];
}

// Function to display the image
function displayImage(url) {
    const imageDiv = document.getElementById("image");
    imageDiv.innerHTML = ''; // Clears existing content
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Country Flag";
    img.className = "flag";
    imageDiv.appendChild(img);
}

// Function to shuffle array (Fisher-Yates algorithm)
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

// Function to display options
function displayOptions(options) {
    const choiceElements = document.querySelectorAll('.choicetext');
    const shuffledOptions = shuffle(options.slice()); // Shuffle a copy of the options array
    
    // Clear existing event listeners and text content
    choiceElements.forEach((choiceElement, index) => {
        const newElement = choiceElement.cloneNode(true);
        choiceElement.parentNode.replaceChild(newElement, choiceElement);
        newElement.textContent = shuffledOptions[index];
        newElement.addEventListener("click", function () {
            selectAnswer(shuffledOptions[index], country.country);
        });
    });
}

function selectAnswer(option, countryName) {
    selectedAnswer = option;
    checkAnswer(option, countryName);
}

function checkAnswer(option, countryName) {
    const normalizedOption = option.trim().toLowerCase();
    const normalizedCountry = countryName.trim().toLowerCase();

    if (normalizedOption === normalizedCountry) {
        score += 10;
        alert(`Correct, Well Done! \nYour Score Is: ${score} \nThe population of ${country.country}: ${country.population} \nThe Language is: ${country.language}\nThe Capital City is: ${country.capital}`);
    } else {
        alert("Sorry, that's the wrong answer!");
    }

    // Proceed to the next question after a short delay
    setTimeout(nextQuestion, 1000); // Delay of 1 second
}

// Loads the next question when each question has been answered or displays the final quiz score if all questions were answered.
function nextQuestion() {
    if (questNum < countriesArray.length) {
        country = getCountry(questNum);
        displayImage(country.url);
        displayOptions(country.options);
        questNum++; // Increment questNum here
    } else {
        showFinalScore();
    }
}

const jsConfetti = new JSConfetti();

// Trigger the alert and confetti
function showAlertAndConfetti() {
  jsConfetti.addConfetti({
    emojis: ['⭐', '🌟', '💫', '✩', '✮', '🎸'],
    emojiSize: 50,
    confettiNumber: 500
  });
}

// Show final score at the end of the quiz
function showFinalScore() {
    if (score === 0) {
        alert("Sorry, you didn't get any correct this time!");
    } else {
        alert(`Well Done! Your Final Score is ${score}`);
        showAlertAndConfetti();
    }

    if (confirm("Game over. Do you want to play again?")) {
        resetQuiz();
        nextQuestion();
    }
}

// Initialize the quiz when the DOM is loaded.
document.addEventListener("DOMContentLoaded", loadQuiz);