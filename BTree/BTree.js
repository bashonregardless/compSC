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
  //this.inputKeys = [8, 1, 11, 5, 13, 7, 28, 37, 16, 12, 3, 15, 17, 27, 27.1, 27.66, 27.12, 27.15, 27.84, 27.44, /*27.45, 27.46, 27.47,*/ 27.53, 27.56, 27.88, /*27.89,*/ 27.23, 27.49, 27.31, 27.32, 27.33, 27.34, 27.35, 27.36, 27.37, 27.38, 27.41, 27.42, 27.43, 27.45, 27.46, 27.47, 27.52, 27.49, 27.62, 27.27, 27.25, 27.28, 27.99, 27.06, 27.39, 27.77, 27.61, 27.48, 27.93, 27.96, 27.2, 27.5, 27.3, 27.6, 6, 9, 14, 43, 2, 4, 20, 22, 25, 26];
  this.inputKeys = [8, 1, 11, 5, 13, 7, 28, 16, 12, 3, 15, 17, 27, 6, 9, 14, 43, 2, 4, 20, 22, 25, 26]
  //await input.createInput();
  /* GOTCHA: If forEach callback is not bound with the scope of BTree, it references (verify) global object */
  this.inputKeys.forEach(function insertKey(key) { this.insertNode(key) }.bind(this));
  /* 27.99 : to verify 2a;
   * 27.28: to verify 2b;
   */
  this.root = this.deleteNodeSinglePass(this.root, 22);
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
	/* decrement total key count of node */
	node.total_keys = node.total_keys - 1;

	return predecessor;
  }
}

BTree.findSuccessor = function find_successor (node) {
  if (node.total_keys > this.DEGREE - 1 && !node.leaf) {
	return this.findSuccessor(node.children[0]);
  } else {
	var successor = node.keys[0];
	node.keys[0] = null;

	/* adjust the index of all the other keys in the node */
	var i = 0;
	while (i < node.total_keys) {
	  node.keys[i] = node.keys[i + 1];
	  i++;
	}
	node.keys[i] = 0;
	node.total_keys--;

	return successor;
  }
}

