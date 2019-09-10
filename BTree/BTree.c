/* Representing rooted trees with unbounded branching :-
 *
 * LEFT-CHILD, RIGHT-SIBLING representation : Instead of having a pointer to each of its children,
 * however, each node has x has only two pointers:
 * x.left-child oints to the leftmost child of node x, and
 * x.right-sibling points to the sibling of x immediately to its right.
 *
 * If x has no children, then x.left-child = NIL, and if node x is the rightmost child of its parent,
 * then x.right-sibling = NIL.
 *
 */

/* assume t = 3 situation 
 * Therefore, lowerbound on #keys = 3 and upperbound = 2t - 1 keys, i.e 5 keys */

#include <stdio.h>
#include <stdlib.h>

#define MAX_KEYS 3

struct s_btree_node 
{
  int leaf;
  int total_keys;

  int keys[MAX_KEYS];

  struct s_btree_node * left_child;
  struct s_btree_node * right_child;
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
struct search_result * search_node (struct s_btree_node * proot, int key);

void split_child (struct s_btree_node * proot, int i);

void insert_nonfull (struct s_btree_node * proot, int key);

void insert_node(struct s_btree_node * pnode, int key);

int main(int argc, char * argv[]) 
{
  proot = new_node();

  /* To Explore :-
   * 1. How to prompt for user input, do a task and then prompt again - relatively easy, as functions are run to completion 
   *
   * 2. How to prompt for user input, spawn a parallel process to handle task and immediately yield control back to user prompt - gist is asynchronicity */

  insert_node(proot, 8);
}

struct s_btree_node * new_node()
{
  struct s_btree_node * pnode = (struct s_btree_node *)malloc(sizeof(struct s_btree_node));

  pnode->leaf = 0;
  pnode->total_keys = 0;
  pnode->left_child = NULL;

  return pnode;
}

struct search_result * search_node (struct s_btree_node * proot, int key)
{
  /* find the smallest index i such that k <= x.key_suffix_i, or else
   * set i to x.n + 1
   */
  struct search_result * result;
  int i = 1;

  while (i <= proot->total_keys && key > proot->keys[i]) {
	i = i + 1;
  }

  if (i <= proot->total_keys && key == proot->keys[i]) {
	result->pnode = proot;
	result->key = key;
	return result;
  } else if (proot->leaf == 1) {
	return 0;
  } else {
	int j = i;
	proot = proot->left_child;
	while (j > 0) {
	  proot = proot->right_child;
	  j--;
	}
	return ( search_node(proot, key) );
  }
}

void split_child (struct s_btree_node * pnode, int i)
{
  /* pnew_split_node is z in CORMEN */
  struct s_btree_node * pnew_split_node = new_node();

  /* CAUTION : Assigning a new node */
  /* Traverse to get the correct right-sibling. Conceptually y is x's i-th child */
  int j = i;
  struct s_btree_node * pstud = pnode->left_child;
  /* Get x.c_suffix_i */
  while (j > 0) {
	pstud = pstud->right_child;
	j--;
  }
  
  /* poriginal_split_node is y in CORMEN */
  struct s_btree_node * poriginal_split_node = pstud;

  pnew_split_node->leaf = poriginal_split_node->leaf;
  pnew_split_node->total_keys = MAX_KEYS - 1;

  j = 1;
  while (j <= MAX_KEYS - 1) {
	pnew_split_node->keys[j] = poriginal_split_node->keys[j + MAX_KEYS];
  }

  if (pnode->leaf == 0) {
	int k = 1, k_dum = 0;
	/* find starting child node */
	struct s_btree_node * poriginal_split_node_child = poriginal_split_node->left_child;
	while (k < k + MAX_KEYS) {
	  poriginal_split_node_child = poriginal_split_node_child->right_child;
	}

	struct s_btree_node * pnew_split_node_child = poriginal_split_node->left_child;
	while (k < MAX_KEYS) {
	  pnew_split_node_child = poriginal_split_node_child;
	  /* proceed nodes */
	  pnew_split_node_child = pnew_split_node_child->right_child;
	  poriginal_split_node_child = poriginal_split_node_child->right_child;
	}
  }

  poriginal_split_node->total_keys = MAX_KEYS - 1;

  int k = 1, k_dum = 0;
  /* find starting child node */
  struct s_btree_node * poriginal_split_node_child = poriginal_split_node->left_child;
  while (k < k + MAX_KEYS) {
	poriginal_split_node_child = poriginal_split_node_child->right_child;
  }

  struct s_btree_node * pnew_split_node_child = poriginal_split_node->left_child;
  while (j > i) {
	pnew_split_node_child = poriginal_split_node_child;
	/* proceed nodes */
	pnew_split_node_child = pnew_split_node_child->right_child;
	poriginal_split_node_child = poriginal_split_node_child->right_child;
  }
}

void insert_nonfull (struct s_btree_node * proot, int key)
{
  int i = proot->total_keys;

  if (proot->leaf == 0) {
	while (i >= 1 && key < proot->keys[i]) {
	  proot->keys[i + 1] = proot->keys[i];
	  i = i - 1;
	}
	proot->keys[i + 1] = key;
	proot->total_keys = proot->total_keys + 1;
  } else {
	while (i >=1 && key < proot->keys[i]) {
	  i = i - 1;
	}

	i = i + 1;

	/* traverse to correct child node */
	int j = i;
	struct s_btree_node * pchild_node = proot->left_child;
	while (j > 0) {
	  pchild_node = pchild_node->right_child;
	}

	if (pchild_node->total_keys == 2 * MAX_KEYS + 1) {
	  split_child(proot, i);
	  if (key > proot->keys[i]) {
		i = i + 1;
	  }
	}

	insert_nonfull(pchild_node, key);
  }
}

void insert_node (struct s_btree_node * proot, int key)
{
  struct s_btree_node * pnode = proot;

  if (pnode->total_keys == 2 * MAX_KEYS - 1) {
	struct s_btree_node * psplit_node = new_node();
	proot =  psplit_node;
	psplit_node->leaf = 0;
	psplit_node->total_keys = 0;
	psplit_node->left_child = pnode;

	split_child(psplit_node, 1);
	insert_nonfull(psplit_node, key);
  } else {
	insert_nonfull(pnode, key);
  }
}

