const swap = require('../../Swaps/swap');

module.exports = function max_heapify(response, i) {
  /* ZERO BASED INDEX CONFUSION
   * let l = 2 * i;
   * let r = 2 * i + 1;
   * gave the wrong result */
  let l = 2 * i + 1;
  let r = 2 * i + 2; 

  let largest;

  if (l <= response.length && response[l] > response[i]) {
    largest = l;
  } else largest = i;

  if (r <= response.length && response[r] > response[largest]) {
    largest = r;
  }

  if (largest != i) {
    const [a, b] = swap.withXOR(response[i], response[largest]);
    response[i] = a;
    response[largest] = b;
    max_heapify(response, largest);
  }
} 

