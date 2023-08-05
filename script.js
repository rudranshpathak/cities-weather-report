const API_KEY = '0a1221d6e72aa1d14b83834e032f853c';
const addCityButton = document.getElementById('addCity');
const cityInput = document.getElementById('cityInput');
const weatherCardsContainer = document.getElementById('weatherCards');
let cities = new Set();

addCityButton.addEventListener('click', async () => {
  const cityName = cityInput.value.trim();

  if (cityName && !cities.has(cityName)) {
    cities.add(cityName);
    await fetchWeatherData(cityName);
    cityInput.value = '';
  }
});

fetchWeatherButton.addEventListener('click', () => {
    cities.forEach(cityName => fetchWeatherData(cityName));
  });
  
  async function fetchWeatherData(cityName) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=0a1221d6e72aa1d14b83834e032f853c&units=metric`);
      const data = await response.json();
      createWeatherCard(data);
    } catch (error) {
      console.error(`Error fetching weather for London: Network not ok`);
    }
  }

function createWeatherCard(data) {
  const weatherCard = document.createElement('div');
  weatherCard.classList.add('weather-card');
  weatherCard.innerHTML = `
    <img src="${getWeatherIconURL(data.weather[0].main)}" alt="${data.weather[0].description}">
    <h3>${data.name}</h3>
    <p>Temperature: ${data.main.temp.toFixed(1)}°C</p>
    <p>Weather: ${data.weather[0].main}</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Pressure: ${data.main.pressure} hPa</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
  `;
  weatherCardsContainer.appendChild(weatherCard);
}

function sortWeatherCards() {
  const weatherCardElements = Array.from(document.querySelectorAll('.weather-card'));
  weatherCardElements.sort((a, b) => {
    const tempA = parseFloat(a.querySelector('p:nth-child(2)').textContent.split(':')[1]);
    const tempB = parseFloat(b.querySelector('p:nth-child(2)').textContent.split(':')[1]);
    return tempA - tempB;
  });

  weatherCardElements.forEach(element => weatherCardsContainer.appendChild(element));
}

function getWeatherIconURL(weatherCondition) {
  // Define your weather icon URLs here
  const iconMappings = {
    'Rain': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyeYAEG2NObDVvvQb87kAPVekt7IfGhOdqdbyS2mzyXw&s',
    'Clear': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtLVyuZjyvYjumLJLSLVeCuQf0uxiAjbNX5c-JGr10dA&s',
    'Clouds': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK2nJ62bSTVcRQylUwV9q6srWv7_nxMhu7F2SdPwuT&s',
    'Wind': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl-3jj02EfRpSAknxHNleNTEASVFHRd2QHd4sNj1uVdw&s'
    // Add more mappings as needed
  };
  return iconMappings[weatherCondition] || 'default-icon.png';
}
