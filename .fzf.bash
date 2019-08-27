# Setup fzf
# ---------
if [[ ! "$PATH" == */home/i0682/Plugins/.fzf/bin* ]]; then
  export PATH="${PATH:+${PATH}:}/home/i0682/Plugins/.fzf/bin"
fi

# Auto-completion
# ---------------
[[ $- == *i* ]] && source "/home/i0682/Plugins/.fzf/shell/completion.bash" 2> /dev/null

# Key bindings
# ------------
source "/home/i0682/Plugins/.fzf/shell/key-bindings.bash"
