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
  btree_insert_node(proot, 10);
  btree_insert_node(proot, 34);
  btree_insert_node(proot, 30);
  btree_insert_node(proot, 18);
  btree_insert_node(proot, 45);
  btree_insert_node(proot, 25);

  btree_insert_node(proot, 35);
  btree_insert_node(proot, 32);
  btree_insert_node(proot, 29);
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

