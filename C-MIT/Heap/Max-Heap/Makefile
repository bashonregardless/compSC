INCLUDE_DIRECTORIES = include

SRCS := max-heap.c max-heap-driver-prog.c

OBJS := $(SRCS:.c=.o)

CPPFLAGS += $(addprefix -I, $(INCLUDE_DIRECTORIES))

.PHONY: all

all: $(OBJS)

max-heap.o: max-heap-hdr.h

max-heap-driver-prog.o: max-heap-hdr.h max-heap.c

vpath %.h $(INCLUDE_DIRECTORIES)

vpath %.c src

