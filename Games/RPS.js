const gameContainer = document.querySelector(".container");
userResult = document.querySelector(".user_res img");
cpuResult = document.querySelector(".pc_res img");
result = document.querySelector(".result");
optionsImages = document.querySelectorAll(".option_image");

optionsImages.forEach((image, index) => {
    image.addEventListener("click", (e) => {
        image.classList.add("active");
        userResult.src=cpuResult.src="Assets/rock-paper-scissor-game-images/images/rock.png";
        optionsImages.forEach((image2, index2) => {
            console.log(index, index2);
            index !== index2 && image2.classList.remove("active");

        });
        gameContainer.classList.add("start");
      let time=setTimeout(()=>{
        gameContainer.classList.remove("start");
        let imgSrc=e.target.querySelector("img").src;
        userResult.src=imgSrc;
        let randNo=Math.floor(Math.random()*3);
        let pcImgs=["Assets/rock-paper-scissor-game-images/images/rock.png","Assets/rock-paper-scissor-game-images/images/paper.png","Assets/rock-paper-scissor-game-images/images/scissors.png"];
        cpuResult.src=pcImgs[randNo];
        let pcVal=["R","P","S"][randNo];
        let userVal=["R","P","S"][index];
        let outcomes={
            RR:"Draw",
            SS:"Draw",
            PP:"Draw",
            RS:"Hurray! You wins",
            SP:"Hurray! You wins",
            PR:"Hurray! You wins",
            RP:"Oh! Computer wins",
            PS:"Oh! Computer wins",
            SR:"Oh! Computer wins",

        };
        let outcomeValue=outcomes[userVal+pcVal];
        result.textContent=outcomeValue;
      },2000);
    });

});