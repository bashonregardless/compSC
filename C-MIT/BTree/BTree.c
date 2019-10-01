/* Representing rooted trees with unbounded branching :-
 *
 * LEFT-CHILD, RIGHT-SIBLING representation : Instead of having a pointer to each of its children,
 * however, each node has x has only two pointers:
 * x.left-child points to the leftmost child of node x, and
 * x.right-sibling points to the sibling of x immediately to its right.
 *
 * If x has no children, then x.left-child = NIL, and if node x is the rightmost child of its parent,
 * then x.right-sibling = NIL.
 *
 */

/* assume t = 3 situation 
 * Therefore, lowerbound on #keys = 2 and upperbound = 2t - 1 keys, i.e 5 keys */

#include <stdio.h>
#include <stdlib.h>

#define DEGREE 3

struct s_btree_node 
{
  int leaf;
  int total_keys;

  int keys[2 * DEGREE - 1];

  struct s_btree_node * left_child;
  struct s_btree_node * right_sibling;
};

struct search_result 
{
  struct s_btree_node * pnode;
  int key;
};

/* helper functions for btree structure */

/* pointer to the root node of the BTree structure */
static struct s_btree_node * proot = NULL;

/* allocate new node on the heap */
struct s_btree_node * new_node(void);

/* search for node in btree.
 * input : a pointer to the root node x of a subtree and a key k to be searched
 * for in that subtree.
 * output : returns the ordered pair (y, i), consisting of a node y and an index i
 * such that y.key_suffix_i = k. Otherwise, the procedure returns NIL.
 */
struct search_result * search_node (struct s_btree_node * pnode, int key);

void btree_split_child (struct s_btree_node * pnode, int i);

void btree_insert_nonfull (struct s_btree_node * pnode, int key);

void btree_insert_node(struct s_btree_node * prt, int key);

struct s_btree_node * btree_delete_node (struct s_btree_node * prt, int key);

struct s_btree_node * find_predecessor(struct s_btree_node * prt);

struct s_btree_node * find_successor(struct s_btree_node * prt);

int main(int argc, char * argv[]) 
{
  proot = new_node();

  /* To Explore :-
   * 1. How to prompt for user input, do a task and then prompt again - relatively easy, as functions are run to completion 
   *
   * 2. How to prompt for user input, spawn a parallel process to handle task and immediately yield control back to user prompt - gist is asynchronicity */

  btree_insert_node(proot, 8);
  btree_insert_node(proot, 1);
  btree_insert_node(proot, 11);
  btree_insert_node(proot, 5);
  btree_insert_node(proot, 13);
  btree_insert_node(proot, 7);
  btree_insert_node(proot, 28);
  btree_insert_node(proot, 37);
  btree_insert_node(proot, 16);
  btree_insert_node(proot, 12);
  btree_insert_node(proot, 3);
  btree_insert_node(proot, 15);
  btree_insert_node(proot, 17);
  btree_insert_node(proot, 27);
  btree_insert_node(proot, 6);
  btree_insert_node(proot, 9);
  btree_insert_node(proot, 14);
  btree_insert_node(proot, 43);
  btree_insert_node(proot, 2);
  //btree_insert_node(proot, 4);
  btree_insert_node(proot, 20);
  btree_insert_node(proot, 22);
  //btree_insert_node(proot, 10);
  //btree_insert_node(proot, 34);
  //btree_insert_node(proot, 30);
  //btree_insert_node(proot, 18);
  btree_insert_node(proot, 45);
  //btree_insert_node(proot, 25);

  //btree_insert_node(proot, 35);
  //btree_insert_node(proot, 32);
  //btree_insert_node(proot, 29);

  btree_delete_node(proot, 45);
  return 0;
}

struct s_btree_node * new_node()
{
  struct s_btree_node * pnode = (struct s_btree_node *)malloc(sizeof(struct s_btree_node));

  pnode->leaf = 1;
  pnode->total_keys = 0;
  pnode->left_child = NULL;

  return pnode;
}

struct search_result * search_node (struct s_btree_node * pnode, int key)
{
  /* find the smallest index i such that k <= x.key_suffix_i, or else
   * set i to x.n + 1
   */
  struct search_result * result;
  int i = 1;

  while (i <= pnode->total_keys && key > pnode->keys[i]) {
	i = i + 1;
  }

  if (i <= pnode->total_keys && key == pnode->keys[i]) {
	result->pnode = pnode;
	result->key = key;
	return result;
  } else if (pnode->leaf == 1) {
	return 0;
  } else {
	int j = i;
	pnode = pnode->left_child;
	while (j > 0) {
	  pnode = pnode->right_sibling;
	  j--;
	}
	return ( search_node(pnode, key) );
  }
}

void btree_split_child (struct s_btree_node * pnode, int i)
{
  /* pnew_split_node is z in CORMEN */
  struct s_btree_node * pnew_split_node = new_node();


  /* CORMEN: line 2 */
  /* CAUTION : Assigning a new node */
  /* Traverse to get the correct right-sibling. Conceptually y is x's i-th child */
  int j = 1;
  struct s_btree_node * pstud = pnode->left_child;
  /* Get x.c_suffix_i */
  while (pstud->right_sibling != NULL && j < i) {
	pstud = pstud->right_sibling;
	j++;
  }
  /* poriginal_split_node is y in CORMEN */
  struct s_btree_node * poriginal_split_node = pstud;


  /* CORMEN: line 3 */
  pnew_split_node->leaf = poriginal_split_node->leaf;
  /* CORMEN: line 4 */
  pnew_split_node->total_keys = DEGREE - 1;

  /* CORMEN: line 5 */
  j = 0;
  while (j <= DEGREE - 2) {
	pnew_split_node->keys[j] = poriginal_split_node->keys[j + DEGREE];
	j++;
  }


  /* CORMEN: line 7 */
  if (poriginal_split_node->leaf == 0) {
	int k = 1, k_dum = 0;
	/* find starting child node */
	struct s_btree_node * poriginal_split_node_child = poriginal_split_node->left_child;
	while (poriginal_split_node_child->right_sibling && k < DEGREE) {
	  poriginal_split_node_child = poriginal_split_node_child->right_sibling;
	  k++;
	}

	/* Assign rest of the child chain of poriginal_spilt_node to pnew_split_node */
	pnew_split_node->left_child = poriginal_split_node_child->right_sibling;
	/* Make right_sibling of poriginal_split_node_child point to NULL */
	poriginal_split_node_child->right_sibling = NULL;
  }

  /* CORMEN: line 10 */
  /* Incorporate code to make sure redundant keys of poriginal_split_node are removed */
  poriginal_split_node->total_keys = DEGREE - 1;
  int l = 2 * DEGREE - 1;
  while (l > poriginal_split_node->total_keys + 1) { /* Keep key 'keys[DEGREE - 1]' till it is promoted to parent */
	poriginal_split_node->keys[l - 1] = 0;
	l--;
  }


  /* CORMEN: line 11-13 */
  pnew_split_node->right_sibling = poriginal_split_node->right_sibling;
  poriginal_split_node->right_sibling = pnew_split_node;

  /* CORMEN: line 14-16 */
  int k = pnode->total_keys;
  while (k >= 1 && poriginal_split_node->keys[DEGREE - 1] < pnode->keys[k - 1]) {
	pnode->keys[k] = pnode->keys[k - 1];
	k = k - 1;
  }
  //while (k > i) {
  //  pnode->keys[k] = pnode->keys[k - 1];
  //  k--;
  //}
  pnode->keys[k] = poriginal_split_node->keys[DEGREE - 1];

  /* After key 'key[DEGREE - 1]' from poriginal_split_node has been promoted to parent,
   * remove it from poriginal_split_node */
  poriginal_split_node->keys[DEGREE - 1] = 0;

  /* CORMEN: line 17 */
  pnode->total_keys = pnode->total_keys + 1;
}

