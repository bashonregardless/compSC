#include <stdio.h>

#define array_length(arr) (sizeof(arr) == 0 ? 0 : sizeof(arr) / sizeof((arr)[0]))

void swap(int *a, int *b) {
  int t = *a;
  *a = *b;
  *b = t;
}

// Rearrange an array such that arr[i] = i
void elementEqualsIndex(int arr[], int len) {
  for (int i = 0; i < len;) {
    if (arr[i] >= 0 && arr[i] != i) {
      swap(&arr[i], &arr[arr[i]]);
    } else {
      i++;
    }
  }
}

/* Reverse array half length approach */
// iterative swap till mid length
void reverseArrayHalfLen(int arr[], int len) 
{
  for (int i = 0; i < len / 2; i++) {
    swap(&arr[i], &arr[len - i - 1]);
  }
}

void reverseArrayStartEnd(int arr[], int start, int end) 
{
  while (start < end) {
    swap(&arr[start], &arr[end]);
    start++;
    end--;
  }
}

/* recursively reverse an array */
void reverseArrayRecursive(int arr[], int start, int end)
{
  if (start >= end)
    return;

  swap(&arr[start], &arr[end]);
  reverseArrayRecursive(arr, start + 1, end - 1);
}

/* Rearrange array such that arr[i] >= arr[j] 
 * if i is even and arr[i]<=arr[j] if i is odd and j < i */
void evenGreaterOddSmall(int arr[], int len)
{
  int max, min;  

  for (int i = 0; i < len; i++) {
    if (arr[i] > max) {

    }
  }
}
void print(int arr[], int len) {
  for (int i = 0; i < len; i++) {
    printf("%d ", arr[i]);
  }
  printf("\n");
}

int main() {
  /* element equals index */

  //int arr[] = {19, 7, 0, 3, 18, 15, 12, 6, 1, 8, 11, 10, 9, 5, 13, 16, 2, 14, 17, 4}, len = array_length(arr);
 // int arr[] = {-1, -1, 6, 1, 9, 3, 2, -1, 4, -1}, len = array_length(arr);
 // print(arr, len);
 // elementEqualsIndex(arr, len);
 // print(arr, len);

  /* reverse array of string */

  int arr[] = {1, 2, 3, 4, 5, 6, 7};
  int len = array_length(arr);

  // iterative swap till mid length
  //print(arr, len);
  //reverseArrayHalfLen(arr, len);
  //print(arr, len);

  // iterative swap with start and end index
  //print(arr, len);
  //reverseArrayStartEnd(arr, 0, len - 1);
  //print(arr, len);
  
  // recursive swap with start and end index
  print(arr, len);
  reverseArrayRecursive(arr, 0, len - 1);
  print(arr, len);
  return 0;
}
