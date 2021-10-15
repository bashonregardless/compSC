" Excerpted from minpac doc on github
set packpath^=~/.config/nvim
" Try to load minpac.
packadd minpac

if !exists('g:loaded_minpac')
  " minpac is not available.

  " Settings for plugin-less environment.
  ...
else
  " Excerpted from book 'Modern Vim Craft' by Drew Neil
  call minpac#add('k-takata/minpac', {'type': 'opt'})
  call minpac#add('junegunn/fzf', {'type': 'bundle'})
  call minpac#add('mhinz/neovim-remote', {'type': 'bundle'})
  call minpac#add('neovim/nvim-lspconfig', {'type': 'bundle'})
  call minpac#add('nvim-treesitter/nvim-treesitter', {'type': 'bundle'})
  call minpac#add('nvim-lua/plenary.nvim', {'type': 'bundle'})
  call minpac#add('nvim-telescope/telescope.nvim', {'type': 'bundle'})
  call minpac#add('nvim-telescope/telescope-fzf-native.nvim', {'type': 'bundle'})
  call minpac#add('tpope/vim-fugitive', {'type': 'bundle'})
  call minpac#add('tpope/vim-surround', {'type': 'bundle'})

  " In ex-mode call 
  " PluginUpdate		- to update plugin usgin minpac
  " PluginClean		- to clean plugin usgin minpac
  command! PackUpdate call minpac#update()
  command! PackClean call minpac#clean()
endif

" NOTE that the below configs are for both vim and neovim

" set syntax off (a regexp based syntax highlighter and let 
" tree sitter handle highlighting.
" NOTE that this option does not necessarily affect tree-sitter
" syntax highlighting. 
" syntax=off

let g:tokyonight_style = "night"
colorscheme tokyonight

set shiftwidth=2
set smartindent

"set cursorline
set cursorline

"Define map leader
let mapleader = ","
" Don't Throw Away the Reverse Character Search Command
" REFER Practical Vim Textbook
noremap \ ,

"split navigations
nnoremap <C-J> <C-W><C-J>
" TODO NOTE that the below mapping is interfering with LSP mapping
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

" Excerpted form textbook 'Modern Vim' Pg24
nnoremap <C-p> :<C-u>FZF<CR>

" Excerpted from ALE docs on github, section ' How can I use ALE and coc.nvim
" together?'
let g:ale_disable_lsp = 1

let g:ale_sign_error = '❌'
let g:ale_sign_warning = '⚠️'

let g:ale_fix_on_save = 0

" Excerpted from https://github.com/dense-analysis/ale/blob/master/doc/ale-typescript.txt
" , section on tslint
let g:ale_linters_ignore = {'typescript': ['tslint']}

" Excerpted from https://github.com/dense-analysis/ale/blob/master/doc/ale-typescript.txt
" , section on tsserver
let g:ale_typescript_tsserver_use_global=1

" Find files using Telescope command-line sugar.
" Excerpted from telescope github page
nnoremap <leader>ff <cmd>Telescope find_files<cr>
nnoremap <leader>fg <cmd>Telescope live_grep<cr>
nnoremap <leader>fb <cmd>Telescope buffers<cr>
nnoremap <leader>fh <cmd>Telescope help_tags<cr>

" Terminal in vertical split mapping
nnoremap <leader>t :vsplit \| terminal<cr>

if has('nvim')
" Terminal insert mode exit
  tnoremap <Esc> <C-\><C-n>
  tnoremap <C-v><Esc> <Esc>

  highlight! link TermCursor Cursor
  highlight! TermCursorNC guibg=red guifg=white ctermbg=1 ctermfg=15

" switch buffers in terminal mode
  tnoremap <M-h> <c-\><c-n><c-w>h
  tnoremap <M-j> <c-\><c-n><c-w>j
  tnoremap <M-k> <c-\><c-n><c-w>k
  tnoremap <M-l> <c-\><c-n><c-w>l
endif
