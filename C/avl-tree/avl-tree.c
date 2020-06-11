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
#include <string.h>

#define arrLen(arr) (sizeof(arr) == 0 ? 0 : sizeof(arr) / sizeof((arr)[0]))
#define COUNT 10

struct avlNode{
  int h, key, height, lNullHeight, rNullHeight;
  struct avlNode *lc;
  struct avlNode *rc;
};

struct avlNode *nodealloc(int key);
struct avlNode *bstInsert(struct avlNode *node, int key);
int checkHeightInvar(struct avlNode *node);

struct avlNode *rightRotate(struct avlNode *node);
struct avlNode *leftRotate(struct avlNode *node);
struct avlNode *findSuccessor(struct avlNode *node);
struct avlNode *leftChildFixHeightInvar(struct avlNode *node);
struct avlNode *rightChildFixHeightInvar(struct avlNode *node);
void updateHeight(struct avlNode *node);
void print2D(struct avlNode *node, int space);

int main (int argc, char *argv[])
{
  int *inputArr[10];
  int substrl = 0;

  //printf("%d", arrLen(argv[1]));
  for(int i = 0; i < arrLen(argv[1]); i++)
  {
	if (argv[1][i] != ' ')
	{
	  substrl++; 
	  continue;
	}
	else 
	{
	  char substr = (char *)calloc(1, substrl);
	  //inputArr[i] = atoi(strndup(argv[1], i));
	  substrl = 0;
	}
	//printf("%c", argv[1][i]);
  }

  //inputArr = argv[1];
 // for(int i = 0; i < arrLen(inputArr); i++)
 // {
 //   printf("%d", *inputArr[i]);
 // }

  struct avlNode* root = nodealloc(1);

  if (arrLen(inputArr) > 1)
  {

  } 
  else {
	root = bstInsert(root, 1);
  }

  print2D(root, COUNT);
}

struct avlNode *nodealloc(int key)
{
  struct avlNode *newNode = (struct avlNode *)malloc(sizeof(struct avlNode));
  newNode->key = key;
  newNode->height = 0;
  newNode->lNullHeight = -1;
  newNode->rNullHeight = -1;
  return newNode;
}

int checkHeightInvar(struct avlNode *node)
{
  return abs(node->lc->height - node->rc->height);
}

struct avlNode *leftChildFixHeightInvar(struct avlNode *node)
{
  int xHeightDiff = checkHeightInvar(node);

  if (xHeightDiff > 1) {
	int yHeightDiff = checkHeightInvar(node);

	// node y is right heavy. Zig-Zag chain
	if (yHeightDiff == -1) 
	{
	  leftRotate(node->lc);
	  rightRotate(node);
	  return node->rc;
	}
	// y is left heavy. Straight chain
	else
	{
	  rightRotate(node);
	  return node;
	}
  }
}

struct avlNode *rightChildFixHeightInvar(struct avlNode *node) {
  int xHeightDiff = checkHeightInvar(node);

  if (xHeightDiff > 1) {
	int yHeightDiff = checkHeightInvar(node);

	// node y is left heavy. Zig-Zag chain
	if (yHeightDiff == 1) 
	{
	  rightRotate(node->rc);
	  leftRotate(node);
	  return node->rc;
	}
	// y is right heavy. Straight chain
	else
	{
	  leftRotate(node);
	  return node;
	}
  }
}

struct avlNode *bstInsert(struct avlNode *node, int key)
{
  // node being inserted as left child
  if (key < node->key)
  {
	if (node->lc == NULL) {
	  struct avlNode *newNode = nodealloc(key);
	  node->lc = newNode;
	  return leftChildFixHeightInvar(node);
	}

	struct avlNode *updatedRoot = bstInsert(node->lc, key);

	// update root after insertion
	node->lc = updatedRoot;
	return leftChildFixHeightInvar(node);
  }

  // node being inserted as right child
  else
  {
	if (node->rc == NULL)
	{
	  struct avlNode *newNode = nodealloc(key);
	  node->rc = newNode;
	  return rightChildFixHeightInvar(node);
	}

	struct avlNode *updatedRoot = bstInsert(node->rc, key);

	// update root after insertion
	node->rc = updatedRoot;
	return rightChildFixHeightInvar(node);
  }
}

struct avlNode *findSuccessor(struct avlNode *node)
{
  struct avlNode *stub = node;

  while(stub->lc != NULL)
  {
	stub = stub->lc;
  }

  return stub;
}

struct avlNode *leftRotate(struct avlNode *node)
{
  // store ref to y
  struct avlNode *y = node->lc;
  if (y->rc != NULL) {
	node->lc = y->rc;
	y->rc->lc = y;
	// make y's rc's lc, rc of y
	if (y->rc->lc != NULL) {
	  y->rc = y->rc->lc;
	}
  }

  updateHeight(y);
}

struct avlNode *rightRotate(struct avlNode *node)
{
  // store ref to y
  struct avlNode *y = node->lc;

  if (y->rc != NULL) {
	node->lc = y->rc;
  }
  y->rc = node;

  updateHeight(node);
}

void updateHeight(struct avlNode *node)
{
  node->height = 1 + (node->lc->height > node->rc->height ? node->lc->height : node->rc->height);
}

void print2D(struct avlNode *node, int space) {
  if (node == NULL) {
    return;
  }

  space += COUNT;

  print2D(node->rc, space);

  printf("\n");
  for (int i = COUNT; i < space; i++) {
    printf(" ");
  } 
  printf("%d\n", node->key);

  print2D(node->lc, space);
}