BTree.deleteNodeSinglePass = function (tree_node, key) {
  var node = tree_node;

  var child_idx = 1;
  while (child_idx <= node.total_keys && key > node.keys[child_idx - 1]) {
	child_idx++;
  }

  if (child_idx <= node.total_keys && key === node.keys[child_idx - 1]) {
	
	/* case 2.x: if the key is in node x and x is an internal node */

	/* TO-DO: If the node to be deleted is somewhere not at the end, then 
	 * adjust the keys index accordingly */
	if (!node.leaf && node.total_keys > this.DEGREE - 1) {
	  var child = node.children[child_idx - 1];
	  var child_sibling_left = node.children[child_idx - 2]
	  var child_sibling_right = node.children[child_idx]
	  var predecessor_child = node.children[child_idx - 1];
	  var successor_child = node.children[child_idx];

	  /* case 2.a */
	  /* find the predecessor of k.
	   * Predecessor is found by recursively searching for the right most key.
	   */
	  if (predecessor_child.total_keys > this.DEGREE - 1) {
		/* GOTCHA: Tried to implement findPredecessor like
		 * var predecessor = this.findPredecessor(child, i);
		 */
		var predecessor = this.findPredecessor(predecessor_child);
		node.keys[child_idx - 1] = predecessor;
	  }

	  /* case 2.b */
	  /* find the successor of k.
	   * Successor are found by recursively searching for the left most node.
	   */
	  else if (successor_child.total_keys > this.DEGREE - 1) {
		var successor = this.findSuccessor(successor_child);
		node.keys[child_idx- 1] = successor;
	  }

	  /* (case 2.c) merge nodes */
	  else {
		/* copy key to be deleled in y */
		predecessor_child.keys[this.DEGREE - 1] = child.keys[child_key_idx - 1];

		/* node x loses key */
		child.keys[child_key_idx - 1] = 0;

		/* decrease key count of x */
		child.total_keys = child.total_keys - 1;

		/* copy all the keys from z to y */
		var j = 0;
		while (j < this.DEGREE - 1) {
		  predecessor_child.keys[j + this.DEGREE] = successor_child.keys[j];
		  j++;
		}
		/* adjust (increment) y key count */
		predecessor_child.total_keys = 2 * this.DEGREE - 1;

		/* copy all children of z to y */
		var k = 0;
		while (k <= this.DEGREE - 1) {
		  predecessor_child.children[k + this.DEGREE] = successor_child.children[k];
		  k++;
		}
		/* free z */
		successor_child = null;

		this.deleteNode(27.99);
	  }
	}

	else {
	  /* case 1: Simple deletion from a leaf */
	  /* adjust positions of all the keys in this node */
	  var h = 0;
	  while (h < node.total_keys - child_idx) {
		node.keys[child_idx - 1 + h] = node.keys[child_idx + h];;
		h++;
	  }

	  /* reset last key */
	  node.keys[child_idx - 1 + h] = 0;

	  /* decrement key count */
	  node.total_keys = node.total_keys - 1;
	}
  }

  else {
	var child = node.children[child_idx - 1];
	var child_sibling_left = node.children[child_idx - 2]
	var child_sibling_right = node.children[child_idx]

	/* case 3.x */
	if ( child.total_keys === this.DEGREE - 1 ) {
	  /* case 3.a */
	  if ( child_sibling_left && child_sibling_left.total_keys > this.DEGREE - 1 ) {
		/* reset key in x.c_suffix_i that will be deleted */
		child.keys[child_idx - 1] = null;

		/* give x.c_suffix_i an extra key by moving a key from x down into x.c_suffix_i */
		child.keys[child_key_idx - 1] = parent.keys[child_idx - 2];

		/* move a key from x.c_suffix_i's left sibling up into x */
		parent.keys[child_idx - 2] = child_sibling_left.keys[child_sibling_left.total_keys - 1];

		/* reset key of left sibling */
		child_sibling_left.keys[child_sibling_left.total_keys - 1] = 0;
	  }

	  else if ( child_sibling_right && child_sibling_right.total_keys > this.DEGREE - 1 ) {
		/* reset key in x.c_suffix_i that will be deleted */
		child.keys[child_key_idx - 1] = null;

		/* give x.c_suffix_i an extra key by moving a key from x down into x.c_suffix_i */
		child.keys[child_key_idx - 1] = parent.keys[child_idx - 1];

		/* move a key from x.c_suffix_i's right sibling up into x */
		parent.keys[child_idx - 1] = child_sibling_right.keys[0];

		/* reset key of right sibling */
		child_sibling_right.keys[child_sibling_right.total_keys - 1] = 0;
	  }

	  /* case 3.b */
	  else {
		/* left sibling case */
		if ( child_sibling_left && child_sibling_left.total_keys === this.DEGREE - 1 ) {
		  /* copy all keys from child's left sibling to child */
		  var i = 0;
		  while (i < this.DEGREE - 1) {
			/* move all child keys to right most positions to create space for incoming keys */
			child.keys[child.total_keys + i + 1] = child.keys[i];
			/* copy key from child's left sibling to child */
			child.keys[i] = child_sibling_left.keys[i];
			i++;
		  }

		  /* copy parent key to child */
		  child.keys[child.total_keys] = node.keys[child_idx - 2];

		  /* remove node key and decrease it's key count */
		  node.keys[child_idx - 2] = 0;
		  node.total_keys = node.total_keys - 1;

		  var j = 0;
		  while (j <= this.DEGREE - 1) {
			/* move child's children to right most positions */
			child.children[child.total_keys + j + 1] = child.children[j];
			j++;
		  }

		  /* copy all child's left sibling children to child's children */
		  var k = 0;
		  while (k <= this.DEGREE - 1) {
			child.children[k] = child_sibling_left.children[k];
			k++;
		  }

		  /* increment key count of child */
		  child.total_keys = 2 * this.DEGREE - 1;

		  /* adjust position of child, replace child's left sibling with child and delete child at original pos */
		  node.children[child_idx - 2] = node.children[child_idx - 1];
		  node.children[child_idx - 1] = null;

		  /* if node key count becomes zero, replace it with the merged node */
		  if ( node.total_keys === 0 ) {
			this.deleteNodeSinglePass(node.children[child_idx - 2], key);
			return node.children[child_idx - 2];
		  } else {
			this.deleteNodeSinglePass(node.children[child_idx - 2], key);
			return node;
		  }
		}

		/* right sibling case */
		else if ( child_sibling_right && child_sibling_right.total_keys === this.DEGREE - 1 ) {
		  /* copy all keys from child's right sibling to child */
		  var i = 0;
		  while (i < this.DEGREE - 1) {
			/* copy key from child's right sibling to child */
			child.keys[child.total_keys + i + 1] = child_sibling_right.keys[i];
			i++;
		  }

		  /* copy parent key to child */
		  child.keys[child.total_keys] = node.keys[child_idx - 2];

		  /* remove node key and decrease it's key count */
		  node.keys[child_idx - 2] = 0;
		  node.total_keys = node.total_keys - 1;

		  /* copy all child's right sibling children to child's children */
		  var k = 0;
		  while (k <= this.DEGREE - 1) {
			child.children[child.total_keys + k + 1] = child_sibling_right.children[k];
			k++;
		  }

		  /* increment key count of child */
		  child.total_keys = 2 * this.DEGREE - 1;

		  /* adjust position of child, replace child's right sibling with child and delete child at original pos */
		  node.children[child_idx] = node.children[child_idx - 1];
		  node.children[child_idx - 1] = null;

		  /* if node key count becomes zero, replace it with the merged node */
		  if ( node.total_keys === 0 ) {
			this.deleteNodeSinglePass(node.children[child_idx - 1], key);
			return node.children[child_idx - 1];
		  } else {
			this.deleteNodeSinglePass(node.children[child_idx - 1], key);
			return node;
		  }
		}
	  }
	} 

	else {
	  this.deleteNodeSinglePass(child, key);
	  return tree_node;
	}
  }
}

BTree.deleteNode = function delete_node (key) {
  /* uncomment to test internal node cases */
  // var [node, i] = this.searchNode(this.root, 27.53);
  var [parent, child_idx, child_key_idx] = this.searchNodeInParent(this.root, 17 , 1);

  var child = parent.children[child_idx - 1];
  var child_sibling_left = parent.children[child_idx - 2]
  var child_sibling_right = parent.children[child_idx]

  var predecessor_grand_child = child.children[child_key_idx - 1];
  var successor_grand_child = child.children[child_key_idx];

  /* If node is an internal node (not a leaf) */
  /* TO-DO: If the node to be deleted is somewhere not at the end, then 
	* adjust the keys index accordingly */
  if (!child.leaf) {

	/* find the predecessor of k.
	 * Predecessor is found by recursively searching for the right most key.
	 */
	if (predecessor_grand_child.total_keys > this.DEGREE - 1) {
	  /* GOTCHA: Tried to implement findPredecessor like
	   * var predecessor = this.findPredecessor(child, i);
	   */
	  var predecessor = this.findPredecessor(predecessor_grand_child);
	  child.keys[child_key_idx - 1] = predecessor;
	}
	
	/* find the successor of k.
	 * Successor are found by recursively searching for the left most node.
	 */
	else if (successor_grand_child.total_keys > this.DEGREE - 1) {
	  var successor = this.findSuccessor(successor_grand_child);
	  child.keys[child_key_idx- 1] = successor;
	}

	/* (case 2.c) merge nodes */
	else {
	  /* copy key to be deleled in y */
	  predecessor_grand_child.keys[this.DEGREE - 1] = child.keys[child_key_idx - 1];

	  /* node x loses key */
	  child.keys[child_key_idx - 1] = 0;

	  /* decrease key count of x */
	  child.total_keys = child.total_keys - 1;

	  /* copy all the keys from z to y */
	  var j = 0;
	  while (j < this.DEGREE - 1) {
		predecessor_grand_child.keys[j + this.DEGREE] = successor_grand_child.keys[j];
		j++;
	  }
	  /* adjust (increment) y key count */
	  predecessor_grand_child.total_keys = 2 * this.DEGREE - 1;

	  /* copy all children of z to y */
	  var k = 0;
	  while (k <= this.DEGREE - 1) {
		predecessor_grand_child.children[k + this.DEGREE] = successor_grand_child.children[k];
		k++;
	  }
	  /* free z */
	  successor_grand_child = null;

	  this.deleteNode(27.53);
	}
  } else {
	/* (case 3.b) immediate sibling with at least t keys */
	if ( child.total_keys === this.DEGREE - 1) {
	  if ( child_sibling_left && child_sibling_left.total_keys > this.DEGREE - 1 ) {
		/* reset key in x.c_suffix_i that will be deleted */
		child.keys[child_key_idx - 1] = null;
		
		/* give x.c_suffix_i an extra key by moving a key from x down into x.c_suffix_i */
		child.keys[child_key_idx - 1] = parent.keys[child_idx - 2];

		/* move a key from x.c_suffix_i's left sibling up into x */
		parent.keys[child_idx - 2] = child_sibling_left.keys[child_sibling_left.total_keys - 1];

		/* reset key of left sibling */
		child_sibling_left.keys[child_sibling_left.total_keys - 1] = 0;
	  }

	  else if ( child_sibling_right && child_sibling_right.total_keys > this.DEGREE - 1 ) {
		/* reset key in x.c_suffix_i that will be deleted */
		child.keys[child_key_idx - 1] = null;

		/* give x.c_suffix_i an extra key by moving a key from x down into x.c_suffix_i */
		child.keys[child_key_idx - 1] = parent.keys[child_idx - 1];

		/* move a key from x.c_suffix_i's right sibling up into x */
		parent.keys[child_idx - 1] = child_sibling_right.keys[0];

		/* reset key of right sibling */
		child_sibling_right.keys[child_sibling_right.total_keys - 1] = 0;
	  }

	  /* (case 3.a) merge nodes */
	  else {

	  }
	}
  }
}

BTree.setup();
