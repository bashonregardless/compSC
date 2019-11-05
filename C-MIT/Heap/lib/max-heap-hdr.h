#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#define arr_length(arr) (sizeof(arr) == 0 ? 0 : sizeof(arr) / sizeof((arr)[0]));

#define swap(arr, x, y) do { typeof(arr[x]) temp = arr[x]; arr[x] = arr[y]; arr[y] = temp; } while (0);

#define parent(i) floor(i)

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

void max_heapify (int arr[], int i, int arr_len);

/* produce a max heap from an unsorted array */
/* O(n) */
void build_max_heap (int arr[], int arr_len);

/* sorts an array in place */
/* O(n lg n) */
void heapsort (int arr[], int arr_len);
