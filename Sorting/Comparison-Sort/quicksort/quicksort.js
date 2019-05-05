'use strict';

var stdIn = require('../../../input');

var quicksort = Object.create(stdIn);

quicksort.init = async function() { // async await - Why does this function have to await?
  this.inputArr = await this.input();
  /* ZERO based index confusion */
  // In CLRS: this.merge_sort(1, this.inputArr.length);
  this.quick_sort(0, this.inputArr.length - 1);
  console.log(this.inputArr);
}

quicksort.input = async function input() {
  return await this.createInputArr();
}

quicksort.swap = function swap(a, b) {
  a = a + b;
  b = a - b;
  a = a - b;
  return [a, b]
}

quicksort.partition = function partition(p, r) {
  let pivotVal = this.inputArr[r];
  let i = p - 1;
  
  /* ZERO based index confusion */
  // In CLRS: j = p  to  r - 1
  for (let j = p; j < r; j++) {
    if (this.inputArr[j] <= pivotVal) {
      i++;
      const [a, b] = this.swap(this.inputArr[j], this.inputArr[i])
      this.inputArr[j] = a;
      this.inputArr[i] = b;
    }
  }
  /* Swap the pivot element with the leftmost element greater than x,
   * thereby moving the pivot into its correct place in the partitioned 
   * array.*/
  const [x, y] = this.swap(this.inputArr[i + 1], this.inputArr[r]);
  this.inputArr[i + 1] = x;
  this.inputArr[r] = y;
  // Return the pivot’s new index. 
  return i + 1;
}

quicksort.quick_sort = function quick_sort(p, r) {
  if (p < r) {
    let pivot = this.partition(p, r);
    this.quick_sort(p, pivot - 1);
    this.quick_sort(pivot + 1, r);
  }
}

quicksort.init();