void btree_insert_nonfull (struct s_btree_node * pnode, int key)
{
  int i = pnode->total_keys;

  if (pnode->leaf == 1) {
	while (i >= 1 && key < pnode->keys[i - 1]) {
	  pnode->keys[i] = pnode->keys[i - 1];
	  i = i - 1;
	}
	pnode->keys[i] = key;
	pnode->total_keys = pnode->total_keys + 1;
  } else {
	while (i >= 1 && key < pnode->keys[i - 1]) {
	  i = i - 1;
	}

	i = i + 1;

	/* traverse to correct child node */
	int j = i;
	struct s_btree_node * pchild_node = pnode->left_child;
	while (j > 1) {
	  pchild_node = pchild_node->right_sibling;
	  j--;
	}

	if (pchild_node->total_keys == 2 * DEGREE - 1) {
	  btree_split_child(pnode, i);
	  if (key > pnode->keys[i - 1]) {
		/* More symbolic, copy of CORMEN */
		i = i + 1;
		/* Actual task is to find the correct node for key to be inserted */
		pchild_node = pchild_node->right_sibling;
	  }
	}

	btree_insert_nonfull(pchild_node, key);
  }
}

void btree_insert_node (struct s_btree_node * prt, int key)
{
  struct s_btree_node * pnode = new_node();
  pnode->leaf = prt->leaf;

  /* copy all keys */
  int j = 0;
  while (j < prt->total_keys) {
	pnode->keys[j] = prt->keys[j];
	j++;
  }
  pnode->total_keys = prt->total_keys;

  pnode->left_child = prt->left_child;
  pnode->right_sibling = prt->right_sibling;

  if (pnode->total_keys == 2 * DEGREE - 1) {
	struct s_btree_node * psplit_node = prt;
	psplit_node->leaf = 0;

	/* Reset all keys */
	int k = 0;
	while (k < prt->total_keys) {
	  psplit_node->keys[k] = 0;
	  k++;
	}
	psplit_node->total_keys = 0;

	psplit_node->left_child = pnode;
	btree_split_child(psplit_node, 0);
	btree_insert_nonfull(psplit_node, key);
  } else {
	btree_insert_nonfull(prt, key);
  }
}

struct s_btree_node * find_predecessor (struct s_btree_node * prt) {
  while (prt->total_keys > DEGREE - 1 && prt->leaf == 0 && prt->right_sibling != NULL) {
	prt = prt->right_sibling;
  }

  if (prt->right_sibling == NULL && prt->total_keys > DEGREE - 1 && prt->leaf == 0 && prt->left_child != NULL) {
	find_predecessor(prt);
  }

  return prt;
}

struct s_btree_node * find_successor (struct s_btree_node * prt) {
  while (prt->total_keys > DEGREE - 1 && prt->leaf == 0 && prt->left_child != NULL) {
	prt = prt->left_child;
  }

  return prt;
}

struct s_btree_node * btree_delete_node (struct s_btree_node * prt, int key) {
  struct s_btree_node * node = prt;

  int child_idx = 1;

  while (child_idx <= node->total_keys && key > node->keys[child_idx - 1]) {
	child_idx++;
  }

