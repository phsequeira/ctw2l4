require('dotenv').config();
const  request  = require('superagent');

describe('app routes', () => {
  test('returns the current weather in salem or', async() => {
    const expectation =
      {
        'forecast': 'Clear sky',
        'tempature': 59.2,
        'time': 'Thu Apr 01 2021',
      };
    
    const weather = await request.get('https://immense-citadel-01293.herokuapp.com/weather/now?city=salem&state=or');

    expect(weather.body[0]).toEqual(expectation);
  });
  test('returns the weather in salem or for the next 7 days', async() => {

    const expectation = [
      {
        'forecast': 'Scattered clouds',
        'tempature': 51.4,
        'time': 'Thu Apr 01 2021'
      },
      {
        'forecast': 'Broken clouds',
        'tempature': 47.5,
        'time': 'Fri Apr 02 2021'
      },
      {
        'forecast': 'Overcast clouds',
        'tempature': 49.2,
        'time': 'Sat Apr 03 2021'
      },
      {
        'forecast': 'Moderate rain',
        'tempature': 41,
        'time': 'Sun Apr 04 2021'
      },
      {
        'forecast': 'Overcast clouds',
        'tempature': 40.3,
        'time': 'Mon Apr 05 2021'
      },
      {
        'forecast': 'Overcast clouds',
        'tempature': 41.6,
        'time': 'Tue Apr 06 2021'
      },
      {
        'forecast': 'Overcast clouds',
        'tempature': 43.6,
        'time': 'Wed Apr 07 2021'
      }
    ];
    
    const weather = await request.get('https://immense-citadel-01293.herokuapp.com/weather/7Days?city=salem&state=or');

    expect(weather.body).toEqual(expectation);
  });
});
