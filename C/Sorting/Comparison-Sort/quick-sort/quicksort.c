#include <stdio.h>
#define array_length(arr) (sizeof(arr) == 0 ? 0 : sizeof(arr) / sizeof((arr)[0]));

void swap(int* a, int* b) {
  int t = *a;
  *a = *b;
  *b = t;
}

int partition(int arr[], int p, int r) {
  int pivot_value = arr[r], i = p - 1, j = p;

  for (; j < r; j++) {
    if (arr[j] <= pivot_value) {
      i = i + 1;
      swap(&arr[i], &arr[j]);
    }
  }

  swap(&arr[i + 1], &arr[r]);
  return i + 1;
}

void quicksort(int arr[], int p, int r) {
  if (p < r) {
    int pivot = partition(arr, p, r);
    quicksort(arr, p, pivot - 1);
    quicksort(arr, pivot + 1, r);
  }
}

void print_arr(int arr[], int len) {
  int i;
  for (i = 0; i < len; i++) {
    printf("%d", arr[i]);
    printf("\n");
  }
}

int main() {
  int arr[] = { 12, 11, 13, 5, 6 }, len = array_length(arr);
  quicksort(arr, 0, len - 1);
  print_arr(arr, len);

  return 0;
}
