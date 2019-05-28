#include <stdio.h>
#define array_length(arr) (sizeof(arr) == 0 ? 0 : sizeof(arr) / sizeof((arr)[0]));

void swap(int* a, int* b) {
  int t = *a;
  *a = *b;
  *b = t;
}

int *partition(int *array, int *p, int *r) {
  int pivot_value = *p, *i = p - 1, *j = p;

  for (; j < r - 1; j++) {
    if (*j <= pivot_value) {
      i = i + 1;
      swap(i, j);
    }
  }

  swap(i + 1, r);
  return i + 1;
}

void quicksort(int *array, int *p, int *r) {
  if (*p < *r) {
    int *pivot = partition(arr, p, r);
    quicksort(array, p, pivot - 1);
    quicksort(array, pivot + 1, r);
  }
}

void print_arr() {
  unsigned int i, len = array_length(arr);
  for (i = 0; i < len; i++) {
    printf("%d", arr[i]);
    printf("\n");
  }
}

int main() {
  int arr[] = { 12, 11, 13, 5, 6 };
  quicksort(pArray, pArray, pEnd);
  print_arr();

  return 0;
}
