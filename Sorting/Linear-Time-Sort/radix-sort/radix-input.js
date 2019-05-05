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

  intValidation: function intValidation(val) {
    if ((val ^ 0) === parseInt(val, 10)) {
      return parseInt(val, 10);
    } else {
      console.log("Response is not an integer!");
      return false;
    }
  },

  createInputArr: async function createInputArr() {
    let input_arr = [];
    let digits;
    while (true) {
      // Singleton behaviour
      if (!digits) {
        digits = this.intValidation(await this.prompt("Digits? > "));
      } else {
        const resp = await this.prompt("Element? input(integer), done(n) > ");
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
          //if ((resp ^ 0) === parseInt(resp, 10)) {
          if (this.intValidation(resp)) {
            input_arr.push(+resp);
          }
        }
      }
    }
    return { digits, input_arr };
  }
}

