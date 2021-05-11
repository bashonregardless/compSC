/* string is tokenized at any delimiter in string delims */
/*
 * Position value of delim character in string " \t\r\n"
 * are enumerated to get integer identifying delimiter.
 */
#include <stdio.h>
#include <string.h>
#define STR_LEN 256

unsigned int
strspn_(const char ch, const char* delims) 
{
  unsigned int i;

  for (i = 0; ch != '\0' && strchr(delims, ch); i++) {
    return i;
  }
  return -1;
}

unsigned int 
strcspn_(const char ch, const char *delims) 
{
  unsigned int i;

  for (i = 0; ch != '\0' && strchr(delims, ch); i++) {
    return i;
  }
  return -1;
}

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
	token = text;
  }
  else {
	/* look for next delim char in str */
	/* copy new token from str to token[] */
	i = 0;
	while (1) {
	  if ((delimid = strspn_(*pnexttoken, delims)) == -1) {
		token[i++] = *pnexttoken;
		pnexttoken++;
		continue;
	  }
	  else
		break;
	}
	/* insert null-terminator at  end */
	token[i] = '\0';
  }
}

int main() {
  char *str = "I am a string.";
  char token1[STR_LEN];
  char token2[STR_LEN];
  char token3[STR_LEN];
  char token4[STR_LEN];
  char token5[STR_LEN];

  strtok_impl(str, " \t\r\n", &token1);
  strtok_impl(NULL, " \t\r\n", token2);
  strtok_impl(NULL, " \t\r\n", token3);
  strtok_impl(NULL, " \t\r\n", token4);
  strtok_impl(NULL, " \t\r\n", token5);
  printf("token1: %s\n", token1);
  printf("token2: %s\n", token2);
  printf("token3: %s\n", token3);
  printf("token4: %s\n", token4);
  printf("token5: %s\n", token5);
}
