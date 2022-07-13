#!bin/bash

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


# [Refer: Modern vim pg 29]
# Install Ripgrep if it does not exist.
#+ Ripgrep is a non-essential dependency for fzf.
#+ This is required if you have command
#+ `export FZF_DEFAULT_COMMAND='rg --files' in your bash_profile/bashrc.
#* This command is specific to Debian derivative like Ubuntu.
# TODO making the script independent of platform.
#+ Check which derivative is the platform.
if [ command -v rg &> /dev/null ]; then
  curl -LO https://github.com/BurntSushi/ripgrep/releases/download/13.0.0/ripgrep_13.0.0_amd64.deb
  sudo dpkg -i ripgrep_13.0.0_amd64.deb
else
  echo "Ripgrep already installed in the system"
  echo
fi

# Create "$HOME/bin" dir if it does not exist
if test ! -d "$HOME/bin"
then
	mkdir "$HOME/bin"
fi

# Create a symbolic link in "$HOME/bin" dir to "$HOME/software/nvim"
ln "$software_dir/nvim.appimage" "$HOME/bin/nvim"

# Update vimrc at "$HOME/.vim/vimrc"
[ ! -d "$HOME/.vim" ] && mkdir "$HOME/.vim"
if [ ! -e "$HOME/.vim/vimrc" ]; then
	# create a new file by copying dotfile vimrc
	cp "$repos_dir/dotfiles/vimrc.template" "$HOME/.vim/vimrc"
else
	cat "$repos_dir/dotfiles/vimrc.template" >> "$HOME/.vim/vimrc" 
fi

# Update init.vim at "$HOME/.config/nvim/" (VIMCONFIG="$HOME/.config/nvim")
[ ! -d "$HOME/.config/nvim" ] && mkdir -p "$HOME/.config/nvim"
if [ ! -e "$HOME/.config/nvim/init.vim" ]; then
	# create a new file by copying dotfile vimrc
	cp "$repos_dir/dotfiles/init.vim.template" "$HOME/.config/nvim/init.vim"
else
	cat "$repos_dir/dotfiles/init.vim.template" >> "$HOME/.config/nvim/init.vim" 
fi

# add minpac vim plugin manager (See Modern vim craft)
[ ! -d "$HOME/.config/nvim/pack/minpac/opt" ] && mkdir -p "$HOME/.config/nvim/pack/minpac/opt"
cd "$HOME/.config/nvim/pack/minpac/opt"
git clone https://github.com/k-takata/minpac.git
cd -

# run vim ex command to install packs
"$software_dir/nvim.appimage" -c "call minpac:update()"

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
