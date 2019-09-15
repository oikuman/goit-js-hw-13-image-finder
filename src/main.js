'use strict';
import axios from 'axios';

import apiService from './apiService.js';
import imgService from './imgService.js';
import refs from './refs.js';

console.log(apiService.api_key);


const submitHandler = event => {
  event.preventDefault();
  const input = event.target.querySelector('input[name="query"]').value;
  apiService.changeWord(input);
  apiService.returnData().then(data => {
    imgService.clean();
    imgService.draw(data);

    window.scrollTo({
      top: refs.list.scrollHeight,
      behavior: 'smooth'
    });
  });
};

const loadMoreHandler = () => {
  apiService.nextPage();
  apiService.returnData().then(data => {
    imgService.draw(data);
    window.scrollTo({
      top: refs.list.scrollHeight,
      behavior: 'smooth'
    });
  });
};

refs.form.addEventListener('submit', submitHandler);
refs.btn.addEventListener('click', loadMoreHandler);
