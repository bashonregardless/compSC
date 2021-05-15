const Tree = require('../Reusable/tree');
const AVL = Object.create(Tree);

AVL.sentinelNode = function sentinel_Node () {
  this.height = -1;
}

AVL.newNode = function new_node (avl, data) {
  this.left = new avl.sentinelNode;
  this.right = new avl.sentinelNode;
  this.parent = null;
  this.key = data;
  this.height = 0;
}

AVL.setup = function avl_setup () {
  this.COUNT = 10;
  this.root = null;
  const node_arr = [6, 11, 32, 44, 9, 8, 2, 4, 1];
  node_arr.forEach(function avl_insert (each) {
	let node_tobe_inserted = new this.newNode(this, each);
	this.root = this.treeInsert(this.root, node_tobe_inserted);

	/* if there is no balancing done in update_H, it returns undefined.
	 * Otherwise it may return a modified root.
	 *
	 * Set this.root to the root at the time of procedure call, if
	 * procedure returns undefined.
	 */
	this.root = this.updateH(node_tobe_inserted) || this.root;
  }.bind(this));
  
  this.print2D(this.root, 0);

  let node_tobe_deleted = this.recursiveTreeSearch(this.root, 4);
  let node_replacing = this.treeDelete(this.root, node_tobe_deleted);
  this.root = this.updateH(node_replacing) || this.root;
  this.print2D(this.root, 0);
}

AVL.recursiveTreeSearch = function recursive_tree_search (node, key) {
  var stub = node;

  if (stub === null || key === stub.key) {
	return stub;
  }

  if (key < stub.key) {
	return this.recursiveTreeSearch(stub.left, key);
  } else {
	return this.recursiveTreeSearch(stub.right, key);
  }
}


AVL.treeInsert = function tree_insert (root, node_tobe_inserted) {
  /* define trailing pointer y (parent) as the parent of x (node) */
  var parent = null;
  var stub_node = root;

  while (stub_node && stub_node.height !== -1) {
	parent = stub_node;
	if (node_tobe_inserted.key < stub_node.key) {
	  stub_node = stub_node.left;
	} else {
	  stub_node = stub_node.right;
	}
  }

  node_tobe_inserted.parent = parent;

  if (parent === null) {
	return node_tobe_inserted;
  } else if (node_tobe_inserted.key < parent.key) {
	parent.left = node_tobe_inserted;
  } else {
	parent.right = node_tobe_inserted;
  }

  return root;
}

AVL.updateHeight = function update_height (node) {
  if (!node) {
	return;
  }

  node.height = node.left.height > node.right.height ? node.left.height + 1 : node.right.height + 1;
}

AVL.updateH = function update_H (node) {
  this.updateHeight(node);
  if (node) {
	/* (case) x is right heavy */
	if (node.right.height - node.left.height > 1) {
	  if (node.right.right.height > node.right.left.height) {
		/* (case) x's right child y is right heavy 
		 * - straight chain -
		 * One rotation - LR(x)
		 */
		return this.leftRotate(this.root, node);
	  }

	  /* (case) x's right child y is left heavy 
	   * - zig-zag chain -
	   * Two rotations - RR(y) then LR(x)
	   */
	  if (node.right.right.height < node.right.left.height) {
		this.rightRotate(this.root, node.right);
		return this.leftRotate(this.root, node);
	  }
	}

	/* (case) x is left heavy */
	else if (node.right.height - node.left.height < - 1) {
	  /* (case) x's left child y is left heavy 
	   * - straight chain -
	   * One rotation - RR(x)
	   */
	  if (node.left.right.height < node.left.left.height) {
		return this.rightRotate(this.root, node);
	  }

	  /* (case) x's left child y is right heavy 
	   * - zig-zag chain -
	   * Two rotations - LR(y) then RR(x)
	   */
	  if (node.left.right.height > node.left.left.height) {
		this.leftRotate(this.root, node.left);
		return this.rightRotate(this.root, node);
	  }
	}

	else {
	  return this.updateH(node.parent);
	}
  }
}

AVL.transplant = function transplant (tree_root, node_tobe_replaced, node_replacing) {
  if (!node_tobe_replaced.parent) {
	tree_root = node_tobe_replaced;
  } else if (node_tobe_replaced === node_tobe_replaced.parent.left) {
	node_tobe_replaced.parent.left = node_replacing;
  } else {
	node_tobe_replaced.parent.right = node_replacing;
  }

  if (node_replacing) {
	node_replacing.parent = node_tobe_replaced.parent;
  }

  return node_replacing;
}

AVL.treeMinimum = function tree_minimum (node) {
  while (node && node.left.height !== -1) {
	return this.treeMinimum(node.left);
  }

  return node;
}

AVL.treeSuccessor = function tree_successor (node) {
  if (node.right.height !== -1) {
	return this.treeMinimum(node.right);
  } 

  var parent = node.parent;
  if (parent !== null && node === parent.right) {
	node = node.parent;
	parent = parent.parent;
  }

  return parent;
}

AVL.treeDelete = function tree_delete (tree_root, node_tobe_deleted) {
  if (!node_tobe_deleted.left) {	
	return this.transplant(this.root, node_tobe_deleted, node_tobe_deleted.right);
  }
  if (!node_tobe_deleted.right) {
	return this.transplant(this.root, node_tobe_deleted, node_tobe_deleted.left);
  }
  else {
	let node_tobe_deleted_successor = this.treeMinimum(node_tobe_deleted.right);
	if (node_tobe_deleted_successor.parent !== node_tobe_deleted) {
	  this.transplant(tree_root, node_tobe_deleted_successor, node_tobe_deleted_successor.right);
	  node_tobe_deleted_successor.right = node_tobe_deleted.right;
	  node_tobe_deleted_successor.right.parent = node_tobe_deleted_successor;
	}
	let node_replacing = this.transplant(tree_root, node_tobe_deleted, node_tobe_deleted_successor);
	node_tobe_deleted_successor.left = node_tobe_deleted.left;
	node_tobe_deleted_successor.left.parent = node_tobe_deleted_successor; 
	return node_replacing;
  }
}

/* Cormen Red-Black Tree rotations variable nomenclature:
 * Page 313
 */
/* x is the node to be left rotated */
AVL.leftRotate = function left_rotate (tree_root, x) {
  var y = x.right;

  x.right = y.left;
  if (y.left && y.left.height !== -1) {
	y.left.parent = x;
  }

  y.parent = x.parent;

  if (x.parent === null) {
	tree_root = y;
  } else if (x === x.parent.left) {
	x.parent.left = y;
  } else {
	x.parent.right = y;
  }

  x.parent = y;
  y.left = x;

  this.updateHeight(x);
  this.updateHeight(y);

  return tree_root;
}

/* y is the node to be right rotated */
AVL.rightRotate = function right_rotate (tree_root, y) {
  var x = y.left;

  y.left = x.right;
  if (x.right && x.right.height !== -1) {
	x.right.parent = y;
  }

  x.parent = y.parent;

  if (y.parent === null) {
	tree_root = x;
  } else if (y === y.parent.left) {
	y.parent.left = x;
  } else {
	y.parent.right = x;
  }

  y.parent = x;
  x.right = y;

  this.updateHeight(y);
  this.updateHeight(x);

  return tree_root;
}

String.prototype.repeat = function (length) {
  return Array(length + 1).join(this);
}

AVL.inorderTreeWalk = function inorder_tree_walk (node) {
  if (node) {
	this.inorderTreeWalk(node.left);
	console.log(node.key);
	this.inorderTreeWalk(node.right);
  }
}

AVL.print2D = function print_2D (node, space) {
  // Base case
  if (!node || node.height === -1) return
  else {
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

AVL.setup();
