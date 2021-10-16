# tldp stands for "the linux documentation project
# abs stands for "advanced bash scripting guide"

repos=~/repos
if [ ! -d "$repos" ]; then
  mkdir -p "$repos"
fi

# cd "$repos"
#
# TODO Is cd command really necessary? What 
# alternative to cd exits? Like, git clone in a specific dir.
# check the exit status of cd command before cloning into dir.
# This is necessary because on failure of cd command, the script
# would go ahead and clone into the pwd.

# `git clone https://github.com/bashonregardless/dotfiles.git "$repos/dotfiles"`
#
# NOTE that doing a simple git clone w/o creating directory (like ~/repos)
# first will result in an error:
# fatal: could not create work tree dir '/dotfiles': Permission denied
#
# A case of same error being reported in two different scenarios.
# NOTE that this error occured because there was no repo dir to clone
# into.
# The same error will be reported when the dir exist but you don't have
# permissions set up correctly, which is what the error says verbatim.

git clone https://github.com/bashonregardless/dotfiles.git "$repos/dotfiles"

# Uncomment the below if-else code block if using(uncommenting) the cd command.
# above.
#
# Check exit status of cd command before cloning the repo
# if [ $? -eq 0 ]; then
#   git clone https://github.com/bashonregardless/dotfiles.git "$repos/dotfiles"
# else
  # exit script with failure exit code.
  #
  # To understand why we have used exit code 64 and not any other
  # value for exit code, refer tldp abs exitcodes.html

  # exit 64

  # Question: Why does the terminal exit after reading this exit
  # command, when then script is run using the command
  # `source path/to/script`
  #
  # Answer: The "problem" really is that you're sourcing and not
  # executing the script. When you source a file, its contents
  # will be executed in the current shell, instead of spawning a
  # subshell. So everything, including exit, will affect the current
  # shell.
  #
  # The Solution:
  # 1. Use command
  # `bash path/to/script`
  # to execute the script.
  #
  # 2. Instead of using exit, you'll want to use return.

  # OBSERVATION:
  # Trying to use cd inside the shell script does not work because 
  # the shell script runs in the subshell and once the script is 
  # over it returns to the parent shell, which is why the current 
  # directory does not change.
  #
  # To achieve changing of the directory use sourcing.You can either
  # use
  # `. scriptname.sh` or `source scriptname.sh`
  # command to use sourcing.
  #
  # Note : Also when you use sourcing do not use the exit command 
  # because it then closes your connection.
# fi
