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

  createInputNode: async function createInputNode() {
    return {
      position: await this.prompt("Position? start(s), end(e), position(integer) > "),
      value: await this.prompt("Value? > "),
    };
  },

  inputRemoveKey: async function inputRemoveKey() {
    return await this.prompt("Remove Key? > ");
  },

  requestProcedure: async function requestProcedure() {
    const procedure = await this.prompt("Procedure? insert(i), delete(d) > ");

    if (procedure === "i") {
      return {
        procedure,
        node: await this.createInputNode(),
      }
    }
    
    if (procedure === "d") {
      return {
        procedure,
        node: await this.inputRemoveKey(),
      }
    }
  }
}
