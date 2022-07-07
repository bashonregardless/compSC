#!/bin/bash

#####
# Basic skeleton taken from
# [Refer : https://acloudguru.com/blog/engineering/how-to-write-a-backup-script-with-bash].
# 
# This is a script given to users on a machine when they want to back 
# up their work to a specific backup directory (/home/$USER/work_backup)
# 
# The script requires two parameters - the first is where the log file 
# will be and the second is what directory will be backed up.
#####



if [ -z "$1" ] || [ -z "$2" ]; then
	echo "You have failed to pass a parameter."
	echo "Reminder that all required files will be copied to /home/\$USER/work/work_backup."
	echo "USAGE: ./backup.sh LOGFILE DIRECTORY-TO-BACKUP"
	exit 255;
fi


MYLOG=$1

# The only safe way to represent multiple string elements in Bash is through 
# the use of arrays. An array is a type of variable that maps integers to strings.
# That basically means that it holds a numbered list of strings. Since each of 
# these strings is a separate entity (element), it can safely contain any character,
# even whitespace.
# 
# We have multiple directories and files that we want to backup. 
# These can be safely represented in Bash using arrays.
BACKUP_FROM=("$2.sh")

function ctrlc {
	rm -rf /home/$USER/work/work_backup
	rm -f $MYLOG
	echo "Received Ctrl+C"
	exit 255
}

trap ctrlc SIGINT

# NOTE
# [Refer: https://mywiki.wooledge.org/CommandSubstitution]
# Command substitution create subshells, so any changes to variables,
# current directory, etc. inside the command substitution affect only the 
# rest of the substitution, and not the parent shell.
echo "Timestamp before work is done $(date +"%D %T")" >> $MYLOG

echo "Creating backup directory" >> $MYLOG

# Q. Why is the syntax like `if ()` ? Does `if` act on the exit status of the command inside `()`?
# A. [Refer : https://stackoverflow.com/questions/16946905/differences-between-and-in-an-if-condition]
# `if (...)` is used to test the exit code of a command (in most cases the () are redundant),
# if simply takes an ordinary shell command as an argument, and evaluates the exit 
# code of the command. For example, you can do
# `if grep pattern file; then ...; fi`
#
# [Refer : https://tldp.org/LDP/abs/html/subshells.html]
# A subshell may be used to set up a "dedicated environment" for a command group.
# One application of such a "dedicated environment" is testing whether a variable is defined.
# `
# if (set -u; : $variable) 2> /dev/null
# then
#   echo "Variable is set."
# fi
# 
# # Variable has been set in current script,
#      #+ or is an an internal Bash variable,
#      #+ or is present in environment (has been exported).
# `
#
# Q. What is `2>` syntax?
# A.
# File descriptor 1 is the standard output (stdout).
# File descriptor 2 is the standard error (stderr).
#
# `scriptname >filename` redirects the output of scriptname to file filename.
# Overwrite filename if it already exists.
#
# `command &>filename` redirects both the stdout and the stderr of command to filename.
#
# This is useful for suppressing output when testing for a condition.
# `type bogus_command &>/dev/null`
# `command >&2` redirects stdout of command to stder
#
# [Refer : https://stackoverflow.com/a/818284/11320006]
# Here is one way to remember this construct (although it is not entirely accurate): 
# at first, 2>1 may look like a good way to redirect stderr to stdout. However,
# it will actually be interpreted as "redirect stderr to a file named 1".
# & indicates that what follows and precedes is a file descriptor and not a 
# filename. So the construct becomes: 2>&1.
# 
# Eg,
# `echo test > afile.txt `
# redirects stdout to afile.txt. This is the same as doing
# `echo test 1> afile.txt`
# 
# To redirect stderr, you do:
# `echo test 2> afile.txt`
#
# `>&` is the syntax to redirect a stream to another file descriptor
#if ! (mkdir /home/$USER/work/work_backup 2> /dev/null)
#then
#	echo "Directory already existed." >> $MYLOG
#fi
#
#echo "Copying Files" >> $MYLOG
#cp -v $BACKUP_FROM/* /home/$USER/work/work_backup/ >> $MYLOG
echo "Finished Copying Files" >> $MYLOG
echo "Timestamp after work is done $(date +"%D %T")" >> $MYLOG
