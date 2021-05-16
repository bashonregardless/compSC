#include <stdlib.h>
#include <stdio.h>

/* procedures that allow heap to implement a priority queue */

int heap_maximum (int arr[]);

int heap_extract_max (int arr[], int arr_len);

void heap_increase_key (int arr[], int i, int key);

void max_heap_insert (int arr[], int arr_len, int key);

