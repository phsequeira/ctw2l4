require('dotenv').config();

const fakeRequest = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {
  test('returns the current weather in salem or', async() => {
    const expectation =
      {
        'forecast': 'Clear sky',
        'tempature': 53.8,
        'time': 'Thu Apr 01 2021',
      };
    
    const data = await fakeRequest(app)
      .get('/weather/now?city=salem&state=or')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body[0]).toEqual(expectation);
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
    
    const data = await fakeRequest(app)
      .get('/weather/7Days?city=salem&state=or')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });
});
