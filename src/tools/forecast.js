const request = require('request');

const forecast = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    const forecastUrl = 'http://api.weatherstack.com/current?access_key=343d98b8c9bd50b1c56ea6b5fcea3532&query=' + latitude + ',' + longitude;

    request({ url: forecastUrl, json: true }, (error, response) => {
      if (error) {
        reject(new Error('Unable to connect to forecast service'));
      } else if (response.body.error) {
        reject(new Error(response.body.error.info));
      } else {
        const data = response.body.current;
        const description = data.weather_descriptions[0];
        const temperature = data.temperature;

        resolve({
          description: description,
          temperature: temperature
        });
      }
    });
  });
};

module.exports = forecast;