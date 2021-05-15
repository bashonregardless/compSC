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
  }
}
