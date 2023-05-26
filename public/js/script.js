let form = document.getElementById('form1');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  weatherFunction();
  form.reset();
});

const errorF = document.getElementById('error');
const locationF = document.getElementById('location');
const forecastF = document.getElementById('forecast');
const latitudeF = document.getElementById('latitude');
const longitudeF = document.getElementById('longitude');

let weatherFunction = async () => {
  try {
    const address = document.getElementById('address').value;
    const res = await fetch('http://localhost:3000/weather?address=' + address);
    const data = await res.json();
    console.log(data);
    if (data.error) {
      errorF.innerText = data.error;
      locationF.innerText = "";
      forecastF.innerText = "";
      latitudeF.innerText = "";
      longitudeF.innerText = "";
    } else {
      locationF.innerText = "Location: " + data.location;
      forecastF.innerText = "Forecast: " + data.forecast;
      errorF.innerText = "";
      latitudeF.innerText =  "latitude: " + data.latitude;
      longitudeF.innerText =  "longitude: " + data.longitude;
    }
  } catch (error) {
    console.log(error);
  }
};