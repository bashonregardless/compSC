/*
 * Input format:
 *
 * Space seperated string of traversal.
 *
 * argv[1]: inorder traversal of tree
 * argv[2]: preorder traversal of tree
 * argv[3]: postorder traversal of tree
 */

/*
 * Traversals:
 *
 * Inorder: Left Node Right
 * Preorder: Node Left Right
 *
 * In preorder, first element is the root of the tree.
 */

/*
 * Q. If you are given two traversal sequences, can you construct the
 * binary tree?
 * A. It depends on what traversals are given. If one of the traversal
 * methods is Inorder then the tree can be constructed, otherwise not.
 *
 *
 * Therefore, following combination can uniquely identify a tree.
 *
 * Inorder and Preorder.
 * Inorder and Postorder.
 * Inorder and Level-order.
 *
 *
 * And following do not.
 *
 * Postorder and Preorder.
 * Preorder and Level-order.
 * Postorder and Level-order.
 *
 *
 * So, even if three of them (Pre, Post and Level) are given, the tree
 * can not be constructed.
 */

/* 
 * Q. How many and which traversals is(are) required to construct a general tree
 * and,
 * how many and which traversals is(are) required to construct a BST?
 *
 * A. To construct a BST you need only one (not in-order) traversal.
 *
 * In general, to build a binary tree you are going to need two traversals,
 * in order and pre-order for example. However, for the special case of
 * BST - the in-order traversal is always the sorted array containing the 
 * elements, so you can always reconstruct it and use an algorithm to reconstruct
 * a generic tree from pre-order and in-order traversals.
 *
 * So, the information that the tree is a BST, along with the elements in it
 * (even unordered) are equivalent to an in-order traversal.
 *
 * Given preorder or postorder traversal of a binary search tree, construct of
 * BST is possible.
 */

#include <stdio.h>
#include <stdlib.h>

char* customStrcpy(char* tokensInputStr, int currTokStartIdx, int currTokLen)
{
  int tokLen = currTokLen + 1;
  char* tok = (char *)malloc(tokLen * sizeof(char));

  if (!tok)
  {
	fputs("error: token allocation failed, exiting", stderr);
	exit(EXIT_FAILURE);
  }

  tok[tokLen] = '\0';
  while(tokLen)
  {
	tok[tokLen - 1] = tokensInputStr[currTokStartIdx + tokLen - 1];
	tokLen--;
  }
  return tok;
}

void tokenize(char* tokensInputStr, char* tokensStorage[], int* tokIdx)
{
  int charIdx = 0, currTokLen = 0, currTokStartIdx = 0;
  char ch = tokensInputStr[0];

  while (ch != '\0')
  {
	charIdx++;
	if (ch != ' ')
	{
	  currTokLen++;
	}
	else
	{
	  tokensStorage[*tokIdx] = customStrcpy(tokensInputStr, currTokStartIdx, currTokLen);
	  currTokStartIdx = charIdx;
	  currTokLen = 0;
	  ++*tokIdx; /* Difference between ++*p, *p++ and *++p
					ref: https://www.geeksforgeeks.org/difference-between-p-p-and-p/ for
					*/
	}
	ch = tokensInputStr[charIdx];
  }

  // extract the last token
  ch = tokensInputStr[charIdx];
  if (ch == '\0')
  {
	tokensStorage[*tokIdx] = customStrcpy(tokensInputStr, currTokStartIdx, currTokLen);
  }
}

void printTraversalArr(char* tokens[], int tokensLen)
{
  for (int i = 0; i <= tokensLen; i++)
  {
	printf("%s ", tokens[i]);
  }
  printf("\n");
}

int main(int argc, char **argv)
{
  char chIn = *(argv + 1)[0];
  char chPre = *(argv + 2)[0];

  char* inTokens[20];
  char* preTokens[20];
  int inTokIdx = 0;
  int preTokIdx = 0;

  tokenize(argv[1], inTokens, &inTokIdx);
  tokenize(argv[2], preTokens, &preTokIdx);

  printTraversalArr(inTokens, inTokIdx);
  printTraversalArr(preTokens, preTokIdx);

  // generate tree
  
}
