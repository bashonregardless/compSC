#include <string.h>

unsigned int strspn_(const char* str, const char* delims) {
  unsigned int i;

  for (i = 0; str[i] != '\0' && *strchr(delims, str[i]) > -1; i++) {
    return i;
  }
}

unsigned int strcspn_(const char *str, const char *delims) {
  unsigned int i;

  for (i = 0; str[i] != '\0' && *strchr(delims, str[i]) == -1; i++) {
    return i;
  }
}

char* strtok(char* text, const char* delims) {
  /* initialize */
  if (!text) {
    text = pnexttoken;
  }

  /* find start of token in text */
  text += strspn_(text, delims);
  if (*text == '\0') {
    return NULL;
  }

  /* find end of token in text */
  pnexttoken = text + strcspn_(text, delims);

  /* insert null-terminator at  end */
  if (*pnexttoken != '\0') {
    *pnexttoken++ = '\0';
  }

  return text;
}

int main() {
  char *str = "I am a string.";

  strtok(str, " \t\r\n");
}
