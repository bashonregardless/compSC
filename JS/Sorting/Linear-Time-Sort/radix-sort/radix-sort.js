'use strict';

var stdIn = require('./radix-input');

var countingSort = require('../counting-sort/counting-sort');

var RadixSort = Object.create(countingSort);

RadixSort.setup = async function setup() {
  this.input = await stdIn.createInputArr();
  this.radix_arr = [];
}

/* procedure assumes that each element in the n-element array A
 * has d digits, where digit 1 is the lowest-order digit and 
 * digit d is the highest-order digit.  */
RadixSort.radixSort = async function radixSort() {
  await this.setup(); 
  // Place starts from LSD (least significant digit) at i = 0 (Zero based index adjustment),
  // i.e one's place at i = 0, ten's place at i = 1, 
  // hundered's at i = 2.
  for (let i = 0, len = this.input.digits; i < len; i++) {
    this.radix_arr = this.input.input_arr.map(function (each) {
      let place = i;
      while (place--) {
        each /= 10;
      }
      return Math.floor(each % 10);
    });
    console.log(this.radix_arr);
    const radix_sorted_arr = this.counting_sort(this.radix_arr);
    console.log('radix_sorted ', radix_sorted_arr);
  }
  console.dir(this.input.input_arr);
}

RadixSort.radixSort1 = async function radixSort1() {
  await this.setup(); 
  // Place starts from LSD (least significant digit) at i = 0 (Zero based index adjustment),
  // i.e one's place at i = 0, ten's place at i = 1, 
  // hundered's at i = 2.
  for (let i = 0, len = this.input.digits; i < len; i++) {
    this.radix_sub_routine_counting_sort(this.input.input_arr, i);
  }
 console.log('radix_sorted ', this.input.input_arr);
}

RadixSort.getRadixDigit = function getRadixDigit(number, place) {
  while (place--) {
    number /= 10;
  }
  return Math.floor(number % 10);
}

RadixSort.radixSort1();