  if (child_idx <= node->total_keys && key == node->keys[child_idx - 1]) {
	/* case 2.x */
	/* If the key is in node and node is an internal node */
	if (node->leaf == 0) {
	  //struct s_btree_node * child = node->children[child_idx - 1];
	  struct s_btree_node * child = node->left_child;
	  int i = 0;
	  while (i < child_idx) {
		child = child->right_sibling;
		i++;
	  }
	  //struct s_btree_node * predecessor_child = node->children[child_idx - 2];
	  struct s_btree_node * predecessor_child = node->left_child;
	  int j = 0;
	  while (j < child_idx) {
		predecessor_child = predecessor_child->right_sibling;
		j++;
	  }
	  //struct s_btree_node * successor_child = node->children[child_idx];
	  struct s_btree_node * successor_child = node->left_child;
	  int k = 0;
	  while (k < child_idx + 1) {
		successor_child = successor_child->right_sibling;
		k++;
	  }

	  /* case 2.a */
	  /* find the predecessor k.
	   * Predecessor is found by begining search at child predecessor node,
	   * then recursively searching for the right most key.
	   */
	  if (predecessor_child->total_keys > DEGREE - 1) {
		struct s_btree_node * pred_key_node = find_predecessor(predecessor_child);

		pred_key_node->keys[pred_key_node->total_keys - 1] = 0;
		pred_key_node->total_keys--;

		node->keys[child_idx] = pred_key_node->keys[pred_key_node->total_keys - 1];
	  }

	  /* case 2.b */
	  /* find the successor k.
	   * Successor is found by begining search at child successor node,
	   * then recursively searching for the left most key.
	   */
	  else if (successor_child->total_keys > DEGREE - 1) {
		struct s_btree_node * succ_key_node = find_successor(successor_child);

		succ_key_node->keys[0] = 0;
		succ_key_node->total_keys--;

		node->keys[child_idx] = succ_key_node->keys[0];
	  }

	  /* case 2.c */
	  /* This case arises when neither of child predecessor or child successor 
	   * have total key count > DEGREE - 1.
	   */
	  /* merge nodes */
	  else {
		/* copy key to be deleted from x to y */
		predecessor_child->keys[DEGREE - 1] = node->keys[child_idx - 1];

		/* node x loses key */
		node->keys[child_idx - 1] = 0;

		/* adjust index of all other keys in x */
		int p = child_idx;
		while (p < node->total_keys - child_idx) {
		  node->keys[child_idx - 1 + p] = node->keys[child_idx + p];
		  p++;
		}

		/* decrease key count of x */
		node->total_keys--;

		/* copy all keys from z to y */
		int q = 0;
		while (q < DEGREE - 1) {
		  predecessor_child->keys[child_idx + q] = successor_child->keys[q];
		  q++;
		}
		
		/* increment key count of y */
		predecessor_child->total_keys = 2 * DEGREE - 1;

		/************************** VERIFICATION REQUIRED **************************/
		/* copy all children of z to y */
		int r = 0;
		struct s_btree_node * pred_child = predecessor_child->left_child;
		while (r < predecessor_child->total_keys) {
		  pred_child = pred_child->right_sibling;
		  r++;
		}
		pred_child->right_sibling = successor_child->left_child;

		/* free z */
		free(successor_child);
		
		
		/************************** VERIFICATION REQUIRED **************************/
		/* TO-DO: recursively delete key from y */
		/* ... */
	  }
	}
	
	/* case 1: simple deletion from a leaf */
	else {
	  /* adjust index of all other keys in x */
	  int s = child_idx;
	  while (s < node->total_keys - child_idx) {
		node->keys[child_idx - 1 + s] = node->keys[child_idx + s];
		s++;
	  }
	  
	  /* decrement key count */
	  node->total_keys--;
	}
  }

