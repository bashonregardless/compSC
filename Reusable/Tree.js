var Tree = (function Tree () {
  var tree = {};

  /* Cormen Red-Black Tree rotations variable nomenclature:
   * Page 313
   */
  /* x is the node to be left rotated */
  tree.leftRotate = function left_rotate (tree_root, x) {
	var y = x.right;

	x.right = y.left;
	if (y.left) {
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
  }

  /* y is the node to be right rotated */
  tree.rightRotate = function right_rotate (tree_root, y) {
	var x = y.left;

	y.left = x.right;
	if (x.right) {
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
  }

  tree.repeat = function (repeatObj, length) {
	return Array(length + 1).join(this);
  }

  tree.print2D = function print_2D (node, space) {
	if (!node) return;

	const COUNT = 10;
	let space += space;

	this.print2D(node.left, space);

	console.log(`${this.repeat.call(' ', space)}${node.key}\n`);

	this.print2D(node.right, space);
  }

  tree.inorderTreeWalk = function inorder_tree_walk (node) {

  }
})()
