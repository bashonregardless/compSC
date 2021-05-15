'use strict'

//const stdIn = require('../../input');
const max_heapify = require('./max_heapify');

//var input = stdIn.init([]);

module.exports = {
  init(response) {
    /* ZERO BASED INDEX CONFUSION 
     * for (let i = Math.floor(response.length / 2) - 1; i >= 0 ; i--) {
     * gave wrong result.[ 16, 14, 9, 10, 8, 1, 4, 2, 3, 7 ] */

    for (let i = Math.floor(response.length / 2); i >= 0 ; i--) {
      max_heapify(response, i);
    }
  },

  print() {
    console.log(response);
  }
}
