# ** Phony Targets **
#
# A phony target is one that is not really the name of a file:
# rather it is just a name for a recipe to be executed when you
# make an explicit request. There are two reasons to use a phony
# target: to avoid a conflict with a file of the same name, and
# to improve performance.
#
# If you write a rule whose recipe will not create a target file,
# the recipe will be executed every time the target comes up for
# remaking.
# Here is an example:
#
# `clean:
# 		  rm *.o temp
# `
#
# Because the rm command does not create a file named clean, probably
# no such file will ever exist. Therefore, the rm command will be 
# excuted everytime you say `make clean`.
#
# In this example, the clean target will not work properly if a flle
# named clean is ever created in this directory. Since it has no
# prerequisites clean would always be considered up to date and its
# recipe would not be executed. To avoid this problem you can
# explicitly declare the target to be phony by making it a prerequisite
# of the special target .PHONY as follows:
#
# `.PHONY clean
# clean:
# 		 rm *.o temp
# `
#
# Once this is done, `make clean` will run the recipe regardless of
# whether there is a file named clean.
#
# Phony targets are also useful in conjunction with recursive invocation
# of make. In this situation the makefile will often contain a variable
# which lists a number of sub-directories to be built. A simplist
# way to handle this is to define one rule with a recipe that loops 
# over the sub-directories, lik this:
#
# `SUBDIRS = foo bar baz
# 
# subdirs:
# 		  for dir in $(SUBDIRS); do \
# 		    $(MAKE) -C $$dir; \
# 		  done
# `
# There are problems with this method. however. First, any error detected
# in a sub-make is ignored by this rule, so it will continue to build
# the rest of the directories even when one fails. This can be overcome
# by adding shell commands to note the error and exit, but then it will
# do so even if make is invoked with the -k option, which is unfortunate.
# Second, and perhaps more importantly, you cannot take advantage of
# make's ability to buld targets in parallel, since there is only one
# rule.
#
# By declaring the sub-directories as, .PHONY targets (you must do this
# as the sub-directory always exits; otherwise it won't be built) you 
# can remove these problems:
#
# `SUBDIRS = foo bar baz
#
# .PHONY: subdirs $(SUBDIRS)
#
# subdirs: $(SUBDIRS)
#
# $(SUBDIRS):
# 		$(MAKE) -C $@
#
# foo: baz
# `
#
# Here we've also declared that the foo sub-directory cannot be built
# until after the baz sub-directory is complete; this type of relationship
# declaration is particularly important when attempting parallel builds.
#
# The implicit rule search is skipped for .PHONY targets. This is why
# declaring a target as .PHONY is good for performance, even if you are
# not worried about the actual file existing.
#
# A phony target should not be a prerequisite of real target file; if 
# it is, its recipe will be run every time make goes to update that
# file. As long as phony target is never a prerequisite of a real target,
# the phony target recipe will be executed only when the phony target is
# a specified goal.
#
# Phony targets can have prereuisites. When one directory contains multiple
# programs in one makefile ./Makefile. Since the target remade by default
# will be the first one in the makefile, it is common to make this a phony
# target named 'all' and give it, as prerequisites, all the individual
# programs. For example:
#
# `all : prog1 prog2 prog3
# .PHONY : all
#
# prog1 : prog1.o utils.o
#		  cc -o prog1 prog1.o utils.o
#
# prog2 : prog2.o
# 		  cc -o prog2 prog2.o
#
# prog3: prog3.o sort.o utils.o
# 		 cc -o prog3 prog3.o sort.o utils.o
#`
# Now you can just say `make` to remake all three programs. or specify as
# arguments the ones to remake (as in `make prog1 prog3`). Phonnies are
# not inherited: the prerequisites of a phony target are not themselves
# phony, unless explicitly declared to be so.
#
# When one phony target is prerequisite of another, it serves as a
# subroutine of the other. For example, here `make cleanall` will delete
# the object files, the difference files, and the file 'program':
#
# `.PHONY: cleanall cleanobj cleandiff
#
# cleanall : cleanobj cleandiff
# 		rm program
#
# cleanobj : 
# 		rm *.o
#
# cleandiff :
# 		rm *.diff
.PHONY: all

