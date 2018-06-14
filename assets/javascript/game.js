var wordReveal = document.getElementById("wordReveal");
var letterGuessedDiv = document.getElementById("letterGuessed");
var guessesRemaining = document.getElementById("guessesRemaining");
var onlyRunOnce = 0;


var game1 = new WordGuessGame(10, ["grape", "banana", "pear", "avacodo", "lime", "lemon", "orange", "melon", "watermelon"], [], []);;

document.onkeypress = function (event) {
    if (onlyRunOnce === 0) {
        onlyRunOnce++;
        game1.selectWord();
    } else {
        game1.displayLetter(event);
    }
}


function WordGuessGame(userLife, wordArray, letterGuessed, wordSelected) {
    this.userLife = userLife;
    this.wordArray = wordArray;
    this.letterGuessed = letterGuessed;
    this.wordSelected = wordSelected;


    this.selectWord = function () {
        var randomIndex = Math.floor(Math.random() * wordArray.length);
        var randomWord = wordArray[randomIndex];
        wordSelected.push(randomWord);
        var splitLettersArray = wordSelected[0].split("");
        for (let i = 0; i < splitLettersArray.length; i++) {
            var newSpan = document.createElement("span");
            newSpan.textContent = "_";
            newSpan.id = i;
            newSpan.className = "col-sm-2";
            wordReveal.appendChild(newSpan);
        }
    };
    this.displayLetter = function (event) {
        this.letterGuessed.push(event.key);
        letterGuessedDiv.innerHTML = letterGuessed;
        var splitLettersArray = wordSelected[0].split("");
        var matchNumber = splitLettersArray.indexOf(event.key);
        if (matchNumber >= 0) {
            this.revealLetter(event, matchNumber);
        } else {
            this.userLife = (this.userLife - 1);
            guessesRemaining.textContent = this.userLife;
        }
    }
    this.revealLetter = function (event, matchNumber) {
            for (let i = 0; i < 10; i++) {
                var findSpan = document.getElementById(i)
                if (matchNumber == findSpan.id) {
                    findSpan.textContent = event.key
                }
            }
    }
}