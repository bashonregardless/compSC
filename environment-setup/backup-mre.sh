if [ -z "$1" ] || [ -z "$2" ]; then
	echo "You have failed to pass a parameter."
	echo "USAGE: ./backup.sh LOGFILE DIRECTORY-TO-BACKUP"
	exit 255;
fi

create_array() {
  echo
  echo

  IFS=$'\n'
  echo -n "IFS inside function execution: "
  printf %q "$IFS"
  array=($( cat "$1" ))

  echo
  echo

  echo "Inside funciton array length is ${#array[@]} and its contents are : ${array[@]}"

 # # Inside parentheses, and therefore a subshell . . .
 # while [ 1 ]   # Endless loop.
 # do
 #   echo "Subshell running . . ."
 # done
}

echo -n "IFS before function execution: "
printf %q "$IFS"
echo

# create_array "$2"
array=$(create_array $2)

echo

echo -n "IFS after function execution: "
printf %q "$IFS"

echo
echo

echo "Outside funciton array length is ${#array[@]} and its contents are : ${array[@]}"