# ** Syntax of Conditionals **
#
# The syntax of a simple conditional with no 'else' is as follows:
#
# `conditional-directive
# text-if-true
# endif
# `
#
# The 'text-if-true' may be any lines of text, to be considered as
# part of the makefile if the condition is true. If the condition is
# false, no text is used instead.
#
# The syntax of a complex conditional is as follows:
#
# `conditional-directive-one
# text-if-one-is-true
# else conditional-directive-two
# text-if-two-is-true
# else
# text-if-one-and-two-are-false
# endif
# `
#
# Extra spaces are allowed and ignored at the beginning of the conditional
# directive line, but a tab is not allowed. (If the line begins with
# a tab, it will be considered part of a recipe for a rule).
#
# To test an empty value use
# `ifeq ($(foo),)`
#
# Often you want to test if a variable has a non-empty value. When the
# value results from complex expansions of variables and functions,
# expansions you would consider empty may actually contain whitespace
# characters and thus are not seen as empty. However, you can use the
# 'strip' function to avoid interpreting whitespace as a non-empty
# value. For example:
#
# `ifeq ($(strip $(foo)),)
# text-if-empty
# endif
# `
ifneq ($(DEBUG), )

# ** Function for Conditionals **
#
# A key aspect of all these functions is that not all of the
# arguments are expanded initially. Only those arguments which
# need to be expanded, will be expanded.
#
# Only one of three functions that provide conditional expansion
# is discussed here -> $(if condition,then-part[,else-part])
#
# The if function provides support for conditional expansion in
# functional context (as opposed to the GNU 'make' makefile
# conditionals such as 'ifeq').
#
# The first argument, 'condition', first has all preceding and
# trailing whitespace stripped, then is expanded. If it expands
# to a non-empty string, then the condition is considered to be
# true. If it expands to an empty string, the condition is considered
# to be false.
#
# If the condition is true then the second argument, 'then-part',
# is evaluated and this is used as the result of the evaluation
# of the entire 'if' conditon.
#
# If the condition is false then the third argument, 'else-part'
# is evaluated and this is the result of the 'if' function. If
# there is no third argument, the 'if' function evaluates to nothing
# (the empty string).
#
# Note that only one of the 'then-part' or the 'else-part' will
# be evaluated, never both. Thus, either can contain side-effects
# (such as 'shell' function calls, etc.)
NAME := $(if $(filter yes,$(DEBUG)),debug,release)

# ** Recursive Use of make **
# $(MAKE) -> Recursive use of make as a command in a makefile.
# This technique is useful when you want seperate makefiles for
# various subsystems that compose a larger system.
#
# -C -> Change to directory before reading Makefiles.
#  If multiple '-C' options are specified, each is interpreted
#  relative to the previous one: `-C / -C etc` is equivalent to
#  `-C /etc`.
#
#  '-f file'
#  '--file=file'
#  '--makefile=file' -> Read the file named file as a makefile
#
#  You may also find it useful to declare targets that invoke 
#  recursive make command as `.PHONY`.
#
#  For your convenience, when GNU make starts (after it has
#  processed any -C options) it sets the variable CURDIR to the
#  pathname of the current working directory. This value is 
#  never touched by make again: in particular note that if you
#  include files from  other directories the value of 'CURDIR'
#  does not change.

# ** Using Empty Recipes **
#
# Sometimes we define a recipe that does nothing. One reason 
# this is useful is to prevent a target from getting implicit
# recipes (from implicit rules or the .DEFAULT special target;
# see Implicit Rules and see Defining Last-Resort Default Rules).
#
# ** Rule Syntax **
#
# The 'recipe' lines start with a tab character (or the first
# character in the value of the .RECIPEPREFIX variable: see
# Special Variables). The first recipe line may appear on the
# line after the prerequisites, with a tab character, or may
# appear on the same line, with a semicolon. Either way, the 
# effect is the same.
all: ; $(MAKE) $(NAME) -C $(NAME) -f ../Makefile DEBUG=

else

# ** How to Use Variables **
#
# A variable name may be any sequence of characters not containing
# ':', '#', '=', or whitespace. However, variable names containing
# characters other than letters, numbers, and underscores should
# be considered carefully, as in some shells they cannot be
# passed through the environment to sub-make. Variable names
# beginning with '.' and an uppercase letter may be given special
# meaning in future versions of make.
#
# Variable names are case sensitive.
#
# It is traditional to use upper case letters, but we recommend
# using lower case letters for variable names that serve internal
# purposes in the makefile, and reserving upper case for parameters
# that control implicit rules or for parameters that the user
# should override with command options.
SRCS := max-heap.c max-heap-driver-prog.c

# $(SRCS:.c=.o) means, take the variable value $(SRCS). which is a string
# composed of words seperated by spaces, and for each word, replace suffix
# .c with .o
# This syntax is similar to bash string replacement (for one word).
# ref -> https://www.gnu.org/software/make/manual/html_node/Text-Functions.html
OBJS := $(SRCS:.c=.o)

.PHONY: debug release

debug: all

