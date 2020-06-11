// Height Balanced Tree

/* AVL Tree
 *
 * Height invariant: At every node, the difference in height of
 * |height(left child) - height(right child)| <= 1
 *
 * height = h
 * lc = left child
 * rc = right child
 *
 * node x = node whose children violate height invariant
 * node y = child of x (either left or right)
 */

/* Assumption
 *
 * leaf node has lc.h and rc.h = -1
 */

#include <stdio.h>
#include <stdlib.h>

typedef struct *node {
  int h, key;
  struct *node lc, rc, parent;
} nd;

struct *nd bstInsert(char[] *node);
int height checkHeightInvar(struct *nd node);

struct *nd rightRotate(struct *nd node);
struct *nd leftRotate(struct *nd node);
struct *nd findSuccessor(struct *nd node);

int main (int argc, char[] *argv)
{
  char[] *inputArr = scanf(&a);

  if (*inputArr.length > 1)
  {

  } 
  else {
	bstInsert(*inputArr[0]);
  }
}

int checkHeightInvar(struct *nd node)
{
  return abs(node.lc.height - node.rc.height);
}

struct *nd bstInsert(char[] *node)
{
  struct *nd stub = root;

  // node being inserted as left child
  if (left != NULL && node.lc.key < stub.left.key)
  {
	bstInsert(stub.left);
	stub.left = node;

	int xHeightDiff = checkHeightInvar(stub);

	if (heightDiff >= 1)
	{
	  int yHeightDiff = checkHeightInvar(node);
	  // node y is right heavy
	  if (yHeightDiff == -1) 
	  {
		leftRotate(stub);
		rightRotate(stub);
	  }
	  // y is left heavy
	  else
	  {
		// RR x
		rightRotate(stub);
	  }
	}
  }
  // node being inserted as right child
  else
  {
	if (stub.right != NULL)
	{
	  bstInsert(stub.right);
	  stub.right = node;
	}
	else
	  errExit(); // import from tlpi
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
  if (node.lc.right != NULL) {
	// make y's lc, rc of y
	node.lc =  y.rc;
	//struct *nd successor = findSuccessor(node.lc.right);
	//if (successor != NULL) {
	// add node y successor as rc of y
	if (y.rc.lc != NULL) {
	  y.rc = y.rc.lc;
	}
  }
}

struct *nd rightRotate(struct *nd node)
{
  // store ref to y
  struct *nd y = node.lc;
  if (node.lc.right != NULL) {
	// make y's lc, rc of y
	node.lc =  y.rc;
	struct *nd successor = findSuccessor(node.lc.right);
	// add node y successor as rc of y
	if (successor != NULL) {
	  y.rc = y.rc.lc;
	}
  }

}
