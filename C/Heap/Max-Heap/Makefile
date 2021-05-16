.PHONY: all

ifneq ($(DEBUG), )

NAME := $(if $(filter yes,$(DEBUG)),debug,release)

all: ; $(MAKE) $(NAME) -C $(NAME) -f ../Makefile DEBUG=

else

SRCS := max-heap.c max-heap-driver-prog.c

# $(SRCS:.c=.o) means, take the variable value $(SRCS). which is a string
# composed of words seperated by spaces, and for each word, replace suffix
# .c with .o
# This syntax is similar to bash string replacement (for one word).
# ref -> https://www.gnu.org/software/make/manual/html_node/Text-Functions.html
#
# `$(var:a=b)` is equivalent to `$(patsubst %a,%b,var)`.
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