  else {
	/* case 3.x */
	/* Once we have exhausted all the internal node cases, we do 3.x 
	 * These cases start to arise when key is not present in the internal node.
	 */
	struct s_btree_node * child = node->left_child;
	int l = 0;
	/* in while condition below "-1" is required since we already pointed child to 
	 * node's left child
	 */
	while (l < child_idx - 1) {
	  child = child->right_sibling;
	  l++;
	}

	struct s_btree_node * child_sibling_left = node->left_child;
	int m = 0;
	while (m < child_idx - 1 - 1) {
	  child_sibling_left = child_sibling_left->right_sibling;
	  m++;
	}

	struct s_btree_node * child_sibling_right = node->left_child;
	int n = 0;
	while (n < child_idx) {
	  child_sibling_right = child_sibling_right->right_sibling;
	  n++;
	}

	/* If the key k is not present in internal node x, determine the root x.c_suffix_i
	 * of the appropriate subtree that must contain k, if k is in the tree at all.
	 * if x.c_suffix_i has only DEGREE - 1 keys, execute step 3.a or 3.b as	necessary
	 * to guarantee that we descend toa a node containing at least DEGREE keys.
	 * Then finish by recursing on the appropriate child of x.
	 */
	if (child->total_keys == DEGREE - 1) {
	  /* case 3.a */
	  if (child_sibling_left != NULL && child_sibling_left->total_keys > DEGREE - 1) {
		/* give x.c_suffix_i an extra key by moving a key from x down into x.c_suffix_i */
		child->keys[1] = node->keys[child_idx - 1];

		/* move key from sibling up into x */
		node->keys[child_idx - 1] = child_sibling_left->keys[child_sibling_left->total_keys - 1];

		/* reset sibling key that was promoted to parent */
		child_sibling_left->keys[child_sibling_left->total_keys - 1] = 0;
	  }

	  else if (child_sibling_right != NULL && child_sibling_right->total_keys > DEGREE - 1) {
		/* give x.c_suffix_i an extra key by moving a key from x down into x.c_suffix_i */
		child->keys[child->total_keys] = node->keys[child_idx - 2];

		/* move key from sibling up into x */
		node->keys[child_idx - 1] = child_sibling_right->keys[0];

		/* reset sibling key that was promoted to parent */
		child_sibling_left->keys[0] = 0;
	  }

	  /* case 3.b */
	  /* If x.c_suffix_i and both of x.c_suffic_i's immediate sibling have DEGREE - 1 keys,
	   * merge x.c_suffix_i with one sibling, which involves moving a key from x down into
	   * the new merged node to become the median key for that node. */
	  else {
		/* merge with left sibling case */
		if (child_sibling_left != NULL && child_sibling_left->total_keys == DEGREE - 1) {
		  /* copy all keys from child's left sibling to child */
		  int r = 0;
		  while (r < DEGREE - 1) {
			/* move child keys to right most positions to create space for incoming keys */
			child->keys[child->total_keys + r + 1] = child->keys[r];

			/* copy key from child's left sibling to child */
			child->keys[r] = child_sibling_left->keys[r];
			
			r++;
		  }

		  /* copy parent key to child */
		  child->keys[child->total_keys] = node->keys[child_idx - 2];

		  /* increment key count of child */
		  child->total_keys = 2 * DEGREE - 1;

		  /* remove parent (node) key and decrease its key count */
		  node->keys[child_idx - 2] = 0;
		  node->total_keys--;

		  /* prepend child_sibling_left's children list to child_sibling_left's children list */
		  struct s_btree_node * pchild_sibling_left_children_node = child_sibling_left->left_child;
		  int s = 0;
		  while (s < DEGREE - 1) {
			pchild_sibling_left_children_node = pchild_sibling_left_children_node->right_sibling;
			s++;
		  }
		  pchild_sibling_left_children_node->right_sibling = child->left_child;

		  child->left_child = node->left_child->left_child;

		  /* link child left sibling's right sibling to child's right sibling, thereby breaking the
		   * link of child left sibling with child */
		  //child_sibling_left->right_sibling = child->right_sibling;

		  /* free child at original pos */
		  /*********************** VERIFY *********************/
		  free(child_sibling_left);

		  if (node->total_keys == 0) {
			btree_delete_node(child, key);
			return child;
		  }
		  else {
			btree_delete_node(child, key);
			return node;
		  }
		}

		/* merge with right sibling case */
		if (child_sibling_right != NULL && child_sibling_right->total_keys == DEGREE - 1) {
		  /* copy all keys from child's right sibling to child */
		  int s = 0;
		  while (s < DEGREE - 1) {
			child->keys[child->total_keys + s + 1] = child_sibling_right->keys[s];
			s++;
		  }

		  /* copy parent key to child */
		  child->keys[DEGREE - 1] = node->keys[child_idx - 2];

		  /* remove node (parent) key and decrease its key count */
		  node->keys[child_idx - 2] = 0;
		  node->total_keys--;

		  /* link child right sibling's children to child's children */
		  int t = 0;
		  struct s_btree_node * pchild_children_node = child->left_child;
		  while (t < DEGREE - 1) {
			pchild_children_node = pchild_children_node->right_sibling;
			t++;
		  }
		  pchild_children_node->right_sibling = child_sibling_right->left_child;

		  free(child_sibling_right);

		  /* if node (parent) key count becomes zero, replace it with merged node */
		  if (node->total_keys == 0) {
			btree_delete_node(child, key);
			return child;
		  } else {
			btree_delete_node(child, key);
			return node;
		  }
		}
	  }
	}

	else {
	  btree_delete_node(child, key);
	}
  }
}
