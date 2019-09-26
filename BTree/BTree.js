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
  this.root = new this.newNode(this.DEGREE);
  /* to check for predecessor (case 2.a), uncomment 27.45, 27.46, 27.47, .
   * to check for successor (case 2.b), uncomment 27.89, .
   */
  this.inputKeys = [8, 1, 11, 5, 13, 7, 28, 37, 16, 12, 3, 15, 17, 27, 27.1, 27.66, 27.12, 27.15, 27.84, 27.44, /*27.45, 27.46, 27.47,*/ 27.53, 27.56, 27.88, /*27.89,*/ 27.23, 27.49, 27.31, 27.32, 27.33, 27.34, 27.35, 27.36, 27.37, 27.38, 27.41, 27.42, 27.43, 27.45, 27.46, 27.47, 27.52, 27.49, 27.62, 27.27, 27.25, 27.28, 27.99, 27.06, 27.39, 27.77, 27.61, 27.48, 27.93, 27.96, 27.2, 27.5, 27.3, 27.6, 6, 9, 14, 43, 2, 4, 20, 22, 25, 26];
  //await input.createInput();
  /* GOTCHA: If forEach callback is not bound with the scope of BTree, it references (verify) global object */
  this.inputKeys.forEach(function insertKey(key) { this.insertNode(key) }.bind(this));
  this.deleteNode(22);
}

/* BTree search takes as input a pointer to root node (not if available in scope) x
 * of a subtree and a key k to be searched for in that subtree.
 * The top level call is thus of the form search_node(T.root, k).
 * If k is in the BTree, search_node returns the ordered pair (y, i) consisting of 
 * node y and an index i such that y.key_suffix_i = i. Otherwise, the procedure returns
 * NIL.
 */
BTree.searchNode = function search_node (node, key) {
  var i = 1;

  /* find the smallest index i such that k <= x.key_suffix_i, or else set x.n to x.n + 1 */
  while (i <= node.total_keys && key > node.keys[i - 1]) {
	i++;
  }

  /* check to see if we have discovered the key, returning if we have */
  if ( i <= node.total_keys && key === node.keys[i - 1] ) {
	return [node, i];
  }

  /* terminate the search unsuccesfully ( if x is a leaf) */
  else if (node.leaf) {
	return;
  }

  /* recurse to search appropriate subtree of x */
	/* if return keyword is not used, 
	 * TypeError: this.searchNode is not a function or its return value is not iterable
	 */
  else return this.searchNode(node.children[i - 1], key);
}

/* Search for a key in child while in parent */
BTree.searchNodeInParent = function search_node_in_parent (node, key) {
  /* child index */
  var i = 1;

  while (i <= node.total_keys) {
	/* look to see if own key is matched first */
	if ( key === node.keys[i - 1] ) {
	  return [node, 0, i];
	} else if (key > node.keys[i - 1]) {
	  i++;
	} else {
	  break;
	}
  }

  var child = node.children[i - 1];
  var j = 1;
  while (j <= child.total_keys && key > child.keys[j - 1]) {
	j++;
  }

  if ( j <= child.total_keys && key === child.keys[j - 1]) {
	return [node, i , j];
  }

  else if (child.leaf) {
	return;
  }

  else return this.searchNodeInParent(child, key);
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
	/* GOTCHA:
	 * children idexed from 0
	 */
	new_split_node.keys[j] = node.children[i - 1].keys[j + this.DEGREE];
	j++;
  }
  
  /* GOTCHA: original_split_node and not node */
  /* if (node.leaf) { */
  if (!original_split_node.leaf) {
	/* assign corresponding (corresponding to largest t-1 keys of y) children of y to z */
	var k = 0;
	/* GOTCHA: indexing error */
	/* while (k <= this.DEGREE - 1) { */
	while (k <= this.DEGREE - 1) {
	  /* GOTCHA: children indexed from 0 */
	  new_split_node.children[k] = node.children[i - 1].children[k + this.DEGREE];
	  /* TO-DO:
	   * implement removal of elements from array in a better way.
	   * current : null-ifying redundant elements
	   */
	  original_split_node.children[k + this.DEGREE] = null;
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
  var m = node.total_keys + 1;
  /* GOTCHA: indexing */
  /* while (m < i + 1) { */
  /* GOTCHA: When changed i from 0 to 1 in splitNode(sp_node, 1) */
  /* while (m + 1 < i + 1) { */
  while (m > i) {
	node.children[m] = node.children[m - 1];
	m--;
  }
  node.children[m] = new_split_node;

  /* adjust keys of x to accomodate the key that will be promoted */
  /* GOTCHA: taken l = 0 */
  var l = node.total_keys;
  /* GOTCHA:
   * while (original_split_node.keys[l] < node.keys[l]) {
   */
  while (l >= 1 && original_split_node.keys[this.DEGREE - 1] < node.keys[l - 1]) {
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
	  /* GOTCHA: no check for comparison to terminate at correct index */
	  /* while (key > sp_node.keys[i - 1]) { */
	  while (i <= sp_node.total_keys && key > sp_node.keys[i - 1]) {
		i = i + 1;
	  }
	}

	/* GOTCHA: Pointers to Children of a node is an array, indexed from 0 */
	this.insertNonfull(sp_node.children[i - 1], key);
  }
}

