const API_KEY="d92e2f046a6c4998a4c3c3177d1d6eb9";
const url="https://newsapi.org/v2/everything?q="
window.addEventListener("load",()=>fetchNews("Punjab India"));
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