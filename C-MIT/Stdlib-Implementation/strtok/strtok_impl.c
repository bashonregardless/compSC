/* string is tokenized at any delimiter in string delims */
#include <string.h>
#define STR_LEN 256

unsigned int strspn_(const char ch, const char* delims) {
  unsigned int i;

  for (i = 0; ch != '\0' && strchr(delims, ch); i++) {
    return i;
  }
  return -1;
}

unsigned int strcspn_(const char ch, const char *delims) {
  unsigned int i;

  for (i = 0; ch != '\0' && strchr(delims, ch); i++) {
    return i;
  }
  return -1;
}

char* strtok_impl(char* text, const char* delims, char* token) {
  static const char *str;
  static char pnexttoken;
  char curtoken = pnexttoken;
  int i;

  /* initialize */
  if (strcmp(text, "") == 0) {
    return NULL;
  }

  str = text;
  if (text == NULL) {
	/* look for next delim char in str */
	while (pnexttoken != '\0') {
	  if ((strspn_(pnexttoken, delims)) == -1) {
		pnexttoken++;
		continue;
	  }
	}
	/* copy new token from str to token[] */
	for (i = 0; curtoken != pnexttoken; i++) {
	  token[i] = curtoken;
	}
	/* insert null-terminator at  end */
	(token[i] = '\0');
  }

  /* find start of token in text */
  if (*text == '\0') {
    return NULL;
  }

  return token;
}

int main() {
  char *str = "I am a string.";
  char token[STR_LEN];

  strtok_impl(str, " \t\r\n", token);
}
