#!bin/bash

# NOTE on Safety and Security:
# (REFER https://askubuntu.com/questions/1141064/how-can-i-test-a-shell-script-in-a-safe-environment-to-avoid-harm-to-my-comput)
#
# If you're not sure what a script does, you're better off not
# running it until you are sure what it does. Ways to reduce the 
# damage radius of a bad script include running it using a new 
# user, running it in a container, or running it in a virtual machine. 
# But that first statement still holds: If you're not sure what 
# something does, consider not running it until you do.
#
# Next action: Installing VM(or, some kind of sandbox), to avoid
# polluting my host system.
#
# If you want to inspect the script for malware, this is not 
# an effective solution. This is a way of testing the functionality 
# without polluting your host system.
# 
# This approach is not safe, because, After you've run the script in the 
# sandbox, how are you going to tell whether it was safe? It 
# might have harmful effects that you can't easily say. Malware 
# doesn't necessarily pop up and say "Haha, got you!". Also,
# a malicious script could easily behave in a benign way while 
# in a sandbox or VM and then behave maliciously on your real 
# computer. (For instance, VM detection is a thing, as is machine 
# fingerprinting.)  

# NOTE
# In this file you may find two equivalent constructs to achieve
# the same task, like
# `if test $? = 0 && [ -x "$(command -v curl)" ]; then` ...
#
# These are only for pedagogical purpose, and not
# to be mistaken as the smarter way of writing code.

# NOTE
# tldp stands for "the linux documentation project"
# abs stands for "advanced bash scripting guide"

repos_dir=~/repos
if [ ! -d "$repos_dir" ]; then
  mkdir -p "$repos_dir"
fi

# cd "$repos_dir"
#
# NOTE Is cd command really necessary? What 
# alternative to cd exits? Like, git clone in a specific dir.
# check the exit status of cd command before cloning into dir.
# This is necessary because on failure of cd command, the script
# would go ahead and clone into the pwd.

# `git clone https://github.com/bashonregardless/dotfiles.git "$repos_dir/dotfiles"`
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

git clone https://github.com/bashonregardless/dotfiles.git "$repos_dir/dotfiles"

# Uncomment the below if-else code block if using(uncommenting) the cd command.
# above.
#
# Check exit status of cd command before cloning the repo
# if [ $? -eq 0 ]; then
#   git clone https://github.com/bashonregardless/dotfiles.git "$repos_dir/dotfiles"
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

software_dir=~/software
# Create a directory to download nvim software.
if test ! -d "$software_dir"; then
  mkdir "$software_dir"
fi
# TODO Should I check exit code of every command, before proceeding.
# For example, what if mkdir command fails. In this case, will(or, should)
# the bash script continue(or, be allowed to continue), or should I
# terminate.

# NOTE (Refer tldp abs testconstructs)
# Equivalence of test, /usr/bin/test, [ ], and /usr/bin/[ :
# The if test condition-true construct is the exact equivalent of if
# [ condition-true ]. As it happens, the left bracket, [ , is a token 
# which invokes the test command. The closing right bracket, ] ,
# in an if/test should not therefore be strictly necessary, however
# newer versions of Bash require it.

(
cd "$software_dir"
# (Refer: https://github.com/neovim/neovim/wiki/Installing-Neovim)
# Download Neovim on Linux
if test $? = 0 && [ -x "$(command -v curl)" ]; then
  curl -LO https://github.com/neovim/neovim/releases/latest/download/nvim.appimage
  chmod u+x nvim.appimage
else
  echo "Error: curl is not installed"
  echo
  exit 64
fi
)

# cd back to the dir(or, pwd) from where this script is invoked.
# cd -
# NOTE you don't have to cd back when you run the above code
# block in a subshell.
# Also, refer executing the script with bash command vs
# sourcing a script with source command.

# TODO if condition to test fails, try with wget and, if both fail
# try to download one and then retry download again.

# TODO implement script to download neovim on macOS.
# Also in this script, create symbolic link in ~/bin for executable
# in ~/software/nvim-osx64/bin/nvim
# Update PATH env var accordingly.

# TODO The above if-else can also be written as:
# `cd target/path && { curl -LO URL ; cd -; }`
#
# or
# 
# `(cd target/path && curl -O URL)`
#
# Find out when to use which, and why?
#
# If you want the side-effects of the command list to affect your
# current shell, use {...}
# If you want to discard any side-effects, use (...)
#
# (REFER https://askubuntu.com/questions/606378/when-to-use-vs-in-bash#)
# For example, I might use a subshell if I:
# want to alter $IFS for a few commands, but I don't want to alter
# $IFS globally for the current shell.
#
# cd somewhere, but I don't want to change the $PWD for the current shell.

# Create a symbolic link in ~/bin dir to ~/software/nvim
if test ! -d ~/bin
then
	mkdir ~/bin
fi

# Create a symbolic link in ~/bin dir to ~/software/nvim
ln "$software_dir/nvim.appimage" ~/bin/nvim

# Update dotfiles (create, if non-existent)
if [ ! -d ~/.bash_profile ]; then
	# Copy and rename in the same time
	cp "$repos_dir/dotfiles/bash_profile" "$HOME/.bash_profile"
	# Rename only
	# `mv path/to/file.xyz path/to/file_renamed.xyz
else
	"$repos_dir/dotfiles/bash_profile" >> ~/.bash_profile 
fi

if [ ! -d ~/.bashrc ]; then
	cp "$repos_dir/dotfiles/.bashrc" "$HOME/.bashrc"
else
	"$repos_dir/dotfiles/bashrc" >> ~/.bashrc 
fi
# Inspect PATH env var in the system to see if it includes ~/bin or not.
# Update PATH env var to include the path (~/bin in this case) to nvim executable.
# NOTE that similar script is present in bash_profile_common file.
