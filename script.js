const API_KEY="d92e2f046a6c4998a4c3c3177d1d6eb9";
const url="https://newsapi.org/v2/everything?q="
window.addEventListener("load",()=>fetchNews("India"));
async function fetchNews(query){
    const response=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data=await response.json();
    bindData(data.articles);
}
function bindData(articles){
    const cardContainer =document.getElementById("cards-container");
    const newsCardTemplate=document.getElementById("template-news-card");
    cardContainer.innerHTML="";
    articles.forEach(article=>{
        if(!article.urlToImage)return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardContainer.appendChild(cardClone);
    })
}
function fillDataInCard(cardClone,article){
    const newsImg=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDesc=cardClone.querySelector('#news-desc');
    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;
    const date=new Date(article.publishedAt).toLocaleString("en-US",{timeZone:"Asia/Jakarta"});
    newsSource.innerHTML=`${article.source.name} - ${date}`;
    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })

}
let currSelectedNav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    currSelectedNav
}
const searchBtn = document.querySelector("#search-btn");

searchBtn.addEventListener('click', () => {
    const searchText = document.querySelector('.news-input').value; // Move this inside the click event
    if (!searchText) return;
    fetchNews(searchText);
});

const jokeText=document.getElementById("joke-text");
const jokeBtn=document.getElementById("joke-btn");
async function getJoke() {
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if(data.type==="single")
    jokeText.textContent=`${data.joke}`;
    else if(data.type==="twopart")
        jokeText.textContent = `${data.setup} - ${data.delivery}`;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
  document.addEventListener("DOMContentLoaded",getJoke())
  jokeBtn.addEventListener("click",getJoke);
  getJoke();
  document.getElementById('joke-go').addEventListener('click', function() {
    // Scroll to the bottom of the page
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    
    });
  });