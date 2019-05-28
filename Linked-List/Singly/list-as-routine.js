/* CLRS 3rd Edition, Chapter 10: Elementary Data Structures */
/* List DS follows hole model.
  * Free position are holes. If an existing item is deleted, a hole is created
  * in its place and next of this hole points to sentinel hole.
  * Any new item added thereof will be given this hole position. */

'use strict';

var LinkedList = {};

LinkedList.prepend = function prepend(listNode, key) {
  let { list, head, free } = listNode;

  // Get free position(index in the list array)
  const freePos = this.allocateObject(listNode);

  // Initialize an emplty object at freePos
  list[freePos] = {};

  // Set key
  list[freePos].key = key;

  // point next of element being inserted to index where head points
  list[freePos].next = head;

  // point head to index of element being inserted
  listNode.head = freePos;
}

LinkedList.allocateObject = function allocateObject(listNode) {
  let { list, head, free } = listNode;

  // If allocating the sentinel.
  if (list[free].next === null) {
    const free_tmp = free;
    listNode.free++;

    // Initialize new sentinel object { next: null }, this is maintained at the end of the list.
    list[listNode.free] = {};
    list[listNode.free].next = null;
    return free_tmp;
  } else {
    // Allocating a hole.
    const free_tmp = free;
    listNode.free = list[listNode.free].next;
    return free_tmp;
  }
}

LinkedList.insertSort = function insertSort(listNode) {
  let { list, head, free } = listNode,
    prev_stack = [];

  let curr_idx = list[head].next;

  while (curr_idx !== null) {
    let pos_idx = curr_idx;

    prev_stack.push(pos_idx);

    let next_idx = list[curr_idx].next;

    while (list[pos_idx] !== null && list[pos_idx].key > list[curr_idx].key) {
      pos_idx = prev_stack.pop();
    }


  }
}

LinkedList.print = function print(listNode) {
  let { list, head, free } = listNode;

  let curr_idx = head;

  while (curr_idx !== null) {
    let { next } = list[curr_idx];
    console.log(list[curr_idx].key);
    curr_idx = next;
  }
}

module.exports = LinkedList;
