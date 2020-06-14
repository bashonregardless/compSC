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
// It is not possible to return an array from a function, but a pointer.
char *customStrcpy(char source[], int startIdx, int len);

char *customStrcpy(char source[], int startIdx, int len)
{
  int i = 0;
  char *token = malloc(len * sizeof(char *));

  while (len)
  {
	token[i] = source[startIdx + i];
	i++;
  }
  token[i + 1] = '\0';
  return token;
}

/*
 * ref: https://stackoverflow.com/questions/13363229/notation-of-argv-in-main-function
 * Consider a program with `argc == 3`
 *
   argv
     |
     v
+---------+         +----------------+
| argv[0] |-------->| program name\0 |
+---------+         +-------------+--+
| argv[1] |-------->| argument1\0 |
+---------+         +-------------+
| argv[2] |-------->| argument2\0 |
+---------+         +-------------+
|    0    |
+---------+
*
* The variable argv points to the start of an array of pointers.
* argv[0] is the first pointer. It points at the program name
* (or, if the system cannot determine the program name, then the string for
* argv[0] will be an empty string; `argv[0][0] == '\0'`)
*
* The other detail you need to know, of course, is that
* array[i] == *(array + i) for any array.
*
* Q. Why does **argv point to the first char and not the whole string?
* A. *argv is equivalent to *(argv + 0) and hence argv[0]. It is a `char *`.
*    When you dereference a `char *`, you get the 'first' character in the
*    string. `**argv` is therefore equivalent to *(argv[0] + 0) or argv[0][0].
*
*    (It can be legimately argued that **argv is a character, not a pointer,
*    so it doesn't 'point to the first char'. It is simply another name for
*    the 'p' in "program name\0".
*
*    Likewise, *argv[0] point to the same thing. As noted before, argv[0] is
*    a pointer to the string; therefore *argv[0] must be the first character
*    in the string.
*
* Q. Why does *argv point to the whole string, instead of the first character
*    like the previous example?
* A. This is a question of convention. *argv points at the first character of
*    the first string.
*    If you interpret it as a pointer to a string, it points
*    to the whole string, in the same way that `char *str = "Hello world\n;"
*    points to 'the whole string'.
*    If you interpret it as a pointer to a single character, it points to the
*    first character of the string.
*    Think of it as like wave-particle duality, only here it is character-string
*    duality.
*
* Q. Why does `*argv + 1` point to string second char instead of pointing to
*    the next string in the array?
* A. `*argv + 1` is `(*argv) + 1`. As already discussed, *argv points to the
*    first character of the first string. If you add 1 to a pointer, it points
*    to the next item; since *argv points at a character, `*argv + 1` points
*    to the next character.
*
*    `*(argv + 1)` points to the (first character of the) next string.
*
*/

int main (int argc, char *argv[])
{
  char *inputArr = argv[1];
  char *ch = argv[1];
  char **integerTokens[50];
  int tokenIdx = 0;

  // calculate length of input string
  /*
   * If you have only pointer to an array, then there's no way to find the
   * number of elements in the pointed-to array. You have to keep track of
   * that yourself.
   * Eg, given:
   * `
   * char x[10];
   * char *pointer_to_x = x;
   * `
   * there is no way to tell from 'pointer_to_x' that it points to an array
   * of 10 elements.
   *
   */
  /*
   * What's the default value? `int i;`.
   *
   * If ypu declare `int i;` as a (non-static) local variable inside of a
   * function, it has an indeterminate value. It is uninitialized and you
   * can't use it until you write a valid value to it.
   *
   * It's a good habit to get into explicitly initialize any object when
   * you declare it.
   *
   */
  int count = 0;
  while(*ch != '\0')
  {
	*ch = argv[1][count];
	count++;
  }
  int inpLen = count;
  //*ch = *(argv[1] - inpLen);


  // ref: Stanford Essential C, Advanced Arrays and Pointers.
  /* 
   * There's a library function called `strcpy(char *destination, char *source)`
   * which copies the bytes of a C string from one place to another.
   * Below is an implementation of `strcpy()`. See ref for four different
   * implementations. Here, implementing the best stylistically among the
   * four:
   *
   */
  int currTokenLen = 0, currTokenStartIdx = 0, charIdx = 0;
  // where,
  // charIdx is length of string scanned.
  ch = argv[1];
  while(*ch != '\0')
  {
	charIdx++;
	if (*ch != ' ')
	{
	  currTokenLen++;
	}
	else
	{
	  currTokenStartIdx = charIdx;
	  integerTokens[tokenIdx] = customStrcpy(argv[1], currTokenStartIdx, currTokenLen);
	  currTokenLen = 0;
	  tokenIdx++;
	}
  }

  printf("Interger Tokens\n");
  for (int j = 0; j < tokenIdx; j++)
  {
	printf("%s", integerTokens[j]);
  }

  printf("length of input string: %s is %d\n", argv[1], count);

  printf("array: %s, arrLen: %lu\n", argv[1], arrLen(argv[1]));

  struct avlNode* root = nodealloc(1);

  if (arrLen(inputArr) > 1)
  {

  } 
  else {
	//root = bstInsert(root, 1);
  }

  // print2D(root, COUNT);
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

