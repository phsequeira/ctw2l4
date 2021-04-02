const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const request = require('superagent');

const { formattedWeather } = require('./utils.js');

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging


app.get('test', (req, res) => {
  res.json('hi');
});

app.get('/weather/now', async(req, res) => {
  try {
    
    const city = req.query.city;
    const state = req.query.state;
    

    const weatherData = await request.get(`https://api.weatherbit.io/v2.0/current?city=${city},${state}&key=${process.env.weatherkey}&units=I`);
    
    const formattedLink = formattedWeather(weatherData.body);

    res.json(formattedLink);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

// wanted to do weather per hour and weather for the next 7 days but the free verison of the api doesnt allow
/*app.get('/weather/hour', async(req, res) => {
  try {
    const city = req.query.city;
    const state = req.query.state;
    

    const weatherData = await request.get(`https://api.weatherbit.io/v2.0/current?city=${city},${state}&key=${process.env.weatherkey}&include=minutely&units=I`);
    
    const formattedLink = formattedWeather(weatherData.body);
    res.json(weatherData.body);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});*/

app.get('/weather/7Days', async(req, res) => {
  try {
    const city = req.query.city;
    const state = req.query.state;
    const country = req.query.country;

    const weatherData = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city},${state},${country}&key=${process.env.weatherkey}&units=I`);
    
    const formattedLink = formattedWeather(weatherData.body);
    res.json(formattedLink);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
