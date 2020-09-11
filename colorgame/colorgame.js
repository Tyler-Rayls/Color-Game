var numSquares = 6;
var guessCount = 0;
var gamesPlayed = 0;
var colorGuessed;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var pickedColorDisplay = document.getElementById("pickedColor");
var messageDisplay = document.getElementById("message");
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");
var avgGuessDisplay = document.getElementById("avgGuess");

// Starts the game
init();

function init() {
    setupModeButtons();
    setupSquares();
    resetGame();
};

// Adds event listeners to the mode buttons. 
function setupModeButtons() {
    for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            // Removes the selected class from all buttons and adds it to
            // the button that was just clicked
            modeButtons[0].classList.remove("active");
            modeButtons[1].classList.remove("active");
            this.classList.add("active");
            // Identifies which mode the game is to be played in and resets the game
            this.textContent === "EASY" ? numSquares = 3: numSquares = 6;
            resetGame();
        });
    };
};

// Adds event listeners to the squares
function setupSquares() {
    for(var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function(){
            // Adds a count to the guess counter
            addGuess();
            // Checks if the color of the squares matches the pickedColor
            if(this.style.backgroundColor === pickedColor){
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "PLAY AGAIN?";
                resetButton.classList.add("btn-outline-success");
                resetButton.classList.remove("btn-outline-secondary");
                changeColors();
                displayAverageGuess();
            } else {
                // Fades the square out if it is not the right color and
                // updates the message
                this.style.backgroundColor = "#EDEDED";
                messageDisplay.textContent = "Try Again";
            };
        });
    };
};

// Resets the game elements on the display
function resetGame() {
    colorGuessed = false;
    // Generates new colors, picks one, and changes the colors of the squares
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    for(var i = 0; i < squares.length; i++) {
        if(colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    };
    // Updates the reset button to reflect a new game being played
    resetButton.classList.remove("btn-outline-success");
    resetButton.classList.add("btn-outline-secondary");
    resetButton.textContent = "NEW COLORS";
    // Updates the relevant text to reflect a new game
    pickedColorDisplay.textContent = pickedColor;
    pickedColorDisplay.style.color = "#EE6123";
    messageDisplay.textContent = "Let's Play";
};

// Changes the color of all the squares and the header to the pickedColor when 
// the user picks the correct square
function changeColors() {
    for(var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = pickedColor;
    };
    pickedColorDisplay.style.color = pickedColor;
};

// Picks a random color from the colors array
function pickColor() {
    var random = Math.floor(Math.random() * numSquares);
    return colors[random];
};

// Generates and returns a random array with the specified number of colors in 
// rgb format
function generateRandomColors(num) {
    var arr = [];
    for(var i = 0; i < num; i++){
        arr.push(randColor());
    };
    return arr
};

// Generates random values between 0-255 for each color channel and
// returns a string in the format "rgb(r, g, b)"
function randColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
};

// Resets the elements on the display
resetButton.addEventListener("click", function(){
    resetGame();
});

// Checks if the current game is over before adding 1 to the guess count
function addGuess() {
    if(colorGuessed === false) {
        guessCount += 1;
    };
};

// Displays the average number of guesses per game on the screen
function displayAverageGuess() {
    if(colorGuessed === false) {
        gamesPlayed += 1;
        avgGuessDisplay.textContent = Math.round(guessCount / gamesPlayed * 100)/100;
        colorGuessed = true;
    };
};