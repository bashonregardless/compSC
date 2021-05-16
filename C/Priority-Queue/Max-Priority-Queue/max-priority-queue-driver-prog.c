#include "max-heap-hdr.h"
#include "max-priority-queue-hdr.h"

int main ()
{
  int arr[] = {4, 1, 3, 2, 16, 9, 10, 14, 8, 7};
  int arr_len = arr_length(arr);
  
  build_max_heap(arr, arr_len);

  printf("heap_maximum: %d\n", heap_maximum(arr));

  printf("heap_extract_max: %d\n", heap_extract_max(arr, arr_len));

  printf("Before heap_increase_key:\n"); 
  for (int i = 0; i < arr_len; i++) {
	printf("%d ", arr[i]);
  }

  heap_increase_key(arr, 9, 15);
  printf("After heap_increase_key:\n"); 
  for (int i = 0; i < arr_len; i++) {
	printf("%d ", arr[i]);
  }

  printf("Before max_heap_insert:\n"); 
  for (int i = 0; i < arr_len; i++) {
	printf("%d ", arr[i]);
  }

  max_heap_insert(arr, arr_len, 13);
  printf("After max_heap_insert:\n"); 
  for (int i = 0; i < arr_len; i++) {
	printf("%d ", arr[i]);
  }
}
