/*
 * Input format:
 *
 * Space seperated string of traversal.
 *
 * argv[1]: inorder traversal of tree
 * argv[2]: preorder traversal of tree
 * argv[3]: postorder traversal of tree
 */


#include <stdio.h>
#include <stdlib.h>

char* customStrcpy(char* input, int currTokStartIdx, int currTokLen)
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
	tok[tokLen - 1] = input[currTokStartIdx + tokLen - 1];
	tokLen--;
  }
  return tok;
}

void tokenize(char* input, char* storage[], int* tokIdx)
{
  int charIdx = 0, currTokLen = 0, currTokStartIdx = 0;
  char ch = input[0];

  while (ch != '\0')
  {
	charIdx++;
	if (ch != ' ')
	{
	  currTokLen++;
	}
	else
	{
	  storage[*tokIdx] = customStrcpy(input, currTokStartIdx, currTokLen);
	  currTokStartIdx = charIdx;
	  currTokLen = 0;
	  ++*tokIdx;
	}
	ch = input[charIdx];
  }

  // extract the last token
  ch = input[charIdx];
  if (ch == '\0')
  {
	storage[*tokIdx] = customStrcpy(input, currTokStartIdx, currTokLen);
  }
}

void printTraversalArr(char* tokens[], int tokensLen)
{
  for (int i = 0; i < tokensLen; i++)
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
}
