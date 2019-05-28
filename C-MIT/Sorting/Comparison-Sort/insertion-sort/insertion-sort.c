#include <stdio.h> 

#define array_length(arr) (sizeof(arr) == 0 ? 0 : sizeof(arr)/sizeof((arr)[0]));
int arr[] = { 12, 11, 13, 5, 6 };

/* move previous element down until insertion point reached */
void shift_element(unsigned int i) {
  int ivalue;

  /* guard against going outside of array */
  for (ivalue = arr[i]; i && arr[i - 1] > ivalue; i--) {
    arr[i] = arr[i - 1]; /* move element down */
  }

  arr[i] = ivalue; /* insert element */
}

/* iterate until out-of-order element found; 
 * shift the element and continue iterating */
void insertion_sort(void) {
  unsigned int i, len = array_length(arr); 
  for (i = 1; i < len; i++) {
    if (arr[i] < arr[i - 1]) {
      shift_element(i);
    }
  }
}

/* iterate through array and print in indices order */
void printArr() {
  unsigned int i, len = array_length(arr); 
  for (i = 0; i < len; i++) {
    printf("%d", arr[i]);
    printf("\n");
  }
}

int main() {
  insertion_sort();
  printArr();

  return 0;
}
