require('dotenv').config();



const fakeRequest = require('supertest');
const app = require('../lib/app');


describe('app routes', () => {
  

  test('returns the current weather in salem or', async() => {

    const expectation =
      {
        'forecast': 'Clear sky',
        'tempature': 66.4,
        'time': 'Wed Mar 31 2021'
      };
    
    const data = await fakeRequest(app)
      .get('/weather/now?city=salem&state=or')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body[0]).toEqual(expectation);
  });

  test('returns the weather in salem or for the next 16 days', async() => {

    const expectation = [
      {
        'forecast': 'Few clouds',
        'tempature': 11.1,
        'time': 'Wed Mar 31 2021'
      },
      {
        'forecast': 'Broken clouds',
        'tempature': 10.5,
        'time': 'Thu Apr 01 2021'
      },
      {
        'forecast': 'Broken clouds',
        'tempature': 9,
        'time': 'Fri Apr 02 2021'
      },
      {
        'forecast': 'Overcast clouds',
        'tempature': 9.2,
        'time': 'Sat Apr 03 2021'
      },
      {
        'forecast': 'Light shower rain',
        'tempature': 7.9,
        'time': 'Sun Apr 04 2021'
      },
      {
        'forecast': 'Overcast clouds',
        'tempature': 7.5,
        'time': 'Mon Apr 05 2021'
      },
      {
        'forecast': 'Overcast clouds',
        'tempature': 6.8,
        'time': 'Tue Apr 06 2021'
      }
    ];
    
    const data = await fakeRequest(app)
      .get('/weather/16Days?city=salem&state=or')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });
});
