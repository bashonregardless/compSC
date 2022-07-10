#!/bin/bash

#* [Refer: https://www.linuxtopia.org/online_books/advanced_bash_scripting_guide/assortedtips.html]
#+ Passing and returning arrays
if [ -z "$1" ] || [ -z "$2" ]; then
	echo "You have failed to pass a parameter."
	echo "USAGE: ./backup.sh LOGFILE DIRECTORY-TO-BACKUP"
	exit 255;
fi

create_array() {
  echo
  local passed_array
  echo
  echo

  IFS=$'\n'
  echo -n "IFS inside function execution: "
  printf %q "$IFS"
  echo
  echo

  passed_arg="$1"
  echo "\$1 inside function execution: $1"
  echo
  echo

  passed_arg=$(cat "$passed_arg")
  echo "passed_array inside function execution: $passed_arg"
  echo
  echo

  passed_array=(${passed_array[@]})
  echo "\${passed_array} inside function execution: $passed_array"

  echo
  echo

  echo "Inside function passed_array length is ${#passed_array[@]} and its contents are : ${passed_array[@]}"

  echo "${passed_array[@]}"
  # # Inside parentheses, and therefore a subshell . . .
  # while [ 1 ]   # Endless loop.
  # do
  #   echo "Subshell running . . ."
  # done
}

echo -n "IFS before function execution: "
printf %q "$IFS"
echo

create_array "$2"
#array=($(create_array $2))
echo

echo -n "IFS after function execution: "
printf %q "$IFS"

echo
echo

echo "Outside funciton array length is ${#array[@]} and its contents are : ${array[@]}"
