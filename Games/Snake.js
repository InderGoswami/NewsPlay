const playBoard = document.querySelector(".play-board");
const scoreEle=document.querySelector(".score");
let foodX = 13, foodY = 10;
let snakeX=5,snakeY=10;
let snakeBody=[];
let gameOver=false;
// Function to randomly change the food's position
const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
    initGame(); // Call to re-render the new food position
};
const handleGameOver=()=>{
    clearInterval(id);
    alert("Game Over!Press OK to replay");
    location.reload();
}
let score=0;
// Function to initialize and display food on the board
const initGame = () => {
    if(gameOver==true)return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"> </div>`;
    htmlMarkup+= `<div class="snake-head" style="grid-area: ${snakeY} / ${snakeX}"> </div>`;
    if(snakeX===foodX && snakeY===foodY){
        changeFoodPosition();
        snakeBody.push([foodX,foodY]);
        console.log(snakeBody);
        score++;
        scoreEle.innerHTML=`Score: ${score}`;
    }
    for(let i=snakeBody.length-1;i>0;i--){
        snakeBody[i]=snakeBody[i-1];
    }
    snakeBody[0]=[snakeX,snakeY];
    snakeX+=speedX;
    snakeY+=speedY;
    if(snakeX<=0|| snakeX>30 || snakeY<0 ||snakeY>30){
        gameOver=true;
    }
    for(let i=0;i<snakeBody.length;i++){
        htmlMarkup+= `<div class="snake-head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"> </div>`;
         if(i!==0 && snakeBody[0][1]==snakeBody[i][1] && snakeBody[0][0]==snakeBody[i][0]){
            gameOver=true;
         }
    }
    playBoard.innerHTML = htmlMarkup;
};
let speedX=0;
let speedY=0;
const changeDirection=(e)=>{
    if(e.key=="ArrowUp" && speedY!=1){
        speedX=0;
        speedY=-1;
    }
    else if(e.key=="ArrowDown" && speedY!=-1){
        speedX=0;
        speedY=1;
    }
    else if(e.key=="ArrowRight"  && speedX!=-1){
        speedX=1;
        speedY=0;
    }
    else if(e.key=="ArrowLeft"  && speedX!=1){
        speedX=-1;
        speedY=0;
    }
    initGame();
}




// Change food position and re-render it
changeFoodPosition();
let id=setInterval(initGame,130);
document.addEventListener("keydown",changeDirection);
