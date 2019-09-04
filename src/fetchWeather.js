import PNotify from '../node_modules/pnotify/dist/es/PNotify.js';
import PNotifyButtons from '../node_modules/pnotify/dist/es/PNotifyButtons.js';

export default function(location) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.apixu.com/v1/current.json?key=494f8b97550840a893864809192608&q=${location}`,
    )
      .then(response => {
        if (response.ok) return response.json();
      })
      .then(data => {
        const weather = {
          icon: `https:${data.current.condition.icon}`,
          location: location,
          temp: data.current.temp_c,
          humidity: data.current.humidity,
          wind: data.current.wind_kph,
          condition: data.current.condition.text,
        };
        resolve(weather);
      })
      .catch(error => {
        PNotify.info({
          title: 'Data not available',
          text: 'Come later',
        });
        reject(Error('request failed'));
      });
  });
}
