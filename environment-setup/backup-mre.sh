#!/bin/bash

create_array() {
  local passed_array

  IFS=$'\n'
  # printf %q "$IFS"

  passed_arg="$1"
  passed_array=$(cat "$passed_arg")

  echo "Inside function passed_array length is ${#passed_array[@]} and its contents are : ${passed_array[@]}"

  echo "${passed_array[@]}"
}

IFS=$'\n'
array=create_array "$1"
# array=($(create_array $1))

echo "Returned array length is ${#array[@]} and its contents are : ${array[@]}"
