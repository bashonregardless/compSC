/* BST property:
 * Let x be a node in BST. If y is node in the left subtree of x, then y.key <= x.key.
 * If y is node in the right subtree of x, then y.key >= x.key.
 */

struct node {
  int key;
  struct tree * left;
  struct tree * right;
}

struct node * newNode (int data);


/* This algorithm is so named because it prints the key of the root of a subtree
 * between printing the values in its left subtree and printing those in its right subtree.
 * (Similarly, a preorder tree walk prints the root before the values in either subtree,
 * and a postorder tree walk prints the root after the values in its subtrees.)
 */
void inorder_tree_walk (struct node * node);

void preorder_tree_walk (struct node * node);

void postorder_tree_walk (struct node * node);

/* Given a pointer to the root of the tree and a key k, T REE -S EARCH
 * returns a pointer to a node with key k if one exists; otherwise, it returns NIL.
 */
struct node * recursive_tree_search (struct node * node);

struct node * iterative_tree_search (struct node * node);

/* An element in a binary search tree whose key is a minimum is found by
 * following left child pointers from the root until we encounter a NIL.
 */
struct node * tree_minimum (struct node * node);

/* An element in a binary search tree whose key is a maximum is found by
 * following right child pointers from the root until we encounter a NIL.
 */
struct node * tree_maximum(node); 

/* The successor in the sorted order is determined by an inorder tree walk.
 * Successor of a node x is the node with the smallest key greater than x:key. The
 * structure of a binary search tree allows us to determine the successor of a node
 * without ever comparing keys. The following procedure returns the successor of a
 * node x in a binary search tree if it exists, and NIL if x has the largest key in the
 * tree.
 */
struct node * tree_successor (struct node * node);

/* tree_insert begins at the root of the tree and the pointer x traces a simple path
 * downward looking a NIL to replce with input z.
 * The procedure maintains a trailing pointer y as parent of x.
 */
void tree_insert (struct node * node, struct node * node_tobe_inserted);

struct node * newNode (int data)
{
  struct node * new_node = (struct node *) malloc(sizeof(struct node));
  new_node->key = data;
  new_node->left = NULL;
  new_node->right = NULL;

  return (node);
}


void inorder_tree walk (struct node * node) 
{
  if (node != NULL) {
	inorder_tree_walk(node->left);
	printf("%d ", node->key);
	inorder_tree_walk(node->right);
  }
};


void preorder_tree_walk (struct node * node) {
  if (node != NULL) {
	printf("%d ", node->key);
	preorder_tree_walk(node->left);
	preorder_tree_walk(node->right);
  }
}


void postorder_tree_walk (struct node * node) {
  if (node != NULL) {
	postorder_tree_walk(node->left);
	postorder_tree_walk(node->right);
	printf("%d ", node->key);
  }
}


struct node * recursive_tree_search (struct node * node) {
  if (node == NULL || key == node->key) {
	return node;
  }

  if (key < node->key) {
	recursive_tree_search(node->left);
  } else {
	recursive_tree_search(node->right);
  }
}


struct node * iterative_tree_search (struct node * node) {
  while (node != NULL && key !== node->key) {
	if (key < node->key) {
	  node = node->left;
	} else {
	  node = node->right;
	}
  }

  return node;
}


struct node * tree_minimum (struct node * node)
{
  while (node->left != NULL) {
	tree_minimum(node->left);
  }

  return node;
}


struct node * tree_maximum (node) 
{
  while (node->right != NULL) {
	this.tree_maximum(node->right);
  }

  return node;
}


struct node * tree_successor (node) 
{
  /* If the right subtree of node x is nonempty, then the successor of x is 
   * just the leftmost node in its x’rig subtree.
   */
  if (node->right) {
	return tree_minimum(node->right);
  }

  /* If the right subtree of node x is empty and x has a successor y, then y
   * is the lowest ancestor of x whose left child is also an ancestor of x.
   * To find y, we simply go up the tree from x until we encounter a node that 
   * is the left child of its parent.
   */
  struct node * parent = node->parent;
  while (parent != NULL && node == parent->right) {
	node = parent;
	parent = parent->parent;
  }
  
  return parent;
}


struct node * tree_predecessor (node) 
{
  /* If the right subtree of node x is nonempty, then the predecessor of x is 
   * just the leftmost node in its x’rit subtree.
   */
  if (node->left) {
	return tree_minimum(node->left);
  }

  /* If the right subtree of node x is empty and x has a predecessor y, then y
   * is the lowest ancestor of x whose right child is also an ancestor of x.
   * To find y, we simply go up the tree from x until we encounter a node that 
   * is the right child of its parent.
   */
  struct node * parent = node->parent;
  while (parent != NULL && node == parent->left) {
	node = parent;
	parent = parent->parent;
  }
  
  return parent;
}


void tree_insert (struct node * node, struct node * node_tobe_inserted) 
{
  /* define trailing pointer */
  struct node * parent = NULL;
  
  while (node !== null) {
	parent = node;

	if (node_tobe_inserted->key < node->key) {
	  node = node->left;
	} else {
	  node = node->right;
	}
  }

  /* set the pointer that cause z to be inserted */

  node_tobe_inserted->parent = parent;

  if (node_tobe_inserted === null) { /* tree was empty */
	node = node_tobe_inserted;
  } else if (node_tobe_inserted->key < node->key) {
	parent->left = node_tobe_inserted;
  } else {
	parent->right = node_tobe_inserted;
  }
}
