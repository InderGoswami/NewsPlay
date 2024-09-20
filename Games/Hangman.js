const KeyBoard=document.querySelector("#keyboard");
const wordDisplay=document.querySelector(".word-display");
const guessText=document.querySelector(".guess-text b");
const hangmanImg=document.querySelector(".hangman-box  img");
const gameModal=document.querySelector(".game-modal");
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
const gameOver=(isWin)=>{
    setTimeout(()=>{
        gameModal.classList.add("show");
    })
}
for (let i=97;i<=122;i++){
    const btn=document.createElement("button");
    btn.innerText=String.fromCharCode(i);
    KeyBoard.appendChild(btn);
    btn.addEventListener("click",e =>initGame(e.target,String.fromCharCode(i)));
}

const getRandWord=()=>{
    const {word,hint}=hangmanWords[Math.floor(Math.random()*hangmanWords.length)];
    currWord=word;
    console.log(word);
    document.querySelector(".hint-text b").innerText=hint;
    wordDisplay.innerHTML=word.split("").map(()=> ` <li class="letter"></li>`).join("");
}
getRandWord();