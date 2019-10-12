String.prototype.repeat = function(length) {
  return Array(length + 1).join(this);
};

/* BST property:
 * Let x be a node in BST. If y is node in the left subtree of x, then y.key <= x.key.
 * If y is node in the right subtree of x, then y.key >= x.key.
 */

var BST = {};

BST.setup = function setup () {
  this.root = null;
  this.COUNT = 10;

  var input_arr = [12, 5, 18, 2, 9, 15, 19, 13, 17];
  input_arr.forEach(function insert (each) {
	this.root = this.treeInsert(this.root, new this.newNode(each));
  }.bind(this));
  this.print2D(this.root, 0);
}

BST.newNode = function New_Node (data) {
  this.key = data;
  this.left = null;
  this.right = null;
  this.parent = null
}

/* This algorithm is so named because it prints the key of the root of a subtree
 * between printing the values in its left subtree and printing those in its right subtree.
 * (Similarly, a preorder tree walk prints the root before the values in either subtree,
 * and a postorder tree walk prints the root after the values in its subtrees.)
 */
BST.inoderTreeWalk = function inorder_tree_walk (node) {
  if (node) {
	this.inorderTreeWalk(node.left);
	console.log(node.key);
	this.inorderTreeWalk(node.right);
  }
}

BST.preorderTreeWalk = function preorder_tree_walk (node) {
  if (node) {
	console.log(node.key);
	this.preorderTreeWalk(node.left);
	this.preorderTreeWalk(node.right);
  }
}

BST.postorderTreeWalk = function posteorder_tree_walk (node) {
  if (node) {
	this.postorderTreeWalk(node.left);
	this.postorderTreeWalk(node.right);
	console.log(node.key);
  }
}

/* Given a pointer to the root of the tree and a key k, T REE -S EARCH
 * returns a pointer to a node with key k if one exists; otherwise, it returns NIL.
 */
BST.recursiveTreeSearch = function recursive_tree_search (node, key) {
  var stub = node;

  if (stub === null || key === stub.key) {
	return stub;
  }

  if (key < stub.key) {
	this.recursiveTreeSearch(stub.left);
  } else {
	this.recursiveTreeSearch(stub.right);
  }
}

/* iterative tree search */
BST.iterativeTreeSearch = function iterative_tree_search (node, key) {
  while (node !== null && key !== node.key) {
	if (key < node.key) {
	  node = node.left;
	} else {
	  node = node.right;
	}
  }

  return node;
}

/* An element in a binary search tree whose key is a minimum is found by
 * following left child pointers from the root until we encounter a NIL.
 */

BST.treeMinimum = function tree_minimum (node) {
  while (node.left != NULL) {
	this.treeMinimum(node.left);
  }

  return node;
}

/* An element in a binary search tree whose key is a maximum is found by
 * following right child pointers from the root until we encounter a NIL.
 */

BST.treeMaximum = function tree_maximum (node) {
  while (node.right != NULL) {
	this.treeMaximum(node.right);
  }

  return node;
}

/* The successor in the sorted order is determined by an inorder tree walk.
 * Successor of a node x is the node with the smallest key greater than x.key. The
 * structure of a binary search tree allows us to determine the successor of a node
 * without ever comparing keys.
 * The following procedure returns the successor of a
 * node x in a binary search tree if it exists, and NIL if x has the largest key in the
 * tree.
 */
BST.treeSuccessor = function tree_successor (node) {
  /* If the right subtree of node x is nonempty, then the successor of x is just the
   * leftmost node in its x’right stree.
   */
  if (node.right !== null) {
	return this.treeMinimum(node.right);
  }

  /* If the right subtree of node x is empty and x has a successor y, then y
   * is the lowest ancestor of x whose left child is also an ancestor of x.
   * To find y, we simply go up the tree from x until we encounter a node that 
   * is the left child of its parent.
   */
  var parent = node.parent;
  while (parent !== null && node === parent.right) {
	node = parent;
	parent = parent.parent;
  }

  return parent;
}

/* Tree predecessor in the sorted order is determined by an inorder tree walk.
 * Predecessor of a node x is the node with largest key smaller than x.key. The 
 * structure of a binary search tree allows us to determine the predecessor of a
 * node without ever comparing keys.
 * The following procedure returns the predecessor of a node x in a binary search
 * tree if it exists, and NIL if x has the smallest key in the tree.
 */
BST.treePredecessor = function tree_predecessor (node) {
  /* If the left subtree of node x is nonempty, then the predecessor of x is
   * just the rightmost node in its left subtree.
   */
  if (node.left) {
	return tree_maximum(node.left);
  }

  /* If the left subtree of node is empty and x has a successor y, then y is the
   * lowest ancestor of x whose right child is also an ancestor of x. To find y,
   * we simply go up the tree from x until we encounter a node that is right child
   * of its parent.
   */
  var parent = node.parent;
  while (parent !== null && node == parent.left) {
	node = parent;
	parent = parent.parent;
  }

  return parent;
}

/* treeInsert begins at the root of the tree and the pointer x traces a simple path
 * downward looking a NIL to replce with input z.
 * The procedure maintains a trailing pointer y as parent of x.
 */
BST.treeInsert = function tree_insert (node, node_tobe_inserted) {
  /* define trailing pointer */
  var parent = null;
  
  while (node !== null) {
	parent = node;

	if (node_tobe_inserted.key < node.key) {
	  node = node.left;
	} else {
	  node = node.right;
	}
  }

  /* set the pointer that cause z to be inserted */

  node_tobe_inserted.parent = parent;

  if (parent === null) { /* tree was empty */
	return node_tobe_inserted;
  } else if (node_tobe_inserted.key < parent.key) {
	parent.left = node_tobe_inserted;
  } else {
	parent.right = node_tobe_inserted;
  }
  return this.root;
}

BST.print2D = function print_2d(node, space) {
  // Base case
  if (node === null) {
    return;
  } else {
    // Increase distance between levels
    space += this.COUNT;

    // Process right child first
    this.print2D(node.right, space);

    // Print current node after space count
	console.log(`${" ".repeat(space - (this.COUNT + 1))}${node.key}\n`); 

    // Process left child
    this.print2D(node.left, space);
  }
}

BST.deleteNode = function delete_node (node, key) {
  if ( node.left === null && node.right === null) {
	free(node);
  }
	/* the two cases of replacing by either successor (cormen content) or predecessor (cormen exercise),
	*/
  else if (node.right != null) {
	
  }
}

BST.setup();
