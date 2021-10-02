echo "Inside custom .profile"

# This piece of code is copied from original .profile file (the one that 
# came after OS installation)
#
# Add $HOME/bin to $PATH for any binary that will be put in $HOME/bin
# set PATH so it includes user's private bin if it exists
#if [ -d "$HOME/bin" ] ; then
#    PATH="$HOME/bin:$PATH"
#fi
# In SO question "When I execute bash, the $PATH keeps repeating itself",
# it is stated that don't set your PATH incrementally in .bashrc; set it 
# once in .profile and leave it alone thereafter.
#
# The reason is in
#
# SO question on Super User community "Difference between .bashrc and .bash_profile".
# Setting path incrementally in .bashrc is not correct way to set PATH.
# Any time you do source ~/.bashrc, path duplicates and same entries are
# added to PATH.
# On modern unices, there's an added
# complication related to ~/.profile, which could be solved by some
# effort.
#
# In Ubuntu, this is solved by enabling "Run command as login shell" option in
# Terminal setting, but this is not a permanent solution, it is platform
# specific. This change is made so that .profile is read.

# This piece of code is copied from original .profile file (the one that 
#
# came after OS installation)
# set PATH so it includes user's private bin if it exists
#if [ -d "$HOME/.local/bin" ] ; then
#    PATH="$HOME/.local/bin:$PATH"
#fi

# This piece of code is copied from original .profile file (the one that 
# came after OS installation)
#
# if running bash
#if [ -n "$BASH_VERSION" ]; then
#    # include .bashrc if it exists
#    if [ -f "$HOME/.bashrc" ]; then
#	. "$HOME/.bashrc"
#    fi
#fi

# Copied from textbook 'Modern Vim', Pg 7
export VIMCONFIG=~/.config/nvim
export VIMDATA=~/.local/share/nvim

# Copied from textbook 'Modern Vim', Pg 24
export PATH="$PATH:$VIMCONFIG/pack/bundle/start/fzf/bin"

echo "Exiting custom .profile file"
