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

#include <stdlib.h>
#include <stdio.h>
#include <math.h>

#define parent(i) (floor(i));

/* On most computers, the left procedure can compute 2i in one instruction
 * by simply shifting the binary representation of i left by one bit position.
 */
#define left(i) (i << 1);

/* Like left procedure, the right can quickly compute (2*i + 1) by shifting the
 * binary representation of i left by one bit postion and then adding 1 as the 
 * lower-order bit.
 */
#define left(i) (i << 1 + 1);

/* function declaration */ 

/* maintain the max heap property
 * O(lg n)
 * Its inputs are an array A and an index i into the array.
 * When it is called, the procedure assumes that the binary trees rooted at
 * Left(i) and Right(i) are max-heaps, but that A[i] might be smaller than its
 * children, thus violating the max-heap property.
 * This procedure lets the value at A[i] "float down" in the max-heap so that
 * the subtree rooted at index i obeys the max-heap property.
 */
void max_heapify ();

/* produce a max heap from an unsorted array */
/* O(n) */
void build_max_heap ();

/* sorts an array in place */
/* O(n lg n) */
void heapsort ();


/* procedures that allow heap to implement a priority queue */

void max_heap_insert ();

int heap_extract_max ();

void heap_increase_key ();

void heap_maximum ();

