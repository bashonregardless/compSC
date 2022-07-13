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

cd "$software_dir"
# (Refer: https://github.com/neovim/neovim/wiki/Installing-Neovim)
# Download Neovim on Linux
if command -v curl &> /dev/null; then
# if test command -v curl &> /dev/null; then
  echo "Inside vim installation"
  # exit 64
  echo "curl exits. Proceeding with cloning nvim"
  curl -LO https://github.com/neovim/neovim/releases/latest/download/nvim.appimage
  chmod u+x nvim.appimage
  echo "Nvim cloned and Installed"
  echo
else
  echo "Error: curl is not installed"
  echo
  exit 64
fi
cd -

#* Take care, as this is the exit status of the last command run, which can just as well be echo
#+ Since exit in the subshell Only exits the subshell!, 
#+ The parent shell has not been affected, and the environment is preserved,
#+ thus the script continues execution.
#+ But what we want if the curl command is not found is to exit
#+ the execution of the script.

# [Refer: Modern vim pg 29]
# Install Ripgrep if it does not exist.
#+ Ripgrep is a non-essential dependency for fzf.
#+ This is required if you have command
#+ `export FZF_DEFAULT_COMMAND='rg --files' in your bash_profile/bashrc.
#* This command is specific to Debian derivative like Ubuntu.
# TODO making the script independent of platform.
#+ Check which derivative is the platform.

#* TODO 
#+ Test construct `if [ ! command -v rg &> /dev/null ]; then`
#+ fails. Why?
# What test construct to write if we want to check two conditions
#+ simultaneously, first, if the exit status of prev command was 0,
#+ and on success to check if command exists?
if ! command -v rg &> /dev/null; then
  curl -LO https://github.com/BurntSushi/ripgrep/releases/download/13.0.0/ripgrep_13.0.0_amd64.deb
  sudo dpkg -i ripgrep_13.0.0_amd64.deb
  rm ripgrep_13.0.0_amd64.deb
  echo "Ripgrep installed successfullly in the system"
  echo
else
  echo "Ripgrep already installed in the system"
  echo
fi

if [ ! -d "$HOME/.config/nvim/pack/bundle/start" ]; then
  mkdir -p "$HOME/.config/nvim/pack/bundle/start" 
fi 
if [ $? -ne 0 ];then
  echo "$HOME/.config/nvim/pack/bundle/start not created successfully"
  exit 64
else
  cd "$HOME/.config/nvim/pack/bundle/start" 
  git clone https://github.com/junegunn/fzf
  $HOME/.config/nvim/pack/bundle/start/fzf/install --bin
  git clone https://github.com/junegunn/fzf.vim
  echo "fzf installed successfully"
  echo
  cd -
fi

# Install bat for fzf preview coloring
#+ bat supports syntax highlighting for a large number of programming and markup languages.
#+ TODO This is ubuntu specific. Make it generic for other platform
sudo apt install bat

# install nvr [Refer: modern vimcraft Pg 7]
if ! command -v pip3 &> /dev/null; then
  # [Refer: https://askubuntu.com/a/1301162]
  #+ Before installing python3-pip,
  #+ You may have to enable the universe repository first.
  sudo add-apt-repository universe
  # Then run the following command to synchronize your package database.
  sudo apt update
  echo "installing pip3/python3-pip"
  # Finally install pip3
  sudo apt install python3-pip
  echo "pip/python3-pip installed successfully"
else
  echo "pip3 is already installed in the system"
fi

# To enable the Python 3 provider, you need to install the Python client. 
#+ You can get this using pip
if command -v pip3 &> /dev/null; then
  pip3 install --user --upgrade neovim
  # neovim-remote gets installed  in ~/.local/bin
  #+ For nvr command to work properly, this path has to
  #+ be appended to $PATH, which is happening in ~/.bash_profile
  #+ , but before appending it checks for the existence of 
  #+ that path. So, you might, if you install nvr not as part
  #+ of this script, need to source ~/.bash_profile again.
  pip3 install --user --upgrade neovim-remote
else
  echo "pip3 not found"
  exit 64
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
