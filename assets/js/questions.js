// questions.js

// Initialize variables
let imageObject;
let questNum = "0";

// Function to load the quiz
function loadQuiz() {
    document.getElementById("play").addEventListener("click", function() {
        const country = getCountry(questNum);
        displayImage(country.url);
        displayOptions(country.options);
    });
}

// Function to get country object by number
function getCountry(num) {
    return countriesArray[num];
}

// Function to display the image
function displayImage(url) {
    const imageDiv = document.getElementById("image");
    imageDiv.innerHTML = ''; // Clear existing content
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Country Flag";
    img.className = "flag"; // Optional: for styling purposes
    imageDiv.appendChild(img);
}

// Function to display options
function displayOptions(options) {
    const choiceElements = document.querySelectorAll('.choicetext');
    options.forEach((option, index) => {
        choiceElements[index].textContent = option;
    });
}

// Initialize the quiz when the DOM is loaded
document.addEventListener("DOMContentLoaded", loadQuiz);


function getFlagImage(countryUrl){

}

function getOptions(){

}
function selectAnswer(){

}

function checkAnswer(){

}

function displayInfo(){

}

function nextQuestion(){

}