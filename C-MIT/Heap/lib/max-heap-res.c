#include "max-heap.h"

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

/* Max-Heap property: 
 * every node i other than the root,
 *
 * A[Parent(i)] >= A[i]
 *
 * i.e, the value of a node is at most the value of its parent.
 * Thus, the largest element in a max heap is stored at the root,
 * and the subtree rooted at a node contains values no larger than
 * that contained at the node itself.
 */


/* In order to maintain max-heap property, we call the procedure MAX_HEAPIFY.
 * Its inputs are an array A and an index i into the array.
 *
 * At each step, the largest of the elements A[i], A[Left(i)], and A[Right(i)] is
 * determined, and its index is stored in largest.
 * If A[i] is the largest, then the subtree rooted at node i is already a max-heap
 * and the procedure terminates.
 * Otherwise, one of the two children has the largest element, and the A[i] is swapped
 * with A[largest] which causes node i and its children to satisfy the max-heap
 * property.
 *
 * The node indexed by largest, however, now has the original value A[i], and thus the
 * subtree rooted at largest might violate the max-heap property. Consequently, we call 
 * MAX_HEAPIFY recursively on that subtree.
 */
void max_heapify (int arr[], int i, int arr_len)
{
  int largest = i;
  int l = left(i);
  int r = right(i);

  if (l < arr_len && arr[l] > arr[i]) {
	largest = l;
  } 

  if (r < arr_len && arr[r] > arr[largest]) {
	largest = r;
  }

  if (largest != i) {
	swap(arr, i, largest);
	max_heapify(arr, largest, arr_len);
  }
}

/* procedure MAX-HEAPIFY is used in a bottom-up manner to convert an array
 * A[1..n], where n = A.length, into max-heap.
 * The elements in the subarray A[(floor(n/2) + 1)..n] are all leaves of the
 * tree, and so each is a 1-element heap to begin with.
 * The procedure BUILD-MAX-HEAP goes through the remaining nodes of the tree
 * and runs MAX-HEAPIFY on each one.
 */
void build_max_heap (int arr[], int arr_len) 
{
  int heap_size = arr_len;

  for (int i = floor(arr_len / 2); i >= 0; i--) {
	max_heapify(arr, i, arr_len);
  }
}

/* heapsort algorithm starts by using BUILD-MAX-HEAP to build a max-heap
 * on the input array A[1..n], where n = A.length. Since the maximum element of the
 * array is stored at the root A[1], we can put it into its correct final position 
 * by exchanging it with A[n].
 * If we now discard node n from the heap- and we can do so by simply decrementing
 * A.heap-size- we observe that the children of the root remain max-heaps, but the 
 * new root might violate the max-heap property. All we need to do to restore the
 * max-heap property, however is call MAX-HEAPIFY(A, 1), which leaves max-heap in
 * A[1..n-1].
 * The heapsort algorithm then repeats this process for the max-heap of size n-1 down
 * to a heap of size 2.
 */
void heap_sort (int arr[], int arr_len)
{
  build_max_heap(arr, arr_len);

  for (int i = arr_len; i >= 1; i--) {
	swap(arr, 0, i);
	max_heapify(arr, 0, arr_len);
  }
}
