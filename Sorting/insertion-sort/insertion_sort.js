'use strict';

var stdIn = require('../../input');

var insertionSort = Object.create(stdIn);

insertionSort.init = async function init() {
  this.inputArr = await this.input();
  //console.time('sortBySwap');
  //this.sortBySwap();
  //console.timeEnd('sortBySwap');
  //return console.log(this.inputArr);
  console.time('sortBySwap1');
  this.sortBySwap1();
  console.timeEnd('sortBySwap1');
  return console.log(this.inputArr);
}

insertionSort.input = async function input() {
  return await this.createInputArr();
}

insertionSort.sortBySwap = function sortBySwap() {
  let key = 2;
  for (let i = key; i < this.inputArr.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      // Swap the unsorted selected element with element on its 
      // left, till its correct position into sorted sequence.
      if (+this.inputArr[i] < +this.inputArr[j]) {
        const temp = this.inputArr[i];
        this.inputArr[i] = this.inputArr[j];
        this.inputArr[j] = temp;
        i -= 1;
      }
    }
    key += 1;
  }
};

// CLRS code
insertionSort.sortBySwap1 = function sortBySwap1() {
  for (let j = 1; j < this.inputArr.length; j++) {
    // Select the first unsorted element.
    let key = this.inputArr[j];
    let i = j - 1;
    // Swap other elements to the right to create the correct
    // position and shifht the unsorted element.
    // Insert A[j]  into the sorted sequence A[1..j-1].
    while (i > 0 && this.inputArr[i] > key) {
      this.inputArr[i + 1] = this.inputArr[i];
      i--;
    }
    // Place the selected element at its correct position.
    this.inputArr[i + 1] = key;
  }
}

insertionSort.init();
