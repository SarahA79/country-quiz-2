
let imageObject;
let imagePlaceholder;
let imageData;
function loadQuiz(){
    document.getElementById("play").addEventListener("click", function() {
       
            const imageObject = countriesArray[0];
            const imagePlaceholder = document.getElementById("image");
            const imageData =document.getElementById('imageData');

            imagePlaceholder.src = imageObject[currentIndex].url;
            imageData.innerHTML= '<img src=imagePlaceholder alt = "flag image"/>'
        }

function getCountry(){

}

function getFlagImage(){

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