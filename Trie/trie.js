var fs = require('fs'),
  rl = require('readline');

var line_reader = rl.createInterface({
  input: fs.createReadStream(process.argv[2])
})

var Trie = {};

Trie.setup = async function setup() {
  this.root = {};
  await this.loadDictionary();
  console.log(this.root);
}

Trie.newNode = function new_node() {
  var translation = null;
  var children = {};
}

const DELIMS = "\t";

Trie.loadDictionary = function load_dictionary() {
  return new Promise (resolve => {
	let icount = 0;

	line_reader.on('line', function (line) {
	  /* Verify this : line with trailing newline stripped is passed to cb */
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
	  if (Trie.addWord("", word, translation, this.root))
		icount++;
	}.bind(this)).on('close', resolve);
  })
}

/* Initially word is passed as "", entire word is restOfTheWord */
Trie.addWord = function add_word (word, restOfTheWord, translation, currWordObj) {

  if (restOfTheWord.length) {
	/* form key for the node on the spine */
	/* NOTE : The key is defined by the node's position in the tree:
	 * the key of its parent node + its index in that parent's pointer array of children */
	let keyWord = word + restOfTheWord.charAt(0);

	/* Check if word exist as a property in currWordObj */
	if (!Object.prototype.hasOwnProperty.call(currWordObj,keyWord)) {
	  /* Add word as a property */
	  currWordObj[keyWord] = {};
	}

	/* recurse till entire word length */
	if (restOfTheWord.substring(1).length) {
	  this.addWord(keyWord, restOfTheWord.substring(1), translation, currWordObj[keyWord]);
	} else {
	  /* found word, insert translation as key value */
	  currWordObj[keyWord] = translation;
	}
  }
}

Trie.lookupWord = function lookup_word () {
  if (restOfTheWord.length) {
	let keyWord = word + restOfTheWord.charAt(0);

	if (!Object.prototype.hasOwnProperty.call(currWordObj, keyWord)) {
	  return 0;
	}

	/* recurse till entire word length */
	if (restOfTheWord.substring(1).length) {
	  this.lookupWord(keyWord, restOfTheWord.substring(1), currWordObj[keyWord]);
	} else {
	  /* found word, insert translation as key value */
	  if (Object.keys(currWordObj)[0] === keyWord) {
		return currWordObj[keyWord];
	  } else return 0;
	}
  }
}

Trie.setup();