BTree.insertNode = function insert_node (key) {
  var node = this.root;

  if (node.total_keys === 2 * this.DEGREE - 1) {
	var sp_node = new this.newNode(this.DEGREE); 
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

BTree.mergeNode = function merge_node () {

}

/* GOTCHA: called like this
 * BTree.findPredecessor = function find_predecessor (node, i) { 
 * This needs adjustment of arg i after first recursive call. 
 */
BTree.findPredecessor = function find_predecessor (node) {
  if (node.total_keys > this.DEGREE - 1 && !node.leaf) {
	/* i - 1, since we are searching for predecessor */
	/* GOTCHA: if return keyword is not used, return from recursive call is undefined*/
	/* GOTCHA: return this.findPredecessor(node.children[node.children[i - 1], i);
	 * Now arg node.children[i -  1] moved to intital call to find_predecessor in delete_node
	 */
	return this.findPredecessor(node.children[node.total_keys]);
  } else {
	var predecessor = node.keys[node.total_keys - 1];
	node.keys[node.total_keys - 1] = null;
	return predecessor;
  }
}

BTree.findSuccessor = function find_successor (node) {
  if (node.total_keys > this.DEGREE - 1 && !node.leaf) {
	return this.findSuccessor(node.children[0]);
  } else {
	var successor = node.keys[node.total_keys - 1];
	node.keys[node.total_keys - 1] = null;
	return successor;
  }
}

BTree.deleteNode = function delete_node (key) {
  /* uncomment to test internal node cases */
  // var [node, i] = this.searchNode(this.root, 27.53);
  var [node, child_idx, child_key_idx] = this.searchNodeInParent(this.root, 27.49 , 1);

  /* If node is an internal node (not a leaf) */
  /* TO-DO: If the node to be deleted is somewhere not at the end, then 
	* adjust the keys index accordingly */
  if (!node.leaf) {

	/* find the predecessor of k.
	 * Predecessor is found by recursively searching for the right most key.
	 */
	if (node.children[i - 1].total_keys > this.DEGREE - 1) {
	  /* GOTCHA: Tried to implement findPredecessor like
	   * var predecessor = this.findPredecessor(node, i);
	   */
	  var predecessor = this.findPredecessor(node.children[i - 1]);
	  node.keys[i - 1] = predecessor;
	}
	
	/* find the successor of k.
	 * Successor are found by recursively searching for the left most node.
	 */
	else if (node.children[i].total_keys > this.DEGREE - 1) {
	  var successor = this.findSuccessor(node.children[i]);
	  node.keys[i- 1] = successor;
	}

	/* (case 2.c) merge nodes */
	else {
	  /* copy key to be deleled in y */
	  node.children[i - 1].keys[this.DEGREE - 1] = node.keys[i - 1];

	  /* node x loses key */
	  node.keys[i - 1] = 0;

	  /* decrease key count of x */
	  node.total_keys = node.total_keys - 1;

	  /* copy all the keys from z to y */
	  var j = 0;
	  while (j < this.DEGREE - 1) {
		node.children[i - 1].keys[j + this.DEGREE] = node.children[i].keys[j];
		j++;
	  }
	  /* adjust (increment) y key count */
	  node.children[i - 1].total_keys = 2 * this.DEGREE - 1;

	  /* copy all children of z to y */
	  var k = 0;
	  while (k <= this.DEGREE - 1) {
		node.children[i - 1].children[k + this.DEGREE] = node.children[i].children[k];
		k++;
	  }
	  /* free z */
	  node.children[i] = null;

	  this.deleteNode(27.53);
	}
  } else {
	/* (case 3.a) immediate sibling with at least t keys */
	debugger;
  }
}

BTree.setup();
