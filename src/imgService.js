import card from './card.hbs';
import refs from './refs.js';

export default {
  draw(data) {
    const obj = { arr: data };
    const buildList = obj => card(obj);
    const listHTML = buildList(obj);
    refs.list.insertAdjacentHTML('beforeend', listHTML);
  },

  clean() {
    refs.list.innerHTML = '';
  },
};
