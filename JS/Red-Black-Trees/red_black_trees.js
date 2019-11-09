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

RBT.rbInsert = function rb_insert (root, node_tobe_inserted) {
  /* define trailing pointer y (parent) as the parent of x (node) */
  var parent = null;
  var stub_node = root;

  if (stub_node !== null) {
	parent = stub_node;

	if (node_tobe_inserted.key < stub_node.key) {
	  stub_node = stub_node.left;
	} else {
	  stub_node = stub_node.right;
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

RBT.rbDelete = function rb_delete (node_tobe_deleted) {
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

	/* (ALSO ABOVE - when y's original parent is z, however, we do not want x.p to point to
	 * y's original parent, since we are removing that node from the tree.
	 * Because node y will move up to take z's position in the tree, setting x.p to y will
	 * cause x.p to point to the original position of y's parent, even if x = T.NIL.
	 */
	/* additional lines */
	if (violator_node === node_tobe_deleted) {
	  node_replacing_violator_node.parent = violator_node;
	}

	else {
	  this.rbTransplant(violator_node, violator_node.right);
	  violator_node.right = node_tobe_deleted.right;
	  node_tobe_deleted.right.parent = violator_node;
	}
	this.rbTransplant(node_tobe_deleted, violator_node);
	violator_node.left = node_tobe_deleted.left;
	node_tobe_deleted.left.parent = violator_node;

	/* additional line */
	violator_node.color = node_tobe_deleted.color;
  }

  /* additional lines */
  if (violator_node.color === 'black') {
	this.rbDeleteFixup(node_replacing_violator_node);
  }

  /* If y was red, the red-black properties still hold for the following reasons: 
   *
   * 1. No black-heights in the tree have changed.
   *
   * 2. No red nodes have been made adjacent. Beacause y takes z's place in the 
   * tree, along with z's color, we cannot have two adjacent red nodes at y's new
   * position in the tree.
   * In addition, if y was not z's right child, then y's original right child x 
   * replaces y in the tree. If y is red, then x must be black, and so replacing y
   * by x cannot cause two red nodes to become adjacent.
   *
   * 3. Since y could not have been the root if it was red, the root remains black.
   */
}

  /*  Transformation in each of the cases preserves property 5.
   *  
   *  Property 5: For each node, all simple paths from the node to descendent leaves 
   *  contain the same number of black nodes.
   *
   *  The key idea is that in each case, the teansformation applied preserves the 
   *  number of black nodes (including x's extra black) from (and including) the root
   *  of the subtree shown to each of the subtrees - alpha, beta, gamma, kappa etc.
   */
RBT.rbDeleteFixup = function rb_delete_fixup (x) {
  /* The goal of the whilw loop is to move extra black uo the tree until:
   * 1. x points to a red-and-black node, in which case we color x (singly) black
   * in last line.
   * 2. x points to the  root, in which case we simply remove the extra black; or
   * 3. having performed suitable rotations and recloloring, we simply exit the loop.
   */
  while (x !== this.root && x.color === 'black') {
	/* We maintain a parent pointer to w ( the sibling node of x ). Since node x is doubly black,
	 * node w cannot be Tnil, because then the number of blacks nodes on simple path from x.p to x 
	 * would be less than the number of black nodes on simple path from x.p to w.
	 */
	var w = x.parent.right;

	/* (case 1): x's sibling w is red */
	if (w.color === 'red') {
	  /* switch the colors of w and x.p and then */
	  x.parent.color = 'red';
	  w.color = 'black';

	  /* perform a left rotation on x.p without violating any of red black properties */
	  this.leftRotate(x.parent);

	  /* the new sibling of x, which is one of w's children prior to the rotation, is now 
	   * black
	   */
	  w = x.parent.right;
	}
	/* thus, we have cconverted case 1 into case 2, 3 or 4 */

	/* case 2, 3 and 4 occur when node w is balck; they are distinguished by the color of
	 * w's children.
	 */

	/* (case 2): node w is black, both its children are black too */
	else if (w.right.color === 'black' && w.right.color === 'black') {
	  x.color = 'red';
	  x = x.p;
	}

	/* case 2 and case 3 are distinguished by the color of children nodes */
	else {
	  /* (case 3): x's sibling w is black, w's left child is red and w's right child is black */
	  if (w.right.color === 'black') {
		/* switch the colors of w and its left child w.left and then */
		w.left.color = 'black';
		w.color = 'red';

		/* perform a right rotation without violating any of the red black properties */
		this.rightRotate(w);
		w = x.parent.right;

		/* the new sibling w of x is now a black node with ared child, and thus
		 * we have transformed case 3 into case 4
		 */
	  }
	  /* (case 4): x's sibling w is black, and w's right child is red */
	  /* By performing some color changes and performing a left rotation on x.p, we can remove
	   * the extra black on x, making it singly black, without violating any of the red black 
	   * properties. Setting x to be the root causes while loop to terminate when it tests the 
	   * loop condition again.
	   */
	  w.color = x.parent.color;
	  x.parent.color = 'black';
	  w.right.color = 'black';
	  this.rightRotate(x.parent);
	  this.root = x;
	}
  }
  
  x.color = 'black';
}
