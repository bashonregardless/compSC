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
Plugin 'tpope/vim-fugitive'
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
Plugin 'scrooloose/nerdtree'
Plugin 'tpope/vim-projectionist'
Plugin 'jlanzarotta/bufexplorer'
Plugin 'scrooloose/nerdcommenter'
" Syntax Highlighting JS and JSX
Plugin 'pangloss/vim-javascript'
Plugin 'mxw/vim-jsx'
"Expand CSS selectors into HTML (or JSX) on the fly
Plugin 'mattn/emmet-vim'
"Syntax checking, for JSX
Plugin 'w0rp/ale'
"editor config enabler
Plugin 'editorconfig/editorconfig-vim'
" indentLine
Plugin 'Yggdroot/indentLine'
" Valoric YouCompleteMe
Plugin 'Valloric/YouCompleteMe'
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
"let g:solarized_termtrans = 1
"let g:solarized_termcolors=256
set background=dark
"colorscheme solarized
set backspace=indent,eol,start
function! DelTagOfFile(file)
  let fullpath = a:file
  let cwd = getcwd()
  let tagfilename = cwd . "/tags"
  let f = substitute(fullpath, cwd . "/", "", "")
  let f = escape(f, './')
  let cmd = 'sed -i "/' . f . '/d" "' . tagfilename . '"'
  let resp = system(cmd)
endfunction

function! UpdateTags()
  let f = expand("%:p")
  let cwd = getcwd()
  let tagfilename = cwd . "/tags"
  let cmd = 'ctags -a -f ' . tagfilename . ' --c++-kinds=+p --fields=+iaS --extra=+q ' . '"' . f . '"'
  call DelTagOfFile(f)
  let resp = system(cmd)
endfunction
autocmd BufWritePost *.cpp,*.h,*.c call UpdateTags()
"set ctrl + t in Insert mode to shifhtwidth=2
:set shiftwidth=2
"Emmet plugin (Expand CSS selector into HTML or JSX) support code
let g:user_emmet_leader_key='<Tab>'
let g:user_emmet_settings = {
	  \  'javascript.jsx' : {
	  \      'extends' : 'jsx',
	  \  },
	  \}
"Syntax checking ale -- make more elegant to use
let g:ale_sign_error = '●' " Less aggressive than the default '>>'
let g:ale_sign_warning = '.'
let g:ale_lint_on_enter = 0 " Less distracting when opening a new file

"Define map leader
let mapleader = ","

"commad mode toggle map
inoremap jk <ESC> 

"split navigations
nnoremap <C-J> <C-W><C-J>
nnoremap <C-K> <C-W><C-K>
nnoremap <C-L> <C-W><C-L>
nnoremap <C-H> <C-W><C-H>
"split direction, always
set splitbelow
set splitright
"vertical/horizontal map
nnoremap ,h :split<CR>
nnoremap ,v :vs<CR>
"Resize split
nnoremap ,<< :vertical resize +12<CR>
nnoremap ,>> :vertical resize -12<CR>

" Enable folding
set foldmethod=indent
set foldlevel=99

"open child block after matching braces
inoremap <leader>o <esc>i<C-j><esc>ko

"open a new line at the top of file entering insert mode
nnoremap <leader>to <esc>ggi<C-j><esc>ki

" Explode split to full size
nnoremap <leader>e <C-w>_<CR><C-w>\|<CR>
" Escape from full  size
nnoremap <leader>E <C-w>=

" Navigate arglist
nnoremap ]a :next<CR>
nnoremap ]A :last<CR>
nnoremap [a :prev<CR>
nnoremap [A :first<CR>

" set relative 'hybrid' line numbers
:set nu rnu

let g:indentLine_char = '|'

" Enable fzf
set rtp+=~/.fzf

" Set this variable to 1 to fix files when you save them.
let g:ale_fix_on_save = 1

" map <Esc>
nnoremap fj <esc>
vnoremap fj <esc>
onoremap fj <esc>
cnoremap fj <esc>
inoremap fj <esc>

" Search and replace word under cursor
nnoremap <Leader>s :%s/\v<<C-r><C-w>>/
" Alternatively, you could use this mapping so that the final /g is already
" entered:
" :nnoremap <Leader>s :%s/\v<<C-r><C-w>>/g<Left><Left>

nnoremap <leader>f :FZF<CR>

" temporarily swich to cwd for path prompt relative to it
function! SwitchCwd()
  " on first execution of function from a window
  if exists("w:appCwd")==0
	" store the app directory in w:appCwd
	echo "Switched to current directory"
	let w:appCwd=getcwd()
	let w:tmpCwd=expand("%:p:h")
	" when this mapping is run first time from a buffer, switch to cwd
	lcd %:p:h
  elseif w:tmpCwd==expand("%:p:h")
	" on subsequent executions
	echo "Switched to base directory"
	let w:tmpCwd=w:appCwd
	execute 'lcd' w:appCwd
  else
	let w:tmpCwd=expand("%:p:h")
	lcd %:p:h
  endif
endfunction
nnoremap <leader>cd :call SwitchCwd()<CR>
"Path prompt mapping
inoremap <leader>c <C-X><C-F>

" comment selection with /*...*/

" search and replace visually highlighted text
vnoremap <C-r> "hy:%s/<C-r>h//gc<left><left><left>


" autocomplete tag
"  Using single quotes tells Vim that you want the string exactly as-is, with
"  no escape sequences. The one exception is that two single quotes in a row
"  will produce one single quote.

inoremap <expr> <C-V> AutoCompleteTag()
func! AutoCompleteTag()
  let l:match = search('<[^/].\{-}>', 'bn', line("."))
  let l:pat="<\zs\/.\{-}\ze>"
  if l:match > 0
	let l:lastMatch=MatchStrLast(getline(l:match), '<\zs.\{-}\ze>')
	if l:lastMatch!~"\/.*"
	  return '</'.l:lastMatch.'>'
	else
	  return ''
	endif
  else
	return ''
  endif
endfunc

" use the {count} parameter for matchstr() to increment your way through the
" string 
function! MatchStrLast(expr, pat, ...)
  let start = a:0 ? a:1 : 0
  let lst = ''
  let cnt = 1
  let found = match(a:expr, a:pat, start, cnt)
  while found != -1
	let lst=matchstr(a:expr, a:pat, start, cnt)
	"call add(lst, matchstr(a:expr, a:pat, start, cnt))
	let cnt += 1
	let found = match(a:expr, a:pat, start, cnt)
  endwhile
  return lst
endfunction


" autocomplete tag
"  Using single quotes tells Vim that you want the string exactly as-is, with
"  no escape sequences. The one exception is that two single quotes in a row
"  will produce one single quote.
"inoremap <expr> <C-B> AutoCompleteAlpabeticTag()
func! AutoCompleteAlpabeticTag()
  let l:match = search('<\zs\a\+', 'bn', line("."))
  let l:pat="<\zs\/.\{-}\ze>"
  if l:match > 0
	let l:lastMatch=MatchStrLast(getline(l:match), '<\zs\a\+')
	if l:lastMatch =~ "\a\+"
	  return '> </'.l:lastMatch.'>'
	else
	  return ''
	endif
  else
	return ''
  endif
endfunc
nnoremap <leader><space> :noh<cr>

inoremap <leader>q <C-N><C-P>

" indent file
nnoremap <leader>ai gg=G<C-O>

" delete all trailing whitespace from each line, then replace three or more consecutive line endings with two line endings (a single blank line)
nnoremap <leader>df :%s/\s\+$//e<cr> :%s/\n\{3,}/\r\r/e<cr>
