/* MATRIX-CHAIN-MULTIPLICATION - CLRS 3rd Edition, Chapter 15 */

#include <stdlib.h>
#include <stdio.h>
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
//const int INPUT_SEQUENCE[] = {30, 35, 15, 5, 10, 20, 25};

/* DEFINE m[i, j]:
 * Let m[i, j] be the minimum number of scalar multiplications needed to compute
 * matrix A_suffix_i..j; for the full problem, the lowest cost way to compute A_suffix_1..n
 * would thus be m[1, n].
 */
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
 * The procedure uses an auxiliary table m[1 ..n, 1 ..n] for storing the m[i, j] costs,
 * and another auxiliary table s[1 ..n - 1, 2 ..] that records which index of k achieved
 * the optimal cost in computing m[i, j].
 */
void matrix_chain_order (int ct_rows, int ct_cols, int cost_table[ct_rows][ct_cols], int kit_rows, int kit_cols, int k_idx_table[kit_rows][kit_cols]);

void print_optimal_parens (int kit_rows, int kit_cols, int k_idx_table[kit_rows][kit_cols], int i, int j);

void pretty_print_array (int rows, int cols, int md_array[rows][cols]);

int main () 
{
  int sequence_len = array_length(INPUT_SEQUENCE);

  /* initialize table (2-D array), m[1 ..n, 1..n] */
  int m = 0, n = 0;
  int cost_table[sequence_len][sequence_len];
  for (m = 0; m < sequence_len; m++) {
	for (n = 0; n < sequence_len; n++) {
	  /* m[i, i] = 0, for i = 1, 2, ...., n (the minimum costs for chains of length 1) */
	  if (n == m) {
		cost_table[m][n] = 0;
	  } else {
		cost_table[m][n] = INT_MAX;
	  }
	}
  }

  /* initialize table (2-D array), s[1 ..n - 1, 2..n] */
  int o = 0, p = 0;
  int k_idx_table[sequence_len - 1][sequence_len - 1];
  for (o = 0; o < sequence_len - 1; o++) {
	for (p = 0; p < sequence_len - 1; p++) {
	  k_idx_table[o][p] = -1;
	}
  }

  matrix_chain_order(sequence_len, sequence_len, cost_table, sequence_len, sequence_len - 1, k_idx_table);

  //print_optimal_parens(sequence_len, sequence_len - 1, k_idx_table, 0, sequence_len - 1);
  pretty_print_array(sequence_len, sequence_len, cost_table);

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
void matrix_chain_order(int ct_rows, int ct_cols, int cost_table[ct_rows][ct_cols], int kit_rows, int kit_cols, int k_idx_table[kit_rows][kit_cols]) 
{
  int sequence_len = array_length(INPUT_SEQUENCE);

  /* use recurrence,
   *
   * min[i, j] = 0 , if  i = j
   * min[i, j] = min {m[i, k] + m[k + 1, j] + p_suffix_i-1 * p_suffix_k * p_suffix_j , if i < j
   *
   * to compute m[i, i + 1] for i = 1, 2, ...., n - 1 (the minimum costs of chains of length l = 2)
   * during the first execution of the for loop.
   * The second time through the loop, it computes m[i, i + 2] for i = 1, 2, ...., n - 2
   * (the minimum costs for chains of length l = 3), and so forth.
   */
  int chain_len = 0, i = 1, j = 0, k = 0, cost = INT_MAX;
  for (chain_len = 2; chain_len < sequence_len; chain_len++) {
	for (i = 1; i < sequence_len - chain_len + 1; i++) {
	  j = i + chain_len - 1;
	  
	  for (k = i; k <= j - 1; k++) {
		/* at each step, the m[i, j] cost computed depends only on table entries m[i, k] and m[k + 1, j]
		 * already computed
		 */
		printf("Printed cost_table[%d][%d] : %d\n", i, k, cost_table[i][k]);
		printf("Printed cost_table[%d][%d] : %d\n", (k+1), j, cost_table[k+1][j]);
		cost = cost_table[i][k] + cost_table[k + 1][j] + INPUT_SEQUENCE[i - 1] * INPUT_SEQUENCE[k] * INPUT_SEQUENCE[j];

		if (cost < cost_table[i][j]) {
		  cost_table[i][j] = cost;
		  k_idx_table[i][j] = k;
		}
	  }
	}
  }
}

void print_optimal_parens (int kit_rows, int kit_cols, int k_idx_table[kit_rows][kit_cols], int i, int j)
{
  if (i == j) {
	printf("A<%d>", i);
  }
  else {
	printf ("(");
	print_optimal_parens(kit_rows, kit_cols, k_idx_table, i, *k_idx_table[i, j]);
	print_optimal_parens(kit_rows, kit_cols, k_idx_table, *k_idx_table[i, j] + 1, j);
	printf(")");
  }
}

void pretty_print_array (int rows, int cols, int md_array[rows][cols]) {
  int i = 0, j = 0;
  for (i = 0; i < rows; i++) {
	for (j = 0; j < cols; j++) {
	  printf("%12d", md_array[i][j]);
	}
	printf("\n");
  }
}
