var fs = require('fs'),
  rl = require('readline');

var line_reader = rl.createInterface({
  input: fs.createReadStream(process.argv[2])
})

var Trie = {};

Trie.setup = function setup() {
  var root = null;
  this.loadDictionary();
}

Trie.newNode = function new_node() {
}

const DELIMS = "\t";

Trie.loadDictionary = function load_dictionary() {
  let icount = 0;

  line_reader.on('line', function (line) {
	/* Verify this: line with trailing newline stripped is passed to cb */
	if (line.length === 0 || line.charAt(0) === '#') {
	  return; /* ignore comment/empty lines */
	}

	/* Verify if logic below is as per the requirement*/

	/* seperate word and translation */
	const word = line.split(DELIMS)[0];
	if (!word) {
	  return; /* no word in line */
	}
	const translation = line.split(DELIMS)[1];

	/* add word to trie */
	if (Trie.addWord(word, translation))
	  icount++;
  })
}

Trie.addWord = function add_word (word, translation) {

}

Trie.setup();