# ** Appending More Text to Variables **
#
# `object += another.o`
#
# This takes the value of the variable 'objects', and adds the text
# 'another.o' to it (preceded by a single space, if it has a value
# already).
# Thus:
#
# `objects = main.o foo.o bar.o utils.o
# objects += another.o
# `
#
# sets objects to 'main.o foo.o bar.o utils.o another.o'.
#
# Using '+=' is similar to:
#
# `objects = main.o foo.o bar.o utils.o
# objects := $(objects) another.o
# `
#
# but differs in ways that become important when you use more complex
# values.
#
# When the variable in question has not been defined before, '+=' acts
# just like normal '=': it defines a recursively-expanded variable.
# However, when there is previous definition, exactly what '+=' does
# depends on what flavor of variable you defined originally.
#
# When you add to a variable's value with '+=', 'make' acts essentially
# as if you had included the extra text in the initial definition of the
# variable. If you defined it first with ':=' or '::=', making it a
# simply-expanded-variable, '+=' adds to that simply-expanded definition,
# and expands the new text before appending it to the old value just as
# ':=' does.
# If fact,
#
# `variable := value
# variable += more
# `
#
# is exactly equivalent to:
#
# `variable := value
# variable := $(variable) more
# `
#
# On the other hand, when you use '+=' with a variable that you defined
# first to be recursively-expanded variable, 'make' does not expand the
# value you set for variable and function references immediately. Instead
# it stores the text verbatim, and saves these variable and function references
# to be expanded later, when you refer to a new variable. When you use
# '+=' on a recursively-expanded variable, it is this unexpanded text to
# which make appends the new text you specify.
#
# `variable = value
# variable += more
# `
#
# is roughly equivalent to:
#
# `temp = value
# variable = $(temp) more
# `
#
# except that of course it never defines a variable called temp. The importance
# of this comes when the variable's old value contains variable references.
# Take this commom example:
#
# `CFLAGS = $(include) -O
# ...
# CFLAGS += -pg # enable profiling
# `
#
# The first line defines the CFLAGS variable with a reference to another
# variable, 'includes'. (CFLAGS is used by rules for C compilation). Using
# '=' for the definition makes CFLAGS a recursively-expanded variable,
# meaning `$(includes) -O' is not expanded when make processes the definition
# of CFLAGS. Thus, 'includes' need not be defined yet for its value to
# take effect. It only has to be defined before any references to CFLAGS.
# Thus, 'includes' need not be defined yet for its value to take effect.
# It only has to be defined before any reference to CFLAGS. If we tried
# to append to the value of CFLAGS without using '+=', we might do it like
# this:
#
# `CFLAGS := $(CFLAGS) -pg # enable profiling`
#
# This is pretty close, but not quite what we want. Using ':=' redefines
# CFLAGS as a simply-expanded variable; this means make exapands the text's
# `$(CFLAGS) -pg` before setting the variable. If 'includes' is not yet
# defined, we get ` -O -pg', and a later definition of 'includes' will
# have no effect. Conversely, by using '+=' we set CFLAGS to the unexpanded
# value `$(includes) -O -pg`. Thus we preserve the reference to 'includes',
# so if that variable gets defined at any later point, a reference like
# `$(CFLAGS)` still uses its value.
debug: CPPFLAGS += -g

release: all

all: $(OBJS)

max-heap.o: max-heap-hdr.h

max-heap-driver-prog.o: max-heap-hdr.h max-heap.c

# ** Searching Directories for Prerequisites **
#
INCLUDE_DIRECTORIES = ../include

vpath %.h $(INCLUDE_DIRECTORIES)

vpath %.c ../src

# ** Overriding Variables **
#
# Upper case letters are reserved for parameters that control implicit
# rules or for parameters that the user should override with command
# options.
#
# An argument that contains '=' specifies the value: 'v=x' sets the
# value of the variable v to x. If you specify a value in this way,
# all ordinary assignments of the same variable in the makefile are
# ignored: we say they have been overridden by the command line argument.
#
# The most common way to use this facility is to pass extra flags to
# compilers. For example, in a properly written makefile, the variable
# 'CFLAGS' is included in each recipe that runs the C compiler, so a
# file foo.c would be compiled something like this:
#
# `CC -c $(CFLAGS) foo.c`
#
# Thus, whatever value you set for 'CFLAGS' affects each compilation
# that occurs. The makefile probably specifies the usual value for
# 'CFLAGS', like this:
#
# `CFLAGS=-g`
#
# Each time you run make, you can override this value if you wish.
# For example, if you say `make CFLAGS='-g -O'`, each C compilation
# will be done with `cc -c -g -O`. (This also illustrates how you
# can use quoting in the shell to enclose spaces and the other
# special characters in the value of a variable when you override it.)

# ** Variables Used by Implicit Rules **
# 
# CPPFLAGS
# 	
# 	Extra flags to give to the C preprocessor and programs that use 
# 	it (the C and Fortran compilers.)
CPPFLAGS += $(addprefix -I,$(INCLUDE_DIRECTORIES))

endif
