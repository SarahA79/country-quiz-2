// questions.js

// Initialize variables
let imageObject;
let questNum = 0;
let selectedAnswer = null;
let score = 0;
let countryName = "";
let option = "";

// Function to load the quiz
function loadQuiz() {
    document.getElementById("play").addEventListener("click", function() {
    if (questNum < countriesArray.length){
        country = getCountry(questNum);
        displayImage(country.url);
        displayOptions(country.options);
    }
    else{
        alert (`Final Score: ${score} `);
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
    img.alt = "Country Flag";//future feature to implement description of flag
    img.className = "flag"; 
    imageDiv.appendChild(img);
}

// Function to display options
function displayOptions(options) {
    const choiceElements = document.querySelectorAll('.choicetext');
    options.forEach((option, index) => {
        choiceElements[index].textContent = option;
        choiceElements[index].addEventListener("click", function(){selectAnswer(option)});
    });
}

function getFlagImage(countryUrl){

}

function getOptions(){

}
function selectAnswer(option, countryName){
    selectedAnswer = option;
    checkAnswer(option, countryName)
}

function checkAnswer(option, countryName){
    if (option === countryName){
        score += 10;
        alert (`Correct, Well Done! \n Your Score Is: ${score};`)
        selectedAnswer = null;
    }
    else{
        alert ("Sorry, thats the wrong answer!");
        selectedAnswer = null;
    }
    
    questNum ++;
    if (questNum < countriesArray.length){
        loadQuiz();}
}

function displayInfo(){

}

function nextQuestion(){

}

// Initialize the quiz when the DOM is loaded. 
document.addEventListener("DOMContentLoaded", loadQuiz);
