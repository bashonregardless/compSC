#include "max-heap-hdr.h"
#include "max-priority-queue-hdr.h"

int heap_maximum (int arr[]) 
{
  return arr[0];
}

/* HEAP-EXTRACT-MAX procedure is similar to the for loop body of
 * HEAPSORT procedure.
 */
int heap_extract_max (int arr[], int arr_len)
{
  if (arr_len < 1) {
	printf("Heap underflow");
	exit(EXIT_FAILURE);
  }

  int max = arr[0];
  arr[0] = arr[arr_len];
  // A.heap_size = A.heap_size - 1;
  max_heapify(arr, 0, arr_len);
  return max;
}

/* An index i into the array identifies the priority-queue element 
 * whose key we wish to increase.
 * The procedure first updates the key of element A[i] to its new
 * value.
 * Because increasing a key of A[i] might violate the max-heap property,
 * the procedure then, in a manner reminiscent of the insertion loop of
 * INSERTION-SORT, traverses a simple path from this node toward the root
 * to find a proper place for the newly increased key.
 * As HEAP-INCREASE-KEY traverses this path, it repeatedly compares an
 * element to its parent, exchanging their keys and and continuing if the
 * element's key is larger, and terminating if the elements key is smaller.
 */
void heap_increase_key (int arr[], int i, int key)
{
  if (key < arr[i - 1]) {
	exit(EXIT_FAILURE);
  }

  arr[i - 1] = key;
  int k = parent(i);
  while (i > 0 && arr[k] < arr[i - 1]) {
	swap(arr, i - 1, k);
	i = parent(i);
  }
}

/* MAX-HEAP-INSERT takes as input the key of the new element to be inserted
 * into max-heap A.
 * The procedure first expands the max-heap by adding to the tree a new leaf
 * whose key is -INFINITY. Then it calls HEAP-INCREASE-KEY to set the key of
 * this new node to its correct value and maintain the max-heap property.
 */
void max_heap_insert (int arr[], int arr_len, int key)
{
  //A.heap_size = A.heap_size + 1;
  //arr[arr_len] = ;
  heap_increase_key(arr, /*A.heap_size,*/ arr_len, key);
}
