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
#
# [Refer : On page https://tldp.org/LDP/abs/html/arrays.html
# Search for term "load the contents of a text file into an array."]

# Variable operations inside a subshell, even to a GLOBAL variable
# do not affect the value of the variable outside the subshell!
#
# [Refer : On page https://tldp.org/LDP/abs/html/arrays.html
# Search for term "Assignment, in conjunction with 'echo' and command substitution,
# can read a function's stdout."]
# Before reaching for a Big Hammer -- Perl, Python, or all the rest --
#  recall:
#    $( ... ) is command substitution.
#    A function runs as a sub-process.
#    A function writes its output (if echo-ed) to stdout.
#    Assignment, in conjunction with "echo" and command substitution,
#+   can read a function's stdout.
#    The name[@] notation specifies (the equivalent of) a "for-each"
#+   operation.
#  Bash is more powerful than you think!
# 

# Q. How to access command line arguments of the caller inside a function?
# A. Usually you just pass them as parameters to the function at call time.
# TODO READ further on this.
#
# Funcitons are blocks of commands, much like normal scripts you might write,
# except they don't reside in separate files, and they don't cause a separate 
# process to be executed.
create_backup_pathname_array() {
  # Q. Why when I try to set IFS to newline by using syntax `IFS="\n"`, it does 
  #+ not work as expected?
  # A. [Refer : https://unix.stackexchange.com/a/477962/395825]
  # IFS=\n would set IFS to n (\ is treated as a quoting operator)
  # and IFS="\n" or IFS='\n' would set IFS to the two characters backslash and n.
  # Refer link for futther clarification, answer by Stéphane Chazelas.
  IFS=$'\n'
  echo -n "IFS inside function execution: "
  printf %q "$IFS"
  BACKUP_FROM=($( cat "$1" ))
  echo
  echo
  echo -n "Backup pathname array inside funciton"

  # Q. Why the echo in the line below does not print to stdout?
  # A. TODO WIP Reading abs [Refer : https://tldp.org/LDP/abs/html/functions.html]
  echo ${BACKUP_FROM[@]}
}

echo -n "IFS before function execution: "
printf %q "$IFS"
echo

# Observation on o/p when funciton is called in the two following ways:
# 1. `BACKUP_FROM=$(create_backup_pathname_array $2)`
# 2. `create_backup_pathname_array $2`
#
# O/P in case 1:
# IFS before function execution: $' \t\n'
# IFS inside function execution: $'\n'
# 
# Backup pathname array inside funcitonrepos_dir="$HOME/repos" software_dir="$HOME/software" bin="$HOME /bin" bash_profile="$HOME/.bash_profile" bashrc="$HOME/.bashrc" vimrc="$HOME/.vim/vimrc" dot_config_nvim="$HOME/.config/nvim"
# 
# IFS after function execution: $'\n'
# 
# repos_dir="$HOME/repos" software_dir="$HOME/software" bin="$HOME /bin" bash_profile="$HOME/.bash_profile" bashrc="$HOME/.bashrc" vimrc="$HOME/.vim/vimrc" dot_config_nvim="$HOME/.config/nvim"
# 7
#
# O/P in case 2:
# IFS before function execution: $' \t\n'
# 
# IFS after function execution: $' \t\n'
# 
# IFS inside function execution: $'\n' Backup pathname array inside funcitonrepos_dir="$HOME/repos" software_dir="$HOME/software" bin="$HOME /bin" bash_profile="$HOME/.bash_profile" bashrc="$HOME/.bashrc" vimrc="$HOME/.vim/vimrc" dot_config_nvim="$HOME/.config/nvim"
# 1

# create_backup_pathname_array $2
BACKUP_FROM=$(create_backup_pathname_array $2)
echo
echo -n "IFS after function execution: "
printf %q "$IFS"
echo
echo

echo ${BACKUP_FROM[@]}
echo ${#BACKUP_FROM[@]}

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
