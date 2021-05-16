objects = max-heap.o max-priority-queue.o max-priority-queue-driver-prog.o

max-priority-queue-target: $(objects)
	gcc -o max-priority-queue $(objects) -ggdb -g3 -lm

max-heap.o: ../../Heap/Max-Heap/max-heap.c ../../Heap/lib/max-heap-hdr.h
	gcc -I ../../Heap/lib/ -c max-heap.c

max-priority-queue.o: ../../Heap/lib/max-heap-hdr.h ../lib/max-priority-queue-hdr.h
	gcc -I ../../Heap/lib/ -I ../lib/ -c max-priority-queue.c

max-priority-queue-driver-prog.o: ../../Heap/lib/max-heap-hdr.h ../lib/max-priority-queue-hdr.h
	gcc -I ../../Heap/lib/ -I ../lib/ -c max-priority-queue-driver-prog.c

