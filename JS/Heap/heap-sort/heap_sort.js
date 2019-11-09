"use strict";

const swap = require('../../Swaps/swap');
const stdIn = require('../../input');

var heap_sort = {
  setup: function(response) {
    this.inputArr = response;
    this.heap_size = response.length;
  },

  init(response) {
    this.build_max_heap();
    for (let i = this.inputArr.length - 1; i >= 0; i--) {
      const [a, b] = swap.withXOR(this.inputArr[0], this.inputArr[i]);
      this.inputArr[0] = a;
      this.inputArr[i] = b;
      this.heap_size--;
      this.max_heapify(0);
    }
    console.log(this.inputArr);
  },

  build_max_heap() {
    for (let i = Math.floor(this.inputArr.length / 2); i >= 0 ; i--) {
      this.max_heapify(i);
    }
  },

  max_heapify(i) {
    let l = this.left(i);
    let r = this.right(i);
    let largest;

    /* ZERO based index confusion, < condition and not <= as given in CLRS */
    // If left child is larger than root 
    if (l < this.heap_size && this.inputArr[l] > this.inputArr[i]) {
      largest = l;
    } else largest = i; // Initialize largest as root 

    // If right child is larger than largest so far 
    if (r < this.heap_size && this.inputArr[r] > this.inputArr[largest]) {
      largest = r;
    }

    // If largest is not root 
    if (largest != i) {
      const [a, b] = swap.withXOR(this.inputArr[i], this.inputArr[largest]);
      this.inputArr[i] = a;
      this.inputArr[largest] = b;
      this.max_heapify(largest);
    }
  },

  /* ZERO BASED INDEX CONFUSION
   * let l = 2 * i;
   * let r = 2 * i + 1;
   * gave the wrong result */
  left(i) { return 2 * i + 1 },

  right(i) { return 2 * i + 2 },
};

const input = stdIn.init([]);

input.then(function fulfilled(inputArr) {
  heap_sort.setup(inputArr);
  heap_sort.init(inputArr);
});
