#include <stdio.h>
#include <stdlib.h>
#define COUNT 10

/* BST property:
 * Let x be a node in BST. If y is node in the left subtree of x, then y.key <= x.key.
 * If y is node in the right subtree of x, then y.key >= x.key.
 */

struct node {
  int key;
  struct node * left;
  struct node * right;
  struct node * parent;
};

/* pointer to the root node of the BTree structure */
static struct node * proot = NULL;

struct node * new_node (int data);

/* inorder_tree_walk algo is so named because it prints the key of the root of a subtree
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
struct node * recursive_tree_search (struct node * node, int key);

struct node * iterative_tree_search (struct node * node, int key);

/* An element in a binary search tree whose key is a minimum is found by
 * following left child pointers from the root until we encounter a NIL.
 */
struct node * tree_minimum (struct node * node);

/* An element in a binary search tree whose key is a maximum is found by
 * following right child pointers from the root until we encounter a NIL.
 */
struct node * tree_maximum(struct node * node); 

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
struct node * tree_insert (struct node * node, struct node * node_tobe_inserted);

void print2D(struct node* node, int space);

int main () 
{
  proot = tree_insert(proot, new_node(12));

  proot = tree_insert(proot, new_node(5));
  proot = tree_insert(proot, new_node(18));
  proot = tree_insert(proot, new_node(2));
  proot = tree_insert(proot, new_node(9));
  proot = tree_insert(proot, new_node(15));
  proot = tree_insert(proot, new_node(19));
  proot = tree_insert(proot, new_node(13));
  proot = tree_insert(proot, new_node(17));

  print2D(proot, 0);
}

struct node * new_node (int data)
{
  struct node * node = (struct node *) malloc(sizeof(struct node));
  node->key = data;
  node->left = NULL;
  node->right = NULL;
  node->parent = NULL;

  return (node);
}


void inorder_tree_walk (struct node * node) 
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


struct node * recursive_tree_search (struct node * node, int key) {
  if (node == NULL || key == node->key) {
	return node;
  }

  if (key < node->key) {
	recursive_tree_search(node->left, key);
  } else {
	recursive_tree_search(node->right, key);
  }
}


struct node * iterative_tree_search (struct node * node, int key) {
  while (node != NULL && key != node->key) {
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


struct node * tree_maximum (struct node * node) 
{
  while (node->right != NULL) {
	tree_maximum(node->right);
  }

  return node;
}


struct node * tree_successor (struct node * node) 
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


struct node * tree_predecessor (struct node * node) 
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


struct node * tree_insert (struct node * node, struct node * node_tobe_inserted) 
{
  /* define trailing pointer */
  struct node * parent = NULL;
  
  while (node != NULL) {
	parent = node;

	if (node_tobe_inserted->key < node->key) {
	  node = node->left;
	} else {
	  node = node->right;
	}
  }

  /* set the pointer that cause z to be inserted */

  node_tobe_inserted->parent = parent;

  if (parent == NULL) { /* tree was empty */
	return node_tobe_inserted;
  } else if (node_tobe_inserted->key < parent->key) {
	parent->left = node_tobe_inserted;
  } else {
	parent->right = node_tobe_inserted;
  }
  return proot;
}

void print2D(struct node* node, int space) {
  // Base case
  if (node == NULL) {
    return;
  } else {
    // Increase distance between levels
    space += COUNT;

    // Process right child first
    print2D(node->right, space);

    // Print current node after space count
    printf("\n");
    for (int i = COUNT; i < space; i++) {
      printf(" "); 
    }
    printf("%d\n", node->key); 

    // Process left child
    print2D(node->left, space);
  }
}

