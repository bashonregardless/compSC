var RBT = {};

RBT.setup = function setup () {
  this.root = null;
  this.nil = null;
}

RBT.leftRotate = function left_rotate (node) {
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

RBT.rightRotate = function right_rotate () {
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

RBT.rbInsert = function rb_insert (node, node_tobe_inserted) {
  /* define trailing pointer y (parent) as the parent of x (node) */
  var parent = null;

  if (node !== null) {
	parent = node;

	if (node_tobe_inserted.key < node.key) {
	  node = node.left;
	} else {
	  node = node.right;
	}
  }

  node_tobe_inserted.parent = parent;

  if (parent === null) {
	this.root = node_tobe_inserted;
  } else if (node_tobe_inserted.key < node.key) {
	parent.left = node_tobe_inserted;
  } else {
	parebt.right = node_tobe_inserted;
  }

  node_tobe_inserted.left = this.nil;
  node_tobe_inserted.right = this.nil;
  node_tobe_inserted.color = 'red';

  /* because coloring z red may cause a violation of one of the red-black
   * properties, we call rbInsertFixup procedure to restore these properties
   */
  this.rbInsertFixup(this.root, node_tobe_inserted);
}

RBT.rbInsertFixup = function rbInsertFixup (node, fix_node) {
  while (fix_node.color === 'red') {
	if (fix_node.parent === fix_node.parent.parent.left) {
	  y = fix_node.parent.parent.right;
	  if (y.color === 'red') {
		fix_node.parent.color = 'red';
		y.color = 'black';
		fix_node.parent.parent.color = 'black';
	  } else {
		if (fix_node === y.right) {
		  fix_node = fix_node.parent;
		  this.leftRotate(y, fix_node);
		}
		fix_node.parent = right;
		fix_node.parent.parent.color = 'red';
	  }
	} else {
	  y = fix_node.parent.parent.left;
	  if (y.color === 'red') {
		fix_node.parent.color = 'red';
		y.color = 'black';
		fix_node.parent.parent.color = 'black';
	  } else {
		if (fix_node === y.left) {
		  fix_node = fix_node.parent;
		  this.rightRotate(y, fix_node);
		}
		fix_node.parent = left;
		fix_node.parent.parent.color = 'red';
	  }
	}
  }
  this.root.color = 'black';
}

/* The procedure rbTransplant differs from bstTransplant (or just transplant) in
 * two ways.
 * FIRST: the first if check references the sentinel T.NIL instead of NIL.
 * SECOND: the assignment to v.p in last line occurs unconditionally: we can assign
 * to v.p even if v points to sentinel.
 * Infact we shall exploit the ability to assign to v.p when v = T.NIL 
 */
RBT.rbTransplant = function rb_transplant (node_tobe_replaced, node_replacing) {
  /* handle the case in which u is the root of the tree */
  if (node_tobe_replaced === tNil) {
	this.root = node_replacing;
  }

 /* update u.p.left if u is a left child of its parent */
  if (node_tobe_replaced === node_tobe_replaced.parent.left) {
	node_tobe_replaced.parent.left = node_replacing;
  }

  /* update u.p.right if u is a right child of its parent */
  if (node_tobe_inserted.parent.right === node_tobe_replaced) {
	node_tobe_inserted.parent.right === node_replacing;
  }

  node_replacing.parent = node_tobe_replaced.parent;
}

RBT.rbDelete = function rb_delete () {
  /* keep track of a node y that might cause violations of red-balck properties. */
  
  /* additional lines */
  /* set y to point to node z */
  var violator_node = node_tobe_deleted;

  /* because node y's color might change, store y's color before any changes occur */
  var violator_node_original_color = violator_node.color;

  /* we keep track of the node x that moves into y's original position in the tree,
   * because node x might also cause violations of red-black properties.
   * We set x to point to either y's only child or, if y has no children, the sentinel
   * tNil.
   * Since node x moves into node y's original position, the attribute x.p is always 
   * set to point to the original position in the tree of y's parent, even if x is,
   * in fact, the sentinel T.NIL. Unless z is y's original parent (which occurs only
   * when z has two children and its successor y is z's right child - SEE BELOW), the
   * assignment to x.p takes place in last line of rbTransplant.
   */
  if (node_tobe_deleted.left === tNil) {
	/* z has fewer than 2 children, therefore node y is removed. */

	/* additional line */
	var node_replacing_violator_node = node_tobe_deleted.right;

	this.rbTransplant(node_tobe_deleted, node_tobe_deleted.right);
  }

  else if (node_tobe_deleted.right === tNil) {
	/* z has fewer than 2 children, therefore node y is removed. */

	/* additional line */
	var node_replacing_violator_node = node_tobe_deleted.left;

	this.rbTransplant(node_tobe_deleted, node_tobe_deleted.left);
  }

  else {
	/* when z has two children: set y to point to z's successor, just as in BST.treeDelete,
	 * and y will move intp z's position in the tree.
	 */
	var violator_node = this.treeMinimum(node_tobe_deleted.right);

	/* additional lines */
	var violator_node_original_color = violator_node.color;
	var node_replacing_violator_node = violator_node.right;

	/* when y's original parent is z, however, we do not want x.p to point to y's original
	 * parent, since we are removing that node from the tree.
	 * Because node y will move up to take z's position in the tree, setting x.p to y will
	 * cause x.p to point to the original position of y's parent, even if x = T.NIL.
	 */
  }
}
