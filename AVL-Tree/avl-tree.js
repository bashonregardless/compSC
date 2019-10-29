const Tree = require('../Reusable/tree');
const AVL = {};

AVL.newNode = function new_node (data) {
  this.left = null;
  this.right = null;
  this.parent = null;
  this.key = data;
  this.height = 0;
  this.rightNullHeight = -1;
  this.leftNullHeight = -1;
}

AVL.setup = function avl_setup () {
  this.root = null;
  const node_arr = [6, 11, 32, 44, 9, 8, 2, 1, 4];
  node_arr.forEach(function avl_insert (each) {
	this.root = this.treeInsert(this.root, new this.newNode(each));
  }.bind(this));
}

AVL.treeInsert = function tree_insert (root, node_tobe_inserted) {
  /* define trailing pointer y (parent) as the parent of x (node) */
  var parent = null;
  var stub_node = root;

  while (stub_node) {
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
	parent.leftNullHeight = 0;
  } else {
	parent.right = node_tobe_inserted;
	parent.rightNullHeight = 0;
  }

  this.updateHeight(node_tobe_inserted);

  return root;
}

AVL.updateH = function update_H (node) {
  if (!node) {
	return;
  }


}

AVL.updateHeight = function update_height (node) {
  if (node.parent) {
	/* (case) x is right heavy */
	if (node.right.height - node.left.height > 1) {
	  if (node.right.right.height > node.right.left.height) {
		/* (case) x's right child y is right heavy 
		 * - straight chain -
		 * One rotation - LR(x)
		 */
		this.leftRotate(node);
	  }

	  /* (case) x's right child y is left heavy 
	   * - zig-zag chain -
	   * Two rotations - RR(y) then LR(x)
	   */
	  if (node.right.right.height < node.right.left.height) {
		this.rightRotate(node.right);
		this.leftRotate(node);
	  }

	  node.right.height = node.right.left.height > node.right.right.height ? node.right.left.height + 1 : node.right.right.height + 1;
	}

	/* (case) x is left heavy */
	else {
	  if (node.leftNullHeight !== -1) {
		/* (case) x's left child y is left heavy 
		 * - straight chain -
		 * One rotation - RR(x)
		 */
		if (node.left.right.height < node.left.left.height) {
		  this.rightRotate(node);
		}

		/* (case) x's left child y is right heavy 
		 * - zig-zag chain -
		 * Two rotations - LR(y) then RR(x)
		 */
		if (node.left.right.height > node.left.left.height) {
		  this.leftRotate(node.left);
		  this.rightRotate(node);
		}

		node.left.height = node.left.left.height > node.left.right.height ? node.left.left.height + 1 : node.left.right.height + 1;
	  } 
	}

	this.updateHeight(node.parent);
  }
}

AVL.setup();
