const AVL = {};

AVL.newNode = function avl_node () {
  left = null;
  right = null;
  parent = null;
  key = null;
  height = 0;
}

AVL.setup = function avl_setup () {
  this.root = new this.AVLNode(8);
  const node_arr = [6, 9, 11, 2, 4, 3, 14, 16, 22, 24, 25, 1, 10];
  node_arr.forEach(function avl_insert (each) {
	this.treeInsert(new this.newNode(each));
  });
}

AVL.treeInsert = function tree_insert (root, node_tobe_inserted) {
  /* define trailing pointer y (parent) as the parent of x (node) */
  var parent = null;
  var stub_node = root;

  while (stub_node !== null) {
	parent = stub_node;
	if (node_tobe_inserted.key < stub_node.key) {
	  stub_node = stub_node.left;
	} else {
	  stub_node = stub_node.right;
	}
  }

  node.parent = parent;

  if (parent === null) {
	this.root = parent;
  } else if (parent.key < node.key) {
	parent.left = node_tobe_inserted;
  } else {
	parent.right = node_tobe_inserted;
  }

  this.updateHeight(node_tobe_inserted, 0);
}

this.updateHeight = function update_height (node, height) {

  if (node.parent !== null ) {
	/* (case) x is right heavy */
	if (node.right.height - node.left.height > 1) {
	  if (node.right.right.height > node.right.left.height) {
		/* (case) x's right child y is right heavy 
		 * - straight chain -
		 * One rotation - LR(x)
		 */
		this.leftRotate(y);
	  }

	  /* (case) x's right child y is left heavy 
	   * - zig-zag chain -
	   * Two rotations - RR(y) then LR(x)
	   */
	  if (node.right.right.height < node.right.left.height) {
		this.rightRotate(y);
		this.leftRotate(x);
	  }

	  node.right.height = node.right.left.height > node.right.right.height ? node.right.left.height + 1 : node.right.right.height + 1;
	}

	/* (case) x is left heavy */
	else {
	  /* (case) x's left child y is right heavy 
	   * - zig-zag chain -
	   * One rotation - RR(x)
	   */
	  if (node.left.right.height > node.left.left.height) {
		this.rightRotate(x);
	  }

	  /* (case) x's left child y is left heavy 
	   * - straight chain -
	   * Two rotations - LR(y) then RR(x)
	   */
	  if (node.left.right.height < node.left.left.height) {
		this.leftRotate(y);
		this.rightRotate(x);
	  }
	  node.left.height = node.left.left.height > node.left.right.height ? node.left.left.height + 1 : node.left.right.height + 1;
	} 

	this.updateHeight(y.parent, y.height);
  }
}

AVL.leftRotate = function left_rotate (node) {
  // store ref to node.right i.e y
  var y = node.right;
  // after the following step we lose ref to node.right i.e y
  node.right = y.left;

  /****** check for nil ******/
  if (y.left != tNil) {
	y.left.parent = node;
  }

  y.parent = node.parent;

  /****** handle cases ******/
  // (case): when x is root of tree
  // (case): when x is left child of its parent
  // (case): when x is right child of its parent
  if (node.parent = tNil) {
	this.root = y;
  } else if (node = node.parent.left) {
	node.parent.left = y;
  } else {
	node.parent.right = y;
  }

  y.left = node;
  node.parent = y;
}

AVL.rightRotate = function right_rotate () {
  // store reference to y
  var y = node.left;

  node.left = y.right;

  if (y.right !== tNil) {
	y.right.parent = node;
  }

  y.parent = node.parent;

  if (node.parent === tnil) {
	this.root = y;
  } else if (node.parent.left = node) {
	node.parent.left = y;
  } else {
	node.parent.right = y;
  }

  y.right = node;
  node.parent = y;
}
