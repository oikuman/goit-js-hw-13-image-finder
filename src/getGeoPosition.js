import PNotify from '../node_modules/pnotify/dist/es/PNotify.js';
import PNotifyButtons from '../node_modules/pnotify/dist/es/PNotifyButtons.js';

export default function() {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          let coords = `${position.coords.latitude.toFixed(
            4,
          )},${position.coords.longitude.toFixed(4)}`;

          resolve(coords);
        },
        error => {
          PNotify.info({
            title: 'Geolocation is not available',
            text: 'Use search by city name',
          });
          reject(error.code);
        },
        { maximumAge: 1800000 },
      );
    }
  });
}
