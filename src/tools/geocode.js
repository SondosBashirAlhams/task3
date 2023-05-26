const request = require('request');

const geocode = (address) => {
  return new Promise((resolve, reject) => {
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZmFyYWgxMjMiLCJhIjoiY2tpb3ZrNnE4MDB0cjJ0cDlzZXZ5eHQ5dSJ9.F6mgRF14yRJ6WN9JqtpWtw';

    request({ url: geocodeUrl, json: true }, (error, response) => {
      if (error) {
        reject(new Error('Unable to connect to geocode service'));
      } else if (response.body.message) {
        reject(new Error(response.body.message));
      } else if (response.body.features.length === 0) {
        reject(new Error('Invalid search. Please provide a valid location.'));
      } else {
        const location = response.body.features[0];
        resolve({
          place_name: location.place_name,
          latitude: location.center[1],
          longitude: location.center[0]
        });
      }
    });
  });
};

module.exports = geocode