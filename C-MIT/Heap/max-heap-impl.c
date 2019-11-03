int main ()
{
  int arr[] = {4, 1, 3, 2, 16, 9, 10, 14, 8, 7}; 
  int arr_len = arr_length(arr);

  build_max_heap(arr, arr_len);

  for (int i = 0; i < arr_len; i++) {
	printf("%d ", arr[i]);
  }

  return 0;
}
