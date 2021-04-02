/* eslint-disable no-undef */
const city = document.getElementById('city');
const state = document.getElementById('state');
const nowButton = document.getElementById('nowButton');
const sevenButton = document.getElementById('sevenButton');
const nowDiv = document.getElementById('nowDiv');
const sevenDiv = document.getElementById('sevenDiv');
const reset = document.getElementById('reset');

const nDiv = document.createElement('div');
const nowTime = document.createElement('p');
const nowForecast = document.createElement('p');
const nowTemp = document.createElement('p');

nowButton.addEventListener('click', () => {

  if(nowTime.length > 1) {
    nDiv.remove();
  }
  const cityText = city.value;
  const stateText = state.value;
  
  const site = `https://immense-citadel-01293.herokuapp.com/weather/now?city=${cityText}&state=${stateText}`;

  const nowPromise = fetch(site);
  nowPromise
    .then(data => data.json())
    .then(data => {
      data.forEach((item) => {
       
        nDiv.className = 'Div';
        nowTime.textContent = item.time;
        nowForecast.textContent = 'Forecast: ' + item.forecast;
        nowTemp.textContent = 'Current Temp: ' + item.tempature;

        nDiv.append(nowTime, nowForecast, nowTemp);
        nowDiv.append(nDiv);
        
      });
    })
    .catch((err) => {
    });
    
});

sevenButton.addEventListener('click', () => {

  
  const cityText = city.value;
  const stateText = state.value;

  const site = `https://immense-citadel-01293.herokuapp.com/weather/7Days?city=${cityText}&state=${stateText}`;
  const sevenPromise = fetch(site);
  sevenPromise
    .then(data => data.json())
    .then(data => {
      data.forEach((item) => {
        const sDiv = document.createElement('div');
        const sevenTime = document.createElement('p');
        const sevenFore = document.createElement('p');
        const sevenTemp = document.createElement('p');

        sDiv.className = 'Div';

        sevenTime.textContent = item.time;
        sevenFore.textContent = 'Forecast: ' + item.forecast;
        sevenTemp.textContent = 'Average Temp: ' + item.tempature;
        
        sDiv.append(sevenTime, sevenFore, sevenTemp);
        sevenDiv.append(sDiv);
      });     
    });
});
 
reset.addEventListener('click', () => { window.location.reload(); });