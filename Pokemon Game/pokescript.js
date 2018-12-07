var userGuess = document.getElementById("userGuess"); 
var userAnswer = document.getElementById("userAnswer"); 
var userWins = document.getElementById("win"); 
var userLoss = document.getElementById("lose"); 
var userTries = document.getElementById("tries"); 
var instructions = document.getElementById("instructions");
var img = document.getElementById("picture");
var message = document.getElementById("message");
var inputField = document.getElementById("textInput");

var gameCore = {
    
    winCount: 0,
    loseCount: 0,
    triesLeft: 10,
    wordList: ['PIKACHU', 'BULBASAUR', 'CHARMANDER', 'SQUIRTLE', 'PSYDUCK', 'CUBONE', 'CLEFAIRY', 'EEVEE' , 'DRAGONAIR', 'ONIX'], //List of words for game
    imgList: ['images/pikachu.jpg', 'images/bulbasaur.jpg', 'images/charmander.jpg', 'images/squirtle.jpg', 'images/psyduck.jpg', 'images/cubone.jpg', 'images/clefairy.jpg', 'images/eevee.jpg', 'images/dragonair.jpg', 'images/onix.jpg'], //List image reference
    answers: "",
    imageSrc: "",
    displayWord: [], 
    wrongGuess: [], 
    rightGuess: [], 

    gameStart: false, 

    gameReset: function() {
        
        this.triesLeft = 10;
        this.wrongGuess = [];
        this.rightGuess = [];
        this.displayWord = [];
        

        
        var ranNum = Math.floor(Math.random() * this.wordList.length)
        this.answers = this.wordList[ranNum];
        this.imageSrc = this.imgList[ranNum];
        this.displayWordBlank();

        message.textContent = "Gotta guess them all!";
        userGuess.textContent = "You Guessed: ";
        userTries.textContent = this.triesLeft;
        inputField.value = ""; 
    },

    pastGuess: function(letter, state) {
        if (state == 1){
            this.rightGuess.push(letter);
        }
        else if (state == 2){
            this.wrongGuess.push(letter);
        }
    },

    displayWordBlank: function() {
        for (i=0; i<this.answers.length; i++){
            if (isAlpha(this.answers.charCodeAt(i))){
                this.displayWord.push('_');
            }
            else{
                this.displayWord.push(this.answers[i]);
            }
        }
        userAnswer.textContent = "";
        for (j=0; j<this.displayWord.length; j++){
            userAnswer.textContent += (this.displayWord[j] + "\xa0"); 
        }
    },
};

function isAlpha(keyCode){
    return ((keyCode >= 65 && keyCode <= 90)||(keyCode >= 97 && keyCode <= 122));
}

function isInWord(letter){
    return (gameCore.answers.indexOf(letter) != -1);
}

function replaceBlank(letter){
    for (i=0; i<gameCore.displayWord.length; i++){
        if (letter == gameCore.answers[i]){
            gameCore.displayWord[i] = letter;
        }
    }
    userAnswer.textContent = "";
    for (j=0; j<gameCore.displayWord.length; j++){
        userAnswer.textContent += (gameCore.displayWord[j] + "\xa0"); 
    } 
}

function checkAnswer(){
    var inputWord = "";
    for (i=0; i<gameCore.displayWord.length; i++){
        inputWord += gameCore.displayWord[i];
    }
    return (inputWord == gameCore.answers);
}

document.onkeyup = function(event){
    if (gameCore.gameStart == false){
        inputField.value = ""; 
        gameCore.gameStart = true;
        instructions.textContent = "Please enter a letter";
        gameCore.gameReset();
        
        
    }
    else if(checkAnswer()){
        gameCore.gameReset();
        instructions.textContent = "Please enter a letter";
        img.src = logo.jpg;

    }
    else if (gameCore.triesLeft > 0){
        var userInput;
        var inputCode;
        if (inputField.value!=""){
            userInput = inputField.value;
            inputCode = userInput.charCodeAt(0);
            inputField.value = ""; 
        }
        else{
            userInput = event.key;
            inputCode = event.keyCode;
        }
        if(isAlpha(inputCode)){
            var inputUpper = userInput.toUpperCase();
            if (isInWord(inputUpper) && (gameCore.rightGuess.indexOf(inputUpper)==-1)){
                gameCore.pastGuess(inputUpper, 1);
                replaceBlank(inputUpper);
                inputField.value = ""; 

                if(checkAnswer()){
                    gameCore.winCount++;
                    userWins.textContent = gameCore.winCount;
                    message.textContent = "You Got it !";
                    instructions.textContent = "Enter any key to continue";
                    img.src = gameCore.imageSrc;
                }
            }
            else if ((gameCore.wrongGuess.indexOf(inputUpper)==-1) && (gameCore.rightGuess.indexOf(inputUpper)==-1)){
                gameCore.pastGuess(inputUpper, 2);
                gameCore.triesLeft--;

                if(gameCore.triesLeft == 0){
                    instructions.textContent = "Enter any key to continue";
                    message.textContent = "The Answer was: " + gameCore.answers;
                }

                userGuess.textContent += (inputUpper + "\xa0");
                userTries.textContent = gameCore.triesLeft;
                inputField.value = ""; 
            }
        }
        else{
            alert("Please press only letters!");
            inputField.value = "";
        }

    }
    else{

        gameCore.gameReset();
        gameCore.loseCount++;
        userLoss.textContent = gameCore.loseCount;

    }
}
