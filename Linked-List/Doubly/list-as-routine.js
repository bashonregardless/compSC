/* CLRS 3rd Edition, Chapter 10: Elementary Data Structures */

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

  // point prev of element that head previously pointed to, to index of element being inserted
  if (head !== null) {
    list[head].prev = freePos;
  }

  // point head to index of element being inserted
  listNode.head = freePos;

  // prev of first element points to an integer
  // (such -1 or null) that cannot possibly represent an actual index into the arrays.
  list[freePos].prev = -1;
}

LinkedList.allocateObject = function allocateObject(listNode) {
  let { list, head, free } = listNode;

  if (list[free].next === null) {
    const free_tmp = free;
    listNode.free++;

    // sentinel object {next: null}, this is maintained at the end of the list
    list[listNode.free] = {};
    list[listNode.free].next = null;
    return free_tmp;
  } else {
    const free_tmp = free;
    listNode.free = list[listNode.free].next;
    return free_tmp;
  }
}

LinkedList.insertSort = function insertSort(listNode) {
  const {
    head, free, list
  } = listNode;

  // First element has no previous node to compare to.
  // Therefore, start at second element in the list and not at first.
  let curr_idx = list[head].next;

  while (curr_idx !== null) {
    let pos_idx = curr_idx;

    let { prev: c_n_prev, next: c_n_next, key: c_n_key } = list[curr_idx];

    //let { prev: c_p_prev, next: c_p_next, key: c_p_key } = list[pos_idx];

    // Store next index for next iteration. 
    let next_idx = c_n_next;

    // Current position node: node reached while searching for key less than current idx node
    while (list[pos_idx].prev !== -1 && list[list[pos_idx].prev].key > list[curr_idx].key) {
      pos_idx = list[pos_idx].prev;
    }

    if (list[pos_idx].prev === -1) {
      /* Current position ( c_p ) will always be the node head initially points to. */

      // Point prev of c_p to c_n
      list[pos_idx].prev = curr_idx;

      // Point prev of c_n_n ( Current node next node ) to prev of c_n.
      if (c_n_next !== null) list[c_n_next].prev = c_n_prev;

      // Point next of c_n_p ( Current node previous node ) node to next of c_n.
      list[c_n_prev].next = c_n_next;

      // Point next of c_n to previous head, i.e, c_p.
      list[curr_idx].next = listNode.head;

      // Make c_n first node in the list.
      list[curr_idx].prev = -1;

      // Update head. Point c_p prev to curr_node.
      listNode.head = curr_idx;
    } else {
      // If current node has the largest key value
      if (pos_idx === curr_idx) {
        curr_idx = next_idx;
        continue;
      }

      // Point next of c_n_p ( Current node previous node ) to next of c_n.
      list[c_n_prev].next = c_n_next;
    
      // Point next of c_p_p ( Current position previous node ) to c_n.
      list[list[pos_idx].prev].next = curr_idx;
      
      // Point prev of c_n to prev of c_p.
      list[curr_idx].prev = list[pos_idx].prev;

      // Point prev of c_p to c_n.
      list[pos_idx].prev = curr_idx;

      // Point prev of c_n_n to c_n prev.
      if (c_n_next !== null) list[c_n_next].prev = c_n_prev;

      // Point next of c_n to c_p.
      list[curr_idx].next = pos_idx;
    }

    curr_idx = next_idx;
  }
}

LinkedList.mergeSort = function mergeSort() {
 
}

LinkedList.print = function print(listNode) {
  let { list, head, free } = listNode;

  let curr_idx = head;

  while (curr_idx !== null) {
    let { next: c_n_next } = list[curr_idx];
    console.log(list[curr_idx].key);
    curr_idx = c_n_next;
  }
}

module.exports = LinkedList;
