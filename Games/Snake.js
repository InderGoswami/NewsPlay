const playBoard = document.querySelector(".play-board");
let foodX = 13, foodY = 10;
let snakeX=5,snakeY=10;
// Function to randomly change the food's position
const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
    initGame(); // Call to re-render the new food position
};

// Function to initialize and display food on the board
const initGame = () => {
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"> </div>`;
    htmlMarkup+= `<div class="snake-head" style="grid-area: ${snakeY} / ${snakeX}"> </div>`;
    playBoard.innerHTML = htmlMarkup;
};

// Initialize the game with the first food position
initGame();

// Change food position and re-render it
changeFoodPosition();
