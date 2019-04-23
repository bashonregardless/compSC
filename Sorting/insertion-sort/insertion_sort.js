'use strict';

var stdIn = require('../../input');

var insertionSort = Object.create(stdIn);

insertionSort.init = async function init() {
  this.inputArr = await this.input();
  this.sortBySwap();
}

insertionSort.input = async function input() {
  return await this.createInputArr();
}

insertionSort.sortBySwap = function sortBySwap() {
  let key = 2;
  for (let i = key; i < this.inputArr.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (+this.inputArr[i] < +this.inputArr[j]) {
        const temp = this.inputArr[i];
        this.inputArr[i] = this.inputArr[j];
        this.inputArr[j] = temp;
        i -= 1;
      }
    }
    key += 1;
  }
  return console.log(this.inputArr);
};

insertionSort.init();
