/* The (binary) heap data structure is an array object that we can view as
 * as a nearly complete binary tree.
 * Each node of the tree corresponds to an element of the array.
 * The tree is completely filled on all levels except possibly the lowest,
 * which is filled from left up to a point.
 */

/* An array A that represents a heap is an object with two attributes:
 * A.length, which (as usual) gives the number of elements in the array, and
 * A.heap-size, which represents how many elements in the heap are sorted 
 * within array A. i.e,
 * although A[1..A.length] may contain numbers, only the elements in A[1..A.heap-size],
 * where 0 <= A.heap-size <= A.length, are valid elements of the heap.
 */

/* Min-Heap property:
 * every node i other than the root,
 *
 * A[Parent(i)] <= A[i]
 *
 * i.e, the value of a node is at least the value of its parent.
 * Thus, the smallest element in a min heap is stored at the root,
 * and the subtree rooted at a node contains values no smaller than
 * that contained at the node itself.
 *
 * Min-heaps commonly implement priority queues.
 */

#include <stdlib.h>
#include <stdio.h>
#include <math.h>

#define arr_length(arr) (sizeof(arr) == 0 ? 0 : sizeof(arr) / sizeof((arr)[0]));

#define swap(arr, x, y) do { typeof(arr[x]) temp = arr[x]; arr[x] = arr[y]; arr[y] = temp; } while (0);

#define parent(i) (floor(i));

/* On most computers, the left procedure can compute 2i in one instruction
 * by simply shifting the binary representation of i left by one bit position.
 */
#define left(i) ((i << 1) + 1);

/* Like left procedure, the right can quickly compute (2*i + 1) by shifting the
 * binary representation of i left by one bit postion and then adding 1 as the 
 * lower-order bit.
 */
#define right(i) ((i << 1) + 2);


/* function declaration */ 

/* maintain the min heap property */
/* O(lg n) */
void min_heapify (int arr[], int i, int arr_len);

/* produce a min heap from an unsorted array */
/* O(n) */
void build_min_heap (int arr[], int arr_len);

/* sorts an array in place */
/* O(n lg n) */
void heapsort (int arr[], int arr_len);


/* procedures that allow heap to implement a priority queue */

void min_heap_insert ();

int heap_extract_min ();

void heap_increase_key ();

void heap_minimum ();

int main () {
  int arr[] = {4, 1, 3, 2, 16, 9, 10, 14, 8, 7}; 
  int arr_len = arr_length(arr);

  build_min_heap(arr, arr_len);

  for (int i = 0; i < arr_len; i++) {
	printf("%d ", arr[i]);
  }

  return 0;
}

void build_min_heap (int arr[], int arr_len)
{
  int heap_size = arr_len;

  for (int i = floor(arr_len / 2); i >= 0; i--) {
	min_heapify(arr, i, arr_len);
  }
}

void min_heapify (int arr[], int i, int arr_len)
{
  int smallest = i;
  int l = left(i);
  int r = right(i);

  if (l < arr_len && arr[l] < arr[i]) {
	smallest = l;
  }

  if (r < arr_len && arr[r] < arr[smallest]) {
	smallest = r;
  }

  if (i != smallest) {
	swap(arr, i, smallest);
	min_heapify(arr, smallest, arr_len);
  }
}
