const KeyBoard=document.querySelector("#keyboard");
const wordDisplay=document.querySelector(".word-display");
const guessText=document.querySelector(".guess-text b");
const hangmanImg=document.querySelector(".hangman-box  img");
const gameModal=document.querySelector(".game-modal");
const playAgainBtn=document.querySelector(".play-again");
let currWord;
let wrongGuessCount=0;
let correctLetters=[];
const initGame=(button,clickedLetter)=>{
   if(currWord.includes(clickedLetter)){
    [...currWord].forEach((letter,index)=>{
        if(letter===clickedLetter){
            correctLetters.push(letter);
            wordDisplay.querySelectorAll("li")[index].innerText=letter;
            wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
        }
    })
   }
   else{
    wrongGuessCount++;
    hangmanImg.src=`Assets/hangman-game-images/images/hangman-${wrongGuessCount}.svg`;
   }
   button.disabled=true;
   guessText.innerText=`${wrongGuessCount}/6`;
   if(wrongGuessCount==6){
    return gameOver(false);
   }
   if(correctLetters.length===currWord.length){
    return gameOver(true);
   }
}
const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `You found the word:` : `The correct word was:`;
        gameModal.querySelector("img").src = `Assets/hangman-game-images/images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currWord}</b>`;

        gameModal.classList.add("show");

    }, 300);
}

for (let i=97;i<=122;i++){
    const btn=document.createElement("button");
    btn.innerText=String.fromCharCode(i);
    KeyBoard.appendChild(btn);
    btn.addEventListener("click",e =>initGame(e.target,String.fromCharCode(i)));
}
const resetGame=()=>{
    correctLetters=[];
    wrongGuessCount=0;
    guessText.innerText=`${wrongGuessCount}/6`;
    wordDisplay.innerHTML=currWord.split("").map(()=> ` <li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
    KeyBoard.querySelectorAll("button").forEach(button=>button.disabled=false);
    hangmanImg.src=`Assets/hangman-game-images/images/hangman-${wrongGuessCount}.svg`;
}
const getRandWord=()=>{
    const {word,hint}=hangmanWords[Math.floor(Math.random()*hangmanWords.length)];
    currWord=word;
    console.log(word);
    document.querySelector(".hint-text b").innerText=hint;
    resetGame();
    wordDisplay.innerHTML=word.split("").map(()=> ` <li class="letter"></li>`).join("");
}
getRandWord();
playAgainBtn.addEventListener("click",getRandWord);