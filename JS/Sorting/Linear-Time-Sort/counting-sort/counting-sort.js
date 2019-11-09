'use strict';

module.exports = { 
  counting_sort : function counting_sort(input_arr) {
    this.aux_arr = [];
    this.output_arr = [];

    /* design-pattern: pre-cache length.
     * This way you retrieve the value of length only once and
     * use it during the whole loop.
     * Note that when you explicitly intend to modify the 
     * collection in the loop (for example, by adding more DOM elements),
     * you’d probably like the length to be updated and not constant. */

    /* substitute i++ with either one of these expressions:
     * i = i + 1 
     * i += 1
     * reason being that ++ and -- promote “excessive trickiness.” */
    for (let i = 0, len = input_arr.length; i < len; i++) {
      // Place count 1 in aux arr if position is undefined
      if (!this.aux_arr[input_arr[i]])
        this.aux_arr[input_arr[i]] = 1;
      // Increment count of element in aux array
      else this.aux_arr[input_arr[i]] += 1; 
    } 

    this.aux_arr.forEach(function(val, idx) {
      while(this.aux_arr[idx]) {
        this.output_arr.push(idx);
        this.aux_arr[idx] -= 1;
      }
    }.bind(this));

    return this.output_arr;
  },

  radix_sub_routine_counting_sort : function radix_sub_routine_counting_sort(input_arr, place) {
    this.aux_arr = []; // C[]
    this.output_arr = []; // B[]

    /* design-pattern: pre-cache length.
     * This way you retrieve the value of length only once and
     * use it during the whole loop.
     * Note that when you explicitly intend to modify the 
     * collection in the loop (for example, by adding more DOM elements),
     * you’d probably like the length to be updated and not constant. */

    /* substitute i++ with either one of these expressions:
     * i = i + 1 
     * i += 1
     * reason being that ++ and -- promote “excessive trickiness.” */
    this.aux_arr = Array.apply(null, new Array(10)).map(function () { return 0 }); 
    // also, [...Array(10).keys()].map(function () { return 0 });
    
    for (let i = 0, len = input_arr.length; i < len; i++) {
      // Increment count of element in aux array
      this.aux_arr[this.getRadixDigit(input_arr[i], place)] += 1; 
    } 
    // C[i] 􏰀ow contains the number of elements equal to i.

    // incrementally update tally of index value
    // [2, 0, 1, 4, 0, 0, 3, 3, 0, 7] --> [2, 2, 3, 7, 7, 7, 10, 13, 13, 20]
    for (let i = 1; i < 10; i++) {
      this.aux_arr[i] += this.aux_arr[i - 1];
    }
    // C[i] 􏰀ow contains the number of elements less than or equal to i.

    for (let i = input_arr.length - 1; i >= 0; i--) {
      this.output_arr[--this.aux_arr[this.getRadixDigit(input_arr[i], place)]] = input_arr[i];
    }

    this.output_arr.forEach((e, i) => {
      input_arr[i] = e
    });

    return this.output_arr;
  }
};
