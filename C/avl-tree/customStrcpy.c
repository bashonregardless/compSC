#include <stdio.h>
#include <stdlib.h>

// It is not possible to return an array from a function, but a pointer.
//char *customStrcpy(char source[], int startIdx, int len);

char *customStrcpy(char* source, int startIdx, int len)
{
  int i = 0, tokLen = len + 1;
  char* token = malloc((len + 1) * sizeof(char));

  while (tokLen)
  {
	token[i] = source[startIdx + i];
	tokLen--;
	i++;
  }
  token[i + 1] = '\0';
  return token;
}

int main (int argc, char* argv[])
{
  char ch = argv[1][0];
  char* integerTokens[5];
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
   * If you declare `int i;` as a (non-static) local variable inside of a
   * function, it has an indeterminate value. It is uninitialized and you
   * can't use it until you write a valid value to it.
   *
   * It's a good habit to get into explicitly initialize any object when
   * you declare it.
   *
   */
  int count = 0;
  while(ch != '\0')
  {
	ch = argv[1][count];
	count++;
  }
  int inpLen = count;

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
  ch = argv[1][0];
  while(ch != '\0')
  {
	charIdx++;
	if (ch != ' ')
	{
	  currTokenLen++;
	}
	else
	{
	  integerTokens[tokenIdx] = customStrcpy(argv[1], currTokenStartIdx, currTokenLen);
	  currTokenStartIdx = charIdx;
	  currTokenLen = 0;
	  tokenIdx++;
	}
	ch = argv[1][charIdx];
  }

  ch = argv[1][charIdx];
  if (ch == '\0')
  {
	integerTokens[tokenIdx] = customStrcpy(argv[1], currTokenStartIdx, currTokenLen);
  }

  printf("Interger Tokens:\n");
  for (int j = 0; j <= tokenIdx; j++)
  {
	printf("%s", integerTokens[j]);
  }

  printf("\n\nlength of input string: \"%s\" is %d\n", argv[1], count);

  //printf("array: %s, arrLen: %lu\n", argv[1], arrLen(argv[1]));
}

