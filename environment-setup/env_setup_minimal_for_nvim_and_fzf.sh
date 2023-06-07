#!bin/bash

# TODO Missing deps
#+ fzf.vim installation code

# TODO Check for all the dependencies, like curl etc before installing. If not present
#+ either install them or take an alternate path, like `wget` in place of curl.

# TODO [Refer: https://stackoverflow.com/a/3466183]
#+ Identify the platform (Linux Derivative (whether Debian(Ubuntu) or Darwin(macOS)), mostly)
#+ and then use the correct command to clone the latest stable version of the 
repos_dir="$HOME/repos"
if [ ! -d "$repos_dir" ]; then
  mkdir -p "$repos_dir"
fi

git clone https://github.com/bashonregardless/dotfiles.git "$repos_dir/dotfiles"


software_dir="$HOME/software"
# Create a directory to download nvim software.
if test ! -d "$software_dir"; then
  mkdir -p "$software_dir"
fi

(
cd "$software_dir"
# (Refer: https://github.com/neovim/neovim/wiki/Installing-Neovim)
# Download Neovim on Linux
if test $? = 0 && command -v curl &> /dev/null; then
  # TODO The curl command below is platform dependent. This curl is Linux Debian specific.
  #+ See macOS installation steps.
  #+ Test for platform before installation. This time installed nvim using brew as given in Modern Vimcraft.
  curl -LO https://github.com/neovim/neovim/releases/latest/download/nvim.appimage
  chmod u+x nvim.appimage
else
  echo "Error: curl is not installed"
  echo
  exit 64
fi
)

# Since exit in the subshell Only exits the subshell!, 
#+ The parent shell has not been affected, and the environment is preserved,
#+ thus the script continues execution.
#+ But what we want if the curl command is not found is to exit
#+ the execution of the script.
if [ $? -ne 0 ]; then
  echo "Error: curl is not installed"
  echo
  exit 64
fi

# TODO The commands below did not install fzf. It installed fzf in the directory
#+ from where the script was run.
git clone https://github.com/junegunn/fzf "$software_dir"
"$software_dir/fzf/install" --bin
echo "fzf installed successfully"
echo

# Create "$HOME/bin" dir if it does not exist
if test ! -d "$HOME/bin"
then
	mkdir "$HOME/bin"
fi

# TODO the name "nvim.appimage" and path to it is platform dependent.
#+ This command below is Debian specific. For MacOs see installtion guide.
# Create a symbolic link in "$HOME/bin" dir to "$HOME/software/nvim"
ln "$software_dir/nvim.appimage" "$HOME/bin/nvim"

# Update dotfiles (create, if non-existent)
if [ ! -e "$HOME/.bash_profile" ]; then
	# Copy and rename in the same time
	cp "$repos_dir/dotfiles/bash_profile.template" "$HOME/.bash_profile"
	# Rename only : `mv path/to/file.xyz path/to/file_renamed.xyz`
else
	cat "$repos_dir/dotfiles/bash_profile.template" >> "$HOME/.bash_profile" 
fi

if [ ! -e "$HOME/.bashrc" ]; then
	cp "$repos_dir/dotfiles/bashrc.template" "$HOME/.bashrc"
else
	cat "$repos_dir/dotfiles/bashrc.template" >> "$HOME/.bashrc" 
fi
