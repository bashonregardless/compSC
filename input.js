'use strict';

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = {
  init : async function(arr) {
    this.arr = arr;
    const pr = await this.userInputOn();
    return pr;
  },

  promptUpdater : function() {
    rl.setPrompt(`Insert ${this.arr.length}th array Element> `);
    rl.prompt();
  },

  userInputOn : function() {
    return new Promise((resolve, reject) =>  {
      this.promptUpdater();
      rl.on('line', (line) => {
        if(line === "close") resolve(this.arr);
        else {
          this.arr.push(+line);
          this.promptUpdater();
        }
      });
    });
  },
}
