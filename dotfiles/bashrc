alias ssh_prod='ssh -i ~/.ssh/sportq-dev.pem ubuntu@52.66.11.198'
export GOPATH=$HOME/go

PS1='\[\e[1;91m\][\u \w]\$\[\e[0m\] '
export CLICOLOR=1
export LSCOLORS=ExFxBxDxCxegedabagacad
alias ls='ls -GFh'

[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*
export PATH=$PATH:/usr/local/Cellar/mongodb@3.4/3.4.14/bin/

alias del_swp="find . -name "*.swp" -print -exec rm -i '{}' \;"
# If del_dSYM command gives error - "is a directory"
# add -r flag to rm
alias del_dSYM="find . -name "*.dSYM" -exec rm -i '{}' \;"

# (REFER 
# https://stackoverflow.com/questions/3575793/iterate-through-parameters-skipping-the-first/3575918#3575918
# )
# find and delete
# First find and display.
# Wait for confirmation.
# Remove with confirmation -i flag. Remove this flag 
# to delete bulk files.
# command format;
# Eg:
#	find . ! \( -name makefile -o -name *.c \) 
#
# `fcd [expression1] [expression2] ...`
# 
# TODO Correct the logic
fcd() {
  name_str=""
  for pat in "${@:2}"
  do
	  name_str+="-name $pat"
  done;

  find $1 ! "( $name_str )"
}

#xmodmap ~/.xmodmaprc
