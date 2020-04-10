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

ifneq ($(DEBUG), )

NAME := $(if $(filter yes,$(DEBUG)),debug,release)

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
all: ; $(MAKE) $(NAME) -C $(NAME) -f ../Makefile DEBUG=

else

SRCS := max-heap.c max-heap-driver-prog.c

# $(SRCS:.c=.o) means, take the variable value $(SRCS). which is a string
# composed of words seperated by spaces, and for each word, replace suffix
# .c with .o
# This syntax is similar to bash string replacement (for one word).
# ref -> https://www.gnu.org/software/make/manual/html_node/Text-Functions.html
OBJS := $(SRCS:.c=.o)

.PHONY: debug release

debug: all

debug: CPPFLAGS += -g

release: all

all: $(OBJS)

max-heap.o: max-heap-hdr.h

max-heap-driver-prog.o: max-heap-hdr.h max-heap.c

INCLUDE_DIRECTORIES = ../include

vpath %.h $(INCLUDE_DIRECTORIES)

vpath %.c ../src

CPPFLAGS += $(addprefix -I,$(INCLUDE_DIRECTORIES))

endif
