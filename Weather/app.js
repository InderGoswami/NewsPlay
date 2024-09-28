const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');
const notFoundSection = document.querySelector('.not-found');
const searchCitySection = document.querySelector('.search-city');
const weatherInfoSection = document.querySelector('.info');
const apiKey = 'f747297a31f53d1c6326452fc287299d';
const countTxt=document.querySelector('.country');
const tempTxt=document.querySelector('.temp');
const conditionTxt=document.querySelector('.condition-info');
const humidityValueTxt=document.querySelector('.humidity-value-txt');
const windValueTxt=document.querySelector('.wind-value-txt');
const weatherSummaryImg=document.querySelector('.weather-summary-img');
const currentDateTxt=document.querySelector('.current-date-txt');
const forecastItemsContainer=document.querySelector('.forecast-items-container');
searchBtn.addEventListener("click", () => {
    if (cityInput.value.trim() != '') {
        updateWeatherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
});

cityInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter' && cityInput.value.trim() != '') {
        updateWeatherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
});
function getWeatherImg(id){
    if(id<=232){
        return 'thunderstrom.svg'
    }
    else if(id<=321){
        return 'drizzle.svg'
    }
    else if(id<=531){
        return 'rain.svg';
    }
    else if(id<=622){
        return 'snow.svg';
    }
    else if(id<=781){
        return 'atmosphere.svg';
    }
    else if(id<=800){
        return 'clear.svg';
    }
    else{
        return 'clouds.svg';
    }
    


}
async function getFetchData(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiURL);
    return response.json();
}

async function updateWeatherInfo(city) {
    const weatherData = await getFetchData(city);
    console.log(weatherData);

    if (weatherData.cod != 200) {
        showDisplaySection(notFoundSection);
        return;
    }
    const{
        name:country,
        main:{temp,humidity},
        weather:[{id,main}],
        wind:{speed},
    }=weatherData
    countTxt.textContent=country;
    tempTxt.textContent=temp+' °C';
    windValueTxt.textContent=speed+' m/s';
    humidityValueTxt.textContent=humidity+'%';
    weatherSummaryImg.src=`${getWeatherImg(id)}`
    // Here you would update your weatherInfoSection with the data
    await updateForecastInfo(city);
    showDisplaySection(weatherInfoSection);
    currentDateTxt.textContent=getCurrentDate();
    
}

function showDisplaySection(section) {
    [weatherInfoSection, searchCitySection, notFoundSection].forEach(sect => sect.style.display = 'none');
    section.style.display = 'flex';
}
function updateForecastInfo(city){
    const forecastsData= await getFetchData('forecast');
    const timeTaken='12:00:00';
    const todayDate=new Date().toISOString().split('T')[0];
    forecastsData.list.forEach(forecastWeather=>{
        if(forecastWeather.dt_txt.inlcudes(timeTaken) && !forecastWeather.dt_txt.inlcudes(todayDate)){
            updateForecastItems(forecastWeather);


        }
    })

}
function updateForecastItems(weatherData){

}
function getCurrentDate(){
    const currentDate=new Date();
    const options={
        weekday:'short',
        day:'2-digit',
        month:'short'
    }
    return currentDate.toLocaleDateString('en-GB',options);

}
