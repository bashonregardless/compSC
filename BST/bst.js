/* BST property:
 * Let x be a node in BST. If y is node in the left subtree of x, then y.key <= x.key.
 * If y is node in the right subtree of x, then y.key >= x.key.
 */

var BST = {};

BST.inoderTreeWalk = function inorder_tree_walk (node) {
  if (node) {
	this.inorderTreeWalk(node.left_child);
	console.log(node.key);
	this.inorderTreeWalk(node.right_child);
  }
}
