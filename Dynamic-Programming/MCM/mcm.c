/* MATRIX-CHAIN-MULTIPLICATION - CLRS 3rd Edition, Chapter 15 */

#include <stdlib.h>
#include <limits.h>


/* Note that this will only work on statically-allocated arrays, and only when called 
 * using the original array (it won't work when using a pointer to the array). This is 
 * because when you write sizeof(x) where x is a pointer to an array, the compiler 
 * interprets it literally. It doesn't have any way of mapping x back to the array 
 * that it points to before evaluating the sizeof.
 */
#define array_length(arr) (sizeof(arr) == 0 ? 0 : sizeof(arr) / sizeof((arr)[0]));

/* define input sequence to matrix_chain_order function */
const int INPUT_SEQUENCE[] = {4, 10, 3, 12, 20};

/* The function computes the rows from bottom to top and from left to right within
 * each row.
 * It computes each entry m[i, j] using products p_suffix_i-1 * p_suffix_k * p_suffix_j
 * for k = i, i + 1, ...., j - 1 and all entries southwest and southeast from m[i, j].
 *
 * This prodedure assumes that matrix A_suffix_i has dimensions p_suffix_i-1 * p_suffix_i
 * for i = 1, 2, ...., n.
 * Its input is a sequence p = <p_suffix_0, p_suffix_1, ...., p_suffix_n>, where
 * p.length = n + 1.
 *
 * THe procedure uses an auxiliary table m[1 ..n, 1 ..n] for storing the m[i, j] costs,
 * and another auxiliary table s[1 ..n - 1, 2 ..] that records which index of k achieved
 * the optimal cost in computing m[i, j].
 */
void matrix_chain_order ();

int main () {
  matrix_chain_order();
  return 0;
}

/* To know the size of an array passed to the function. */ 
/* When you pass an array to a function, it decays into a pointer to the first element,
 * at which point knowledge of its size is lost. You need to work it out before decay 
 * and pass that information with the array.
 */
/* Therefore, This cannot be done inside matrix_chain_order(int INPUT_SEQUENCE[]) {}. 
 * int sequence_len = sizeof(* INPUT_SEQUENCE) / sizeof(INPUT_SEQUENCE[0]);
 */
void matrix_chain_order() {
  int sequence_len = array_length(INPUT_SEQUENCE);

  /* initialize table (2-D array), m[1 ..n, 1..n] */
  int m = 0, n = 0;
  int cost_table[sequence_len][sequence_len];
  for (m = 0; m < sequence_len; m++) {
	for (n = 0; n < sequence_len; n++) {
	  cost_table[m][n] = INT_MIN;
	}
  }
}
