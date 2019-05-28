#include <stdio.h>

#define array_length(arr) (sizeof(arr) == 0 ? 0 : sizeof(arr) / sizeof((arr)[0]));
int arr[] = { 12, 11, 13, 5, 6 };

void swap(int* a, int* b) {
  int t = *a;
  *a = *b;
  *b = t;
}

int partition(int array[], int p, int r) {
  int pivot_value = array[r], i = p - 1, j = p;

  for (; j < r - 1; j++) {
    if (array[j] <= pivot_value) {
      i = i + 1;
      swap((array + i), (array + j));
    }
  }

  swap((array + i + 1), (array + r));
  return i + 1;
}

void quicksort(int array[], int p, int r) {
  if (p < r) {
    int pivot = partition(array, p, r);
    quicksort(array, p, pivot - 1);
    quicksort(array, pivot + 1, r);
  }
}

int main() {
  int len = array_length(arr);
  quicksort(arr, 0, len);

  return 0;
}
