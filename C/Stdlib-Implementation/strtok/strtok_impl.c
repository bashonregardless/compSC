/* string is tokenized at any delimiter in string delims */
#include <stdio.h>
#include <string.h>
#define STR_LEN 256

/*
 * Position value of delim character in string " \t\r\n"
 * are enumerated to get integer identifying delimiter.
 */
unsigned int
strspn_(const char ch, const char* delims) 
{
  unsigned int i;

  for (i = 0; ch != '\0' && strchr(delims, ch); i++) {
    return i;
  }
  return -1;
}

/* (REFER K&R Pg99)
 * When an array name is passed to a function, what is passed
 * is the location of the initial element.
 * Within the called function, this argument is a local
 * variabe, and so an array name paramater is a pointer,
 * that is, a variable containing an address.
 *
 * Pointer arithmetic expression like `s++` in callee has no 
 * effect on character string in the function that called the callee.
 */
void
strtok_impl(char* text, const char* delims, char *token) 
{
  static const char *str;
  static char *pnexttoken;
  int i, delimid;

  /* initialize */
  if (text != NULL) {
	str = text;
	pnexttoken = str;
  }
  else {
	/* look for next delim char in str */
	/* copy new token from str to token[] */
	i = 0;
	while (1) {
	  if ((delimid = strspn_(*pnexttoken, delims)) == -1) {
		token[i++] = *pnexttoken;
		pnexttoken++;
	  }
	  else {
		pnexttoken++;
		break;
	  }
	}
	/* insert null-terminator at  end */
	token[i] = '\0';
  }
}

int main() {
  char *str = "I am a string.";
  char *token1;
  char token2[STR_LEN];
  char token3[STR_LEN];
  char token4[STR_LEN];
  char token5[STR_LEN];

  strtok_impl(str, " \t\r\n", token1);
  strtok_impl(NULL, " \t\r\n", token2);
  strtok_impl(NULL, " \t\r\n", token3);
  strtok_impl(NULL, " \t\r\n", token4);
  strtok_impl(NULL, " \t\r\n", token5);
  printf("token2: %s\n", token2);
  printf("token3: %s\n", token3);
  printf("token4: %s\n", token4);
  printf("token5: %s\n", token5);
}
