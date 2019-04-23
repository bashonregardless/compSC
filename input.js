'use strict';

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = {
  prompt: function prompt(question) {
    return new Promise((resolve) => {
      rl.setPrompt(question);
      rl.prompt();
      rl.once("line", resolve);
    });
  },

  createInputArr: async function createInputArr() {
    let inputArr = [];
    while (true) {
      const resp = await this.prompt("Element? yes(integer), done(n) > ");
      if (resp === "n") {
        break;
      } else {
        // check if a variable is an integer
        /* pre-ECMAScript-6 solution (which is also sufficiently robust to
          * return false even if a non-numeric value such as a string or 
          * null is passed to the function) would be the following use of 
          * the bitwise XOR operator:
            function isInteger(x) { return (x ^ 0) === x; }
            -or-
            function isInteger(x) { return (typeof x === 'number') && (x % 1 === 0); }
          */
        /* ECMAscript 6 which introduces a new Number.isInteger() 
         * Note: ("3" ^ 0) === "3" -> false
                 ("3" ^ 0) === 3 -> true */
        if ((resp ^ 0) === parseInt(resp, 10)) {
          inputArr.push(resp);
        } else {
          console.log("Response is not an integer");
        }
      };
    }
    return inputArr;
  }
}
