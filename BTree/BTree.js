var input = require('./input'),
  BTree = {};

/* GOTCHA: when using new constructor call to New_Node, 'this' is not BTree */
BTree.newNode = function New_Node (DEGREE) {
  this.leaf = true;
  this.total_keys = 0;

  this.keys = [];
  this.children = [];
  /* GOTCHA: used this.DEGREE, this here points to New_Node and not BTree */
  for (var i = 0; i < 2 * DEGREE - 1; i++) {
	this.keys.push(0);
  }
}

BTree.setup = function setup () {
  this.DEGREE = 3;
  this.root = new this.newNode();
  this.inputKeys = [8, 1, 11, 5, 13, 7, 28, 37, 16, 12, 3, 15, 17, 27, 6, 9, 14, 43, 2, 4, 20, 22];
  //await input.createInput();
  /* GOTCHA: If forEach callback is not bound with the scope of BTree, it references (verify) global object */
  this.inputKeys.forEach(function insertKey(key) { this.insertNode(key) }.bind(this));
}

BTree.splitNode = function split_node (node, i) {
  /* create node z (new split node) */
  var new_split_node = new this.newNode(this.DEGREE);

  /* node to be split (original split node) */
  var original_split_node = node.children[i - 1];

  /* populate leaf and total_keys attributes z */
  new_split_node.leaf = original_split_node.leaf;
  new_split_node.total_keys = this.DEGREE - 1;

  /* assign the largest t-1 keys of y (original split node) to z (new split node) */
  let j = 0;
  /* GOTCHA: indexing */
  /* while (j < this.DEGREE - 1 - 1) { */
  while (j < this.DEGREE - 1) {
	new_split_node.keys[j] = node.children[i - 1].keys[j + this.DEGREE];
	j++;
  }
  
  if (node.leaf) {
	/* assign corresponding (corresponding to largest t-1 keys of y) children of y to z */
	var k = 0;
	while (k < this.DEGREE - 1) {
	  new_split_node.children[k] = node.children[i - 1].children[k + this.DEGREE];
	  k++;
	}
  }

  /* adjust total_keys of y */
  original_split_node.total_keys = this.DEGREE - 1;
  /* GOTCHA: did not reset redundant keys of y */
  /* reset redundant keys of y */
  var n = 2 * this.DEGREE - 1;
  while (n > original_split_node.total_keys + 1) {
	original_split_node.keys[n - 1] = 0;
	n--;
  }


  /* adjust children of x to accomodate new node */
  var m = node.total_keys;
  /* GOTCHA: indexing */
  /* while (m < i + 1) { */
  /* GOTCHA: When changed i from 0 to 1 in splitNode(sp_node, 1) */
  /* while (m + 1 < i + 1) { */
  while (m + 1 < i) {
	node.children[m + 1] = node.children[m];
	m++;
  }
  node.children[m + 1] = new_split_node;

  /* adjust keys of x to accomodate the key that will be promoted */
  /* GOTCHA: taken l = 0 */
  var l = node.total_keys;
  /* GOTCHA:
   * while (original_split_node.keys[l] < node.keys[l]) {
   */
  while (l >= 1 && original_split_node.keys[this.DEGREE - 1] < node.keys[l - 1]) {
	node.keys[l + 1] = node.keys[l];
	/* GOTCHA: */
	/* node.keys[l + 1] = node.keys[l]; */
	node.keys[l] = node.keys[l - 1];
	l--;
  }
  /* promote median key from y to x */
  node.keys[l] = original_split_node.keys[this.DEGREE - 1];
  /* reset y key that got promoted */
  original_split_node.keys[this.DEGREE - 1] = 0;

  /* GOTCHA: forgot to increase key count of node */
  node.total_keys++;
}

BTree.insertNonfull = function insert_nonfull (sp_node, key) {
  let i = sp_node.total_keys;
  if (sp_node.leaf) {
	/* zero-index GOTCHA */
	/* while (sp_node.total_keys >= 1 && key < sp_node.keys[i]) { */
	while (sp_node.total_keys >= 1 && key < sp_node.keys[i - 1]) {
	  /* sp_node.keys[i + 1] = sp_node.keys[i]; */
	  sp_node.keys[i] = sp_node.keys[i - 1];
	  i--;
	}
	sp_node.keys[i] = key;
	sp_node.total_keys++;
  } else {
	/* GOTCHA: index error */
	//while (sp_node.total_keys >= 1 && key < sp_node.keys[i]) {
	while (sp_node.total_keys >= 1 && key < sp_node.keys[i - 1]) {
	  i = i - 1;
	}
	i = i + 1;

	if (sp_node.children[i - 1].total_keys === 2 * this.DEGREE - 1) {
	  this.splitNode(sp_node, i);

	  /* GOTCHA: indexing error and comparison operator wrong */
	  //while (key < sp_node.keys[i]) {
	  while (key > sp_node.keys[i - 1]) {
		i = i + 1;
	  }
	}

	/* GOTCHA: Pointers to Children of a node is an array, indexed from 0 */
	this.insertNonfull(sp_node.children[i - 1], key);
  }
}

BTree.insertNode = function insert_node (key) {
  var node = new this.newNode(this.DEGREE);
  node.leaf = this.root.leaf;
  var j = 0;
  while (j < this.root.total_keys) {
	node.keys[j] = this.root.keys[j];
	j++;
  }
  node.children = this.root.children;
  node.total_keys = this.root.total_keys;

  if (node.total_keys === 2 * this.DEGREE - 1) {
	///* GOTCHA: Did not make sp_node the new root */
	///* var sp_node = new this.newNode(); */
	//var sp_node = this.root;
	//sp_node.leaf = false;
	//var k = 0;
	//while (k < this.root.total_keys) {
	//  sp_node.keys[k] = 0;
	//  k++;
	//}
	//sp_node.total_keys = 0;
	//sp_node.children[0] = node;
	///* GOTCHA: */
	///* this.splitNode(sp_node, 0); */
	//this.splitNode(sp_node, 1);
	//this.insertNonfull(sp_node, key);

	this.root = sp_node;
	sp_node.leaf = false;
	var k = 0;
	while (k < this.root.total_keys) {
	  sp_node.keys[k] = 0;
	  k++;
	}
	sp_node.total_keys = 0;
	sp_node.children[0] = node;
	/* GOTCHA: */
	/* this.splitNode(sp_node, 0); */
	this.splitNode(sp_node, 1);
	this.insertNonfull(sp_node, key);
  } else {
	this.insertNonfull(this.root, key);
	/* GOTCHA: root not updated after insert */
  }
}

BTree.setup();
