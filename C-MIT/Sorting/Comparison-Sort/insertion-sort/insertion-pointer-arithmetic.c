#include <stdio.h>

#define array_length(arr) (sizeof(arr) == 0 ? 0 : sizeof(arr)/sizeof((arr)[0]));
int arr[] = { 12, 11, 13, 5, 6 };

/* move previous element down until insertion point reached */
void shift_element(int *pElement) {
  int ivalue = *pElement;

  /* guard against going outside of array */
  for (ivalue = *pElement; pElement > arr && *(pElement - 1) > ivalue; pElement--) {
    *pElement = *(pElement - 1); /* move element down */
  }

  *pElement = ivalue; /* insert element */
}

/* iterate until out-of-order element found;
 * shift the element and continue iterating */
void insertion_sort(void) {
  int *pElement, *pEnd = arr + array_length(arr);
  for (pElement = arr + 1; pElement < pEnd; pElement++) {
    if (*pElement < *(pElement - 1)) {
      shift_element(pElement);
    }
  }
}

/* iterate through array and print in indices order */
void print_arr() {
  unsigned int i, len = array_length(arr);
  for (i = 0; i < len; i++) {
    printf("%d", arr[i]);
    printf("\n");
  }
}

int main() {
  insertion_sort();
  print_arr();

  return 0;
}
