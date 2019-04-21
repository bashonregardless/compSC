'use strict';

var stdIn = require('../../input');

var input = stdIn.init([]);

input.then((response) => {
    let key = 1;
    for (let i = key; i < response.length; i++) {
      for (let j = i - 1; j >= 0; j--) {
        if (+response[i] < +response[j]) {
          const temp = response[i];
          response[i] = response[j];
          response[j] = temp;
          i -= 1;
        }
      }
      key += 1;
    }
    return console.log(response);
  });

