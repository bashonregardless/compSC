#!/bin/bash

#* [Refer: https://www.linuxtopia.org/online_books/advanced_bash_scripting_guide/assortedtips.html]
#+ Passing and returning arrays
if [ -z "$1" ] || [ -z "$2" ]; then
	echo "You have failed to pass a parameter."
	echo "USAGE: ./backup.sh LOGFILE DIRECTORY-TO-BACKUP"
	exit 255;
fi

create_array() {
  local passed_array

  IFS=$'\n'

  passed_arg="$1"
  passed_array=$(cat "$passed_arg")

  echo "Inside function passed_array length is ${#passed_array[@]} and its contents are : ${passed_array[@]}"

  echo "${passed_array[@]}"
  # # Inside parentheses, and therefore a subshell . . .
  # while [ 1 ]   # Endless loop.
  # do
  #   echo "Subshell running . . ."
  # done
}

create_array "$2"
# array=($(create_array $2))

echo
echo

echo "Returned array length is ${#array[@]} and its contents are : ${array[@]}"
