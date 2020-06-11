// Height Balanced Tree

/* AVL Tree
 *
 * Height invariant: At every node, the difference in height of
 * |height(left child) - height(right child)| <= 1
 *
 * h = height
 * lc = left child
 * rc = right child
 *
 * node x = node whose children violate height invariant
 * node y = child of x (either left or right)
 */

/* Rotation
 *
 * Recalculate height of x after rr.
 * Recalculate height of y after lr.
 */

/* Assumption
 *
 * leaf node has lc.h and rc.h = -1
 */

#include <stdio.h>
#include <stdlib.h>

typedef struct *node {
  int h, key;
  struct *node lc, rc;
  int lh = -1;
  int rh = -1;
} nd;

struct *nd newNode(int key);
struct *nd bstInsert(char[] *node);
int height checkHeightInvar(struct *nd node);

struct *nd rightRotate(struct *nd node);
struct *nd leftRotate(struct *nd node);
struct *nd findSuccessor(struct *nd node);
struct *nd leftChildFixHeightInvar(struct *nd node);
struct *nd rightChildFixHeightInvar(struct *nd node);
void updateHeight(struct *nd node);

int main (int argc, char[] *argv)
{
  char[] *inputArr = scanf(&a);

  struct *nd root = newNode(1);

  if (*inputArr.length > 1)
  {

  } 
  else {
	root = bstInsert(*inputArr[0]);
  }
}

struct *nd newNode(int key)
{
  struct *nd node = malloc(sizeof(struct *nd));
  node.key = key;
  return node;
}

int checkHeightInvar(struct *nd node)
{
  return abs(node.lc.height - node.rc.height);
}

struct *nd leftChildFixHeightInvar(struct *nd node)
{
  int xHeightDiff = checkHeightInvar(node);

  if (xHeightDiff > 1) {
	int yHeightDiff = checkHeightInvar(node);

	// node y is right heavy. Zig-Zag chain
	if (yHeightDiff == -1) 
	{
	  leftRotate(node.lc);
	  rightRotate(node);
	  return node.rc;
	}
	// y is left heavy. Straight chain
	else
	{
	  rightRotate(node);
	  return node;
	}
  }
}

struct *nd rightChildFixHeightInvar(struct *nd node) {
  int xHeightDiff = checkHeightInvar(node);

  if (xHeightDiff > 1) {
	int yHeightDiff = checkHeightInvar(node);

	// node y is left heavy. Zig-Zag chain
	if (yHeightDiff == 1) 
	{
	  rightRotate(node.rc);
	  leftRotate(node);
	  return node.rc;
	}
	// y is right heavy. Straight chain
	else
	{
	  leftRotate(node);
	  return node;
	}
  }
}

struct *nd bstInsert(struct *nd node, int key)
{
  // node being inserted as left child
  if (node.key < stub.key)
  {
	if (node.lc == NULL) {
	  struct *nd newNode = newNode(key);
	  node.lc = newNode;
	  return leftChildFixHeightInvar(node);
	}

	struct *nd updatedRoot = bstInsert(node.lc);

	// update root after insertion
	node.lc = updatedRoot;
	return leftChildFixHeightInvar(node);
  }

  // node being inserted as right child
  else
  {
	if (node.rc == NULL)
	{
	  struct *nd newNode = newNode(key);
	  node.rc = newNode;
	  return rightChildFixHeightInvar(node);
	}

	struct *nd updatedRoot = bstInsert(node.rc);

	// update root after insertion
	node.rc = updatedRoot;
	return rightChildFixHeightInvar(node);
  }
}

struct *nd findSuccessor(sruct *nd node)
{
  struct *nd stub = node;

  while(stub.left !== NULL)
  {
	stub = stub.left;
  }

  return stub;
}

struct *nd leftRotate(struct *nd node)
{
  // store ref to y
  struct *nd y = node.lc;
  if (y.rc != NULL) {
	node.lc = y.rc;
	y.rc.lc = y;
	// make y's rc's lc, rc of y
	if (y.rc.lc != NULL) {
	  y.rc = y.rc.lc;
	}
  }

  updateHeight(y);
}

struct *nd rightRotate(struct *nd node)
{
  // store ref to y
  struct *nd y = node.lc;

  if (y.rc != NULL) {
	node.lc = y.rc;
  }
  y.rc = node;

  updateHeight(node);
}

void updateHeight(struct *nd node)
{
  node.height = 1 + (node.lc.height > node.rc.height ? node.lc.height : node.rc.height);
}
