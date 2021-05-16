set nocompatible              " be iMproved, required
filetype off                  " required

set hlsearch
hi Search ctermbg=Black
hi Search ctermfg=Red

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')

" let Vundle manage Vundle, required
Plugin 'gmarik/Vundle.vim'

" The following are examples of different formats supported.
" Keep Plugin commands between vundle#begin/end.
" plugin on GitHub repo
"Plugin 'tpope/vim-fugitive'
" plugin from http://vim-scripts.org/vim/scripts.html
"Plugin 'L9'
" Git plugin not hosted on GitHub
"Plugin 'git://git.wincent.com/command-t.git'
" git repos on your local machine (i.e. when working on your own plugin)
"Plugin 'file:///home/gmarik/path/to/plugin'
" The sparkup vim script is in a subdirectory of this repo called vim.
" Pass the path to set the runtimepath properly.
"Plugin 'rstacruz/sparkup', {'rtp': 'vim/'}
" Avoid a name conflict with L9
"Plugin 'user/L9', {'name': 'newL9'}

" My plugins
Plugin 'tpope/vim-bundler'
"Plugin 'scrooloose/nerdtree'
Plugin 'tpope/vim-projectionist'
" Syntax Highlighting JS and JSX
Plugin 'pangloss/vim-javascript'
"Plugin 'mxw/vim-jsx'
"Expand CSS selectors into HTML (or JSX) on the fly
"Plugin 'mattn/emmet-vim'
"Syntax checking, for JSX
Plugin 'w0rp/ale'
" All of your Plugins must be added before the following line
call vundle#end()            " required
filetype plugin indent on    " required
" To ignore plugin indent changes, instead use:
filetype plugin on
"
" Brief help
" :PluginList          - list configured plugins
" :PluginInstall(!)    - install (update) plugins
" :PluginSearch(!) foo - search (or refresh cache first) for foo
" :PluginClean(!)      - confirm (or auto-approve) removal of unused plugins

" see :h vundle for more details or wiki for FAQ

" (Refer Practical Vim Pg134: Jump Between Matching Keywords)
" Enable matchit plugin
set nocompatible
filetype plugin on
runtime macros/matchit.vim

" NOTE Surround plugin enable on Sun Mar 21 10:41:55 IST 2021
" See Surround.vim by tpope

" Put your non-Plugin stuff after this line

"set cursorline
set cursorline
"autocmd BufRead,BufEnter,WinEnter * setlocal cursorline
"autocmd BufEnter,WinLeave * setlocal nocursorline

set tabstop=4
syntax on
" bind K to grep word under cursor
"nnoremap K :grep! "\b<C-R><C-W>\b"<CR>:cw<CR>
set t_Co=256
syntax enable
set background=dark
"colorscheme solarized
set backspace=indent,eol,start

" (Refer Pg158, Interact with system clipboard)
" Enabling the autoindent setting is a sure way to induce strange effects when
" pasting from the system clipboard.
"
" See paste option
set autoindent
set shiftwidth=2
set smartindent

"Define map leader
let mapleader = ","
" Don't Throw Away the Reverse Character Search Command
noremap \ ,

"split navigations
nnoremap <C-J> <C-W><C-J>
nnoremap <C-K> <C-W><C-K>
nnoremap <C-L> <C-W><C-L>
nnoremap <C-H> <C-W><C-H>

"open child block after matching braces
inoremap <leader>o <esc>i<C-j><esc>ko

"open a new line at the top of file entering insert mode
nnoremap <leader>to <esc>ggi<C-j><esc>ki

" Explode split to full size
nnoremap <leader>ee <C-w>_<CR><C-w>\|<CR>
" Escape from full  size
nnoremap <leader>E <C-w>=

" Navigate arglist
nnoremap ]a :next<CR>
nnoremap ]A :last<CR>
nnoremap [a :prev<CR>
nnoremap [A :first<CR>

"set relative 'hybrid' line numbers
:set nu

let g:indentLine_char = '|'

"Enable fzf
set rtp+=~/.fzf

"map <Esc>
nnoremap fj <esc>
vnoremap fj <esc>
onoremap fj <esc>
cnoremap fj <esc>
inoremap fj <esc>

"Search and replace word under cursor
nnoremap <leader>s :%s/\v<<C-r><C-w>>/
"Alternatively, you could use this mapping so that the final /g is already
"entered:
":nnoremap <Leader>s :%s/\v<<C-r><C-w>>/g<Left><Left>

nnoremap <leader>f :FZF<CR>

"search and replace visually highlighted text
vnoremap <C-r> "hy:%s/<C-r>h//gc<left><left><left>

" indent file
nnoremap <leader>ai gg=G<C-O>

" delete all trailing whitespace from each line, then replace three 
" or more consecutive line endings with two line endings (a single blank line)
nnoremap <leader>df :%s/\s\+$//e<cr> :%s/\n\{3,}/\r\r/e<cr>

" (REFER: Stackoverflow bookmarked: How to map CAPS LOCK key in VIM?)
" The first line maps escape to the caps lock key when you enter Vim, and the
" second line returns normal functionality to caps lock when you quit.
" This requires Linux with the xorg-xmodmap package installed.
"au VimEnter * !xmodmap -e 'clear Lock' -e 'keycode 0x42 = Control'
"au VimLeave * !xmodmap -e 'clear Lock' -e 'keycode 0x42 = Caps_Lock'

" (Refer Practical Vim Pg83)
" Traverse the buffer list using four commands— :bprev and :bnext to move
" backward and forward one at a time, and :bfirst and :blast to jump to the
" start or end of the list
nnoremap <silent> [b :bprevious<CR>
nnoremap <silent> ]b :bnext<CR>
nnoremap <silent> [B :bfirst<CR>
nnoremap <silent> ]B :blast<CR>
" TODO Similar mappings to navigate arglist


" (Refer Practical Vim Pg101 Link to Vimcasts episode)
" Easy expansion of active file directory
"`nnoremap <leader>ew :e <C-R>=expand('%:p:h').'/'<CR>`
" (Refer Practical Vim Pg101 Link to Vimcasts episode)
" Easy expansion of active file directory in horizontal split
"`nnoremap <leader>es :sp <C-R>=expand('%:p:h').'/'<CR>`
" Easy expansion of active file directory in vertical split
"`nnoremap <leader>ev :vsp <C-R>=expand('%:p:h').'/'<CR>`
" Easy expansion of active file directory in new tab
"`nnoremap <leader>et :tabe <C-R>=expand('%:p:h').'/'<CR>`
" TODO Delete the above commented out para after you have understood
" the concept of %, :p, and :h

" (Refer Practical Vim Pg101)
" Easy expansion of the shell directory(or, in some cases also called
" source directory).
" NOTE: this mapping can also done just like the mapping
" expansion of active file directory
" `cnoremap <expr> %% getcmdtype() == ':' ? expand('%:h').'/' : '%%'`
" TODO Undestand the difference between the above mapping and the one
" below.
" less horrible way of creating the same mappings:
cnoremap %% <C-R>=fnameescape(expand('%:h')).'/'<cr>
map <leader>ew :e %%
map <leader>es :sp %%
map <leader>ev :vsp %%
map <leader>et :tabe %%
" Additionally, this allows you to expand the directory of the current file
" anywhere at the command line by pressing %%

" Make a word SHOUT (uppercase) in insert mode 
inoremap <leader>ws <esc>gUawea

" Fold
nnoremap z{ zfa{ 
nnoremap z( zfa( 
