'use strict';

import fetchWeather from './fetchWeather.js';
import getGeoPosition from './getGeoPosition.js';
import { log } from 'util';

const refs = {
  form: document.querySelector('#search-form'),
  section: document.querySelector('#weather'),
  icon: document.querySelector('img.icon'),
  location: document.querySelector('span[data-field="location"]'),
  temperature: document.querySelector('span[data-field="temp"]'),
  humidity: document.querySelector('span[data-field="humidity"]'),
  wind: document.querySelector('span[data-field="wind"]'),
  conditions: document.querySelector('span[data-field="conditions"]'),
};

const showWeather = weather => {
  refs.icon.setAttribute('src', weather.icon);
  refs.icon.setAttribute('alt', weather.condition);
  refs.location.textContent = weather.location;
  refs.temperature.textContent = `${weather.temp}℃`;
  refs.humidity.textContent = `${weather.humidity}%`;
  refs.wind.textContent = `${weather.wind}kph`;
  refs.conditions.textContent = weather.condition;
  refs.section.classList.remove('is-hidden');
};

getGeoPosition()
  .then(coords => {
    fetchWeather(coords)
      .then(weather => {
        showWeather(weather);
      })
      .catch(error => console.log(error));
  })
  .catch(error => console.log(`error code: ${error}`));

const handleFormSubmit = event => {
  event.preventDefault();
  let location = event.target.querySelector('input[name="city"]').value;

  if (location !== '') {
    fetchWeather(location)
      .then(weather => {
        showWeather(weather);
      })
      .catch(error => console.log(error));
  }
};

refs.form.addEventListener('submit', handleFormSubmit);
