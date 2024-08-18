// Initialize variables
let questNum = 0; // Current question number
let selectedAnswer = null; // Stores the user's selected answer
let score = 0; // User's score
let country = {}; // Stores the current country object

/**
 * Function to load the quiz
 * Attaches an event listener to the play button to start or restart the quiz.
 */
function loadQuiz() {
    const playButton = document.getElementById("play");
    playButton.addEventListener("click", function () {
        resetQuiz();
        playButton.textContent = 'Play Again'; // Change button text to "Play Again"
        nextQuestion(); // Load the first question
    });
}

/**
 * Function to reset the quiz
 * Resets the quiz variables and UI elements to their initial states.
 */
function resetQuiz() {
    questNum = 0; // Reset question number at the start
    score = 0; // Reset score at the start
    selectedAnswer = null; // Clear selected answer
    country = {}; // Clear current country
    document.getElementById("image").innerHTML = ''; // Clear image container
    const choiceElements = document.querySelectorAll('.choicetext');
    choiceElements.forEach(choiceElement => {
        choiceElement.textContent = ''; // Clear choices text content
    });
}

/**
 * Function to get a country object by its number
 * @param {number} num - The index number of the country in the array.
 * @returns {object} - The country object corresponding to the given index.
 */
function getCountry(num) {
    return countriesArray[num];
}

/**
 * Function to display an image of the country's flag
 * @param {string} url - The URL of the image to be displayed.
 */
function displayImage(url) {
    const imageDiv = document.getElementById("image");
    imageDiv.innerHTML = ''; // Clears existing content
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Country Flag";
    img.className = "flag";
    imageDiv.appendChild(img); // Append the image to the container
}

/**
 * Function to shuffle an array using the Fisher-Yates algorithm
 * @param {array} array - The array to be shuffled.
 * @returns {array} - The shuffled array.
 */
function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

/**
 * Function to display the answer options for the current question
 * @param {array} options - The array of possible answer options.
 */
function displayOptions(options) {
    const choiceElements = document.querySelectorAll('.choicetext');
    const shuffledOptions = shuffle(options.slice()); // Shuffle a copy of the options array

    // Clear existing event listeners and text content
    choiceElements.forEach((choiceElement, index) => {
        const newElement = choiceElement.cloneNode(true); // Create a copy of the element
        choiceElement.parentNode.replaceChild(newElement, choiceElement); // Replace the old element with the new one
        newElement.textContent = shuffledOptions[index]; // Set the text content to the shuffled option
        newElement.addEventListener("click", function () {
            selectAnswer(shuffledOptions[index], country.country);
        });
    });
}

/**
 * Function to handle answer selection
 * @param {string} option - The answer option selected by the user.
 * @param {string} countryName - The correct answer (country name).
 */
function selectAnswer(option, countryName) {
    selectedAnswer = option; // Store the selected answer
    checkAnswer(option, countryName); // Check if the answer is correct
}

/**
 * Function to check if the selected answer is correct
 * @param {string} option - The selected answer.
 * @param {string} countryName - The correct answer (country name).
 */
function checkAnswer(option, countryName) {
    const normalizedOption = option.trim().toLowerCase(); // Normalize the selected answer
    const normalizedCountry = countryName.trim().toLowerCase(); // Normalize the correct answer

    if (normalizedOption === normalizedCountry) {
        score += 10; // Increment score if correct
        alert(`Correct, Well Done! \nYour Score Is: ${score} \nThe population of ${country.country} is ${country.population} the language spoken there is: ${country.language} and the Capital City is ${country.capital}`);
    } else {
        alert("Sorry, that's the wrong answer!");
    }

    // Proceed to the next question after a short delay
    setTimeout(nextQuestion, 1000); // Delay of 1 second
}

/**
 * Function to load the next question or show the final score if all questions are answered
 */
function nextQuestion() {
    if (questNum < countriesArray.length) { // Adjust this condition based on your array length
        country = getCountry(questNum); // Get the current country
        displayImage(country.url); // Display the country's flag
        displayOptions(country.options); // Display the answer options
        questNum++; // Increment the question number
    } else {
        showAlertAndConfetti(); // Show confetti and alert for completing the quiz
        showFinalScore(); // Display the final score
    }
}

const jsConfetti = new JSConfetti();

/**
 * Function to trigger an alert and confetti
 */
function showAlertAndConfetti() {
    // Trigger confetti immediately
    jsConfetti.addConfetti({
        emojis: ['🇫🇷', '🇩🇪', '🎉', '🇯🇵', '🎊', '🇧🇷', '🎉', '🇨🇦', '🇮🇳'],
        emojiSize: 100,
        confettiNumber: 1800
    });

    // Set interval to trigger confetti repeatedly
    const intervalId = setInterval(() => {
        jsConfetti.addConfetti({
            emojis: ['🇫🇷', '🇩🇪', '🎉', '🇯🇵', '🎊', '🇧🇷', '🎉', '🇨🇦', '🇮🇳'],
            emojiSize: 100,
            confettiNumber: 1800
        });
    }, 5); // This will trigger confetti every 5ms

    // Stop the confetti after 5 seconds
    setTimeout(() => {
        clearInterval(intervalId);
    }, 5000); // 5000ms = 5 seconds
}

/**
 * Function to show the final score and ask if the user wants to play again
 */
function showFinalScore() {
    if (score === 0) {
        alert("Sorry, you didn't get any correct this time!");
    } else {
        alert(`Well Done! Your Final Score is ${score}`);
        showAlertAndConfetti(); // Trigger confetti for the final score
    }

    if (confirm("Game over. Do you want to play again?")) {
        resetQuiz(); // Reset the quiz if the user wants to play again
        nextQuestion(); // Load the first question
    }
}

// Initialize the quiz when the DOM is loaded
document.addEventListener("DOMContentLoaded", loadQuiz);