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
  struct avlNode* lc;
  struct avlNode* rc;
};

struct avlNode* nodealloc(int key);
struct avlNode* bstInsert(struct avlNode* node, int key);
int checkHeightInvar(struct avlNode* node);

struct avlNode* rightRotate(struct avlNode* node);
struct avlNode* leftRotate(struct avlNode* node);
struct avlNode* findSuccessor(struct avlNode* node);
struct avlNode* leftChildFixHeightInvar(struct avlNode* node);
struct avlNode* rightChildFixHeightInvar(struct avlNode* node);
void updateHeight(struct avlNode* node);
void print2D(struct avlNode* node, int space);

// It is not possible to return an array from a function, but a pointer.
char* customStrcpy(char source[], int startIdx, int len);

char* customStrcpy(char* source, int startIdx, int len)
{
  int tokLen = len + 1; // len plus 1 for null termination character '\0'
  char* token = malloc((tokLen) * sizeof(char));

  if (!token)
  {
	fputs("error: token allocation failed, exiting.", stderr);
	exit(EXIT_FAILURE);
  }

  token[tokLen] = '\0'; // assign null termination character to last index
  while (tokLen)
  {
	token[tokLen - 1] = source[startIdx + tokLen - 1];
	tokLen--;
  }
  return token;
}

int main (int argc, char* argv[])
{
  char ch = argv[1][0];
  int integerTokens[20];
  int tokenIdx = 0;

  /*
   * Calculate length of input string:
   * 
   * If you have only pointer to an array, then there's no way to find the
   * number of elements in the pointed-to array. You have to keep track of
   * that yourself.
   * Eg, given:
   * `
   * char x[10];
   * char* pointer_to_x = x;
   * `
   * there is no way to tell from 'pointer_to_x' that it points to an array
   * of 10 elements.
   *
   */
  /*
   * What's the default value? `int i;`.
   *
   * If you declare `int i;` as a (non-static) local variable inside of a
   * function, it has an indeterminate value. It is uninitialized and you
   * can't use it until you write a valid value to it.
   *
   * It's a good habit to get into explicitly initialize any object when
   * you declare it.
   *
   */
  int inpLen = 0;
  while(ch != '\0')
  {
	ch = argv[1][inpLen];
	inpLen++;
  }
  // print length of input string
  printf("length of input string: \"%s\" is %d\n", argv[1], inpLen);

  /* 
   * ref: Stanford Essential C, Advanced Arrays and Pointers.
   *
   * There's a library function called `strcpy(char* destination, char* source)`
   * which copies the bytes of a C string from one place to another.
   * See ref for four different  implementations.
   */
  int currTokenLen = 0, currTokenStartIdx = 0, charIdx = 0;
  // where,
  // charIdx is length of string scanned.
  ch = argv[1][0];
  // extract all but the last token
  while(ch != '\0')
  {
	charIdx++;
	if (ch != ' ')
	{
	  currTokenLen++;
	}
	else
	{
	  integerTokens[tokenIdx] = atoi(customStrcpy(argv[1], currTokenStartIdx, currTokenLen));
	  currTokenStartIdx = charIdx;
	  currTokenLen = 0;
	  tokenIdx++;
	}
	ch = argv[1][charIdx];
  }

  // extract the last token
  ch = argv[1][charIdx];
  if (ch == '\0')
  {
	integerTokens[tokenIdx] = atoi(customStrcpy(argv[1], currTokenStartIdx, currTokenLen));
  }

  // print extracted tokens
  printf("\nInterger Tokens:\n");
  for (int j = 0; j <= tokenIdx; j++)
  {
	printf("%d ", integerTokens[j]);
  }
  printf("\n");

  struct avlNode* root = nodealloc(integerTokens[0]);

  for (int i = 1; i <= tokenIdx; i++)
  {
	root = bstInsert(root, integerTokens[i]);
  }

  print2D(root, COUNT);
}

struct avlNode* nodealloc(int key)
{
  struct avlNode* newNode = (struct avlNode *)malloc(sizeof(struct avlNode));

  if (!newNode)
  {
	fputs("error: node allocation failed, exiting", stderr);
	exit(EXIT_FAILURE);
  }

  newNode->key = key;
  newNode->height = 0;
  newNode->lNullHeight = -1;
  newNode->rNullHeight = -1;
  return newNode;
}

int checkHeightInvar(struct avlNode* node)
{
  if (node->lc != NULL && node->rc != NULL)
  {
	return node->lc->height - node->rc->height;
  }
  else
  {
	if (node->lc == NULL && node->rc != NULL)
	{
	  return -1 - node->rc->height;
	}
	else if (node->lc != NULL && node->rc == NULL)
	{
	  return node->lc->height - -1;
	}
	else
	{
	  return 0;
	}
  }
}

struct avlNode* leftChildFixHeightInvar(struct avlNode* node)
{
  int xHeightDiff = checkHeightInvar(node);

  // height invar violation 
  if (abs(xHeightDiff) > 1) {
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
  // height invar satisfied
  else
  {
	return node;
  }
}

struct avlNode* rightChildFixHeightInvar(struct avlNode* node) {
  int xHeightDiff = checkHeightInvar(node);

  if (abs(xHeightDiff) > 1) {
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
  // heght invar satisfied
  else
  {
	return node;
  }
}

struct avlNode* bstInsert(struct avlNode* node, int key)
{
  // node being inserted as left child
  if (key < node->key)
  {
	if (node->lc == NULL) {
	  struct avlNode* newNode = nodealloc(key);
	  node->lc = newNode;
	  return leftChildFixHeightInvar(node);
	}

	struct avlNode* updatedRoot = bstInsert(node->lc, key);

	// update root after insertion
	node->lc = updatedRoot;
	return leftChildFixHeightInvar(node);
  }

  // node being inserted as right child
  else
  {
	if (node->rc == NULL)
	{
	  struct avlNode* newNode = nodealloc(key);
	  node->rc = newNode;
	  return rightChildFixHeightInvar(node);
	}

	struct avlNode* updatedRoot = bstInsert(node->rc, key);

	// update root after insertion
	node->rc = updatedRoot;
	return rightChildFixHeightInvar(node);
  }
}

struct avlNode* findSuccessor(struct avlNode* node)
{
  struct avlNode* stub = node;

  while(stub->lc != NULL)
  {
	stub = stub->lc;
  }

  return stub;
}

struct avlNode* leftRotate(struct avlNode* node)
{
  // store ref to y
  struct avlNode* y = node->lc;
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

struct avlNode* rightRotate(struct avlNode* node)
{
  // store ref to y
  struct avlNode* y = node->lc;

  if (y->rc != NULL) {
	node->lc = y->rc;
  }
  y->rc = node;

  updateHeight(node);
}

void updateHeight(struct avlNode* node)
{
  node->height = 1 + (node->lc->height > node->rc->height ? node->lc->height : node->rc->height);
}

void print2D(struct avlNode* node, int space) {
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

