if [ -z "$1" ] || [ -z "$2" ]; then
	echo "You have failed to pass a parameter."
	echo "USAGE: ./backup.sh LOGFILE DIRECTORY-TO-BACKUP"
	exit 255;
fi


MYLOG=$1

create_backup_pathname_array() {
  IFS=$'\n'
  echo -n "IFS inside function execution: "
  printf %q "$IFS"
  BACKUP_FROM=($( cat "$1" ))
  echo
  echo
  echo -n "Backup pathname array inside funciton: "

  echo ${BACKUP_FROM[@]}
}

echo -n "IFS before function execution: "
printf %q "$IFS"
echo

create_backup_pathname_array "$2"
# create_backup_pathname_array $2
# BACKUP_FROM=$(create_backup_pathname_array $2)
echo
echo -n "IFS after function execution: "
printf %q "$IFS"
echo
echo

echo ${BACKUP_FROM[@]}
echo ${#BACKUP_FROM[@]}

