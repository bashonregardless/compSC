#include <stdio.h>
#include <stdlib.h>

#define arrLen(arr) (sizeof(arr) == 0 ? 0 : sizeof(arr) / sizeof((arr)[0]))

// It is not possible to return an array from a function, but a pointer.

char *customStrcpy(char* source, int startIdx, int len)
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

int main (int argc, char* argv[])
{
  char ch = argv[1][0];
  char* integerTokens[5];
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
   * There's a library function called `strcpy(char *destination, char *source)`
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
	  integerTokens[tokenIdx] = customStrcpy(argv[1], currTokenStartIdx, currTokenLen);
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
	integerTokens[tokenIdx] = customStrcpy(argv[1], currTokenStartIdx, currTokenLen);
  }

  // print extracted tokens
  printf("\nInterger Tokens:\n");
  for (int j = 0; j <= tokenIdx; j++)
  {
	printf("%s", integerTokens[j]);
  }

  // deallocate all pointer in `integerToken` array
  while(tokenIdx >= 0)
  {
	free(integerTokens[tokenIdx]);
	tokenIdx--;
  }


  // study on length of pointers, char and function of arrLen Macro
  printf("\n\nsize of char: %lu\nsize of argv[1]: %lu\narray len using \"#define arrLen(arr) (sizeof(arr) = 0 ? 0 : sizeof(arr) / sizeof((arr)[0]))\": %lu\n", sizeof(char), sizeof(argv[1]), arrLen(argv[1]));
  /*
   * Conclusion:
   * size of char is 1 byte.
   * size of pointer is 8 byte.
   *
   * `sizeof(argv[1])` calculates the size of pointer to first argument.
   * `sizeof(argv[0])` will also yield the same result.
   */
}

