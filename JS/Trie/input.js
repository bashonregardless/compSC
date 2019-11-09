var rl = require('readline');

var line_reader = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

module.exports = {
  prompt: function prompt (question) {
	return new Promise (resolve => {
	  rl.setPrompt(question);
	  rl.prompt();
	  rl.once('line', resolve);
	});
  },

  createInput: async function create_input () {
	return await this.prompt("Enter word to translate > ");
  }
}
