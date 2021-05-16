#include <stdio.h>

#define array_length(arr) (sizeof(arr) == 0 ? 0 : sizeof(arr) / sizeof((arr)[0]));
int arr[] = { 12, 11, 13, 5, 6 };

void shift_element_by_gap(unsigned int i, unsigned int gap) {
  int ivalue; 
  unsigned int j;
  
  for (j = i, ivalue = arr[i]; j >= gap && arr[j - gap] > ivalue; j -= gap) {
    arr[j] = arr[j - gap]; /* move */
  }

  arr[j] = ivalue; /* insert element */
}

void shell_sort(void) {
  unsigned int gap, i, len = array_length(arr);

  /* sort by comparing against farther away
   * elements first, then closer elements */
  for (gap = len / 2; gap > 0; gap /= 2) {
    /* do insertion-like sort, but comparing and
     * shifting elements in multiples of gap.
     * One by one select elements to the right of gap 
     * and place them at their appropriate position. */
    for (i = gap; i < len; i += 1) {
      if (arr[i - gap] > arr[i]) {
        shift_element_by_gap(i, gap); /* out of order, do shift */
      }
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
  shell_sort();
  print_arr();

  return 0;
}
