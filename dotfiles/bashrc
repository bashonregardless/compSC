echo "Inside custom .bashrc"

#if [ -d "/Volumes/Linux-CaseSensitive/non-company/compSC/dotfiles/" ]; then
#  source /Volumes/Linux-CaseSensitive/non-company/compSC/dotfiles/macOs_var
#fi
#
#if [ -d "/user/home/repos/compSc/ubuntu_var/" ]; then
#  source /user/home/repos/compSc/ubuntu_var/
#fi

parse_git_branch() {
  git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}

export PS1="\[\033[32m\]\w\[\033[33m\]\$(parse_git_branch)\[\033[00m\] $ "

export CLICOLOR=1
export LSCOLORS=ExFxBxDxCxegedabagacad
alias ls='ls -GFh'

# Delete .swp files
alias del_swp="find . -name "*.swp" -print -exec rm -i '{}' \;"
# If del_dSYM command gives error - "is a directory"
# add -r flag to rm
alias del_dSYM="find . -name "*.dSYM" -exec rm -i '{}' \;"

# Search pattern 
function grall {
  grep -rinw --color=always "$1" $PWD
}
export -f grall

# [ -f ~/.fzf.bash ] && source ~/.fzf.bash

# Test regexp against string
function testRegexp {
  if [[ $1 =~ $2 ]]; then
   	echo "Yes"
  else
	echo "No"
  fi
}
export -f testRegexp

#---
# Excerpted from "Modern Vim",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit http://www.pragmaticprogrammer.com/titles/modvim for more book information.
#---
if [ -n "$NVIM_LISTEN_ADDRESS" ]; then
  if [ -x "$(command -v nvr)" ]; then
    alias nvim=nvr
  else
    alias nvim='echo "No nesting!"'
  fi
fi

# Copied from textbook 'Modern Vim', Pg 29
export FZF_DEFAULT_COMMAND='rg --files'

# TODO put this command in separate file specific to macOS (or your machine)
 compSc="/Volumes/Linux-CaseSensitive/non-company/compSC/"

#if [ -d "$compSC" ]; then
#  source "${compSc}/dotfiles/hr_aliases"
#fi
#
#if [ -d "$compSC" ]; then
#  alias cdcos="cd $compSc"
#fi
 alias cdcos="cd $compSc"

echo "Exiting custom .bashrc file"

