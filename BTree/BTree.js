var input = require('./input'),
  BTree = {};

BTree.newNode = function new_node () {
  this.leaf = true;
  this.total_keys = 0;

  this.keys = [];
  this.children = [];
}

BTree.setup = async function setup () {
  this.DEGREE = 3;
  this.root = {};
  this.inputKeys = [8, 1, 11, 5, 13, 7, 28, 37, 16, 12, 3, 15, 17, 27, 6, 9, 14, 43, 2, 4, 20, 22, 10];
  //await input.createInput();
  this.inputKeys.forEach(function insertKey(key) { insertNode(this.root, key) });
}

BTree.splitNode = function split_node (node, i) {
  /* create node z (new split node) */
  var new_split_node = this.newNode();

  /* node to be split (original split node) */
  var original_split_node = node.children[i];

  /* populate z attributes - leaf and total_keys */
  new_split_node.leaf = original_split_node.leaf;
  new_split_node.total_keys = this.DEGREE - 1;

  /* assign the largest t-1 keys of y (original split node) to z (new split node) */
  let j = 0;
  while (j < DEGREE - 1 - 1) {
	new_split_node.keys[j] = node.children[i].keys[j + this.DEGREE];
	j++;
  }
  
  if (node.leaf) {
	/* assign corresponding (corresponding to largest t-1 keys of y) children of y to z */
	var k = 0;
	while (k < this.DEGREE - 1) {
	  new_split_node.children[k] = node.children[i].children[k + this.DEGREE];
	  k++;
	}
  }

  /* adjust total_keys of y */
  original_split_node.total_keys = t - 1;


  /* adjust children of x to accomodate new node */
  var m = node.total_keys;
  while (m < i + 1) {
	node.children[m] = node.children[m + 1];
	m++;
  }
  node.children[l + 1] = new_split_node;

  var l = 0;
  while (key < original_split_node.keys[l]) {
	node.keys[l + 1] = node.keys[l];
	l++;
  }
  /* promote median key from y to x */
  node.keys[l] = original_split_node.keys[this.DEGREE - 1];
  /* reset y key that got promoted */
  original_split_node.keys[this.DEGREE - 1] = null;
}

BTree.insertNonfull = function insert_nonfull (sp_node, key) {
  let i = sp_node->total_keys;
  if (sp_node.leaf) {
	while (sp_node.total_keys >= 1 && key < sp_node.keys[i]) {
	  sp_node.keys[i + 1] = sp_node.keys[i];
	  i++;
	}
	sp_node.keys[i] = key;
	sp_node.total_keys++;
  } else {
	while (sp_node.total_keys >= 1 && key < sp_node.keys[i]) {
	  i = i - 1;
	}
	i = i + 1;

	if (sp_node.children[i].total_keys == 2 * this.DEGREE - 1) {
	  this.splitNode(sp_node, i);

	  while (key < sp_node.keys[i]) {
		i = i + 1;
	  }
	}

	insertNonfull(sp_node.children[i], key);
  }
}

BTree.insertNode = function insert_node () {
  var node = this.root;

  if (node.total_keys === 2 * DEGREE - 1) {
	var sp_node = newNode();
	sp_node.leaf = false;
	sp_node[0] = node;
	this.splitNode(sp_node, 0);
	this.insertNonfull(sp_node, key);
  } else {
	this.insertNonfull(sp_node, key);
  }
}

BTree.setup();
