/* CLRS 3rd Edition, Chapter 10: Elementary Data Structures */

'use strict';

var LinkedList = {};

LinkedList.setup = function setup(bucket_arr, i) {
  // Attribute lhead points to the first element (index of list array) of the list
  this.lhead = null; 

  // We keep the free objects in a singly linked list, which we call the free list.
  // prev of objects in free list always equal -1, an integer
  // (such -1) that cannot possibly represent an actual index into the arrays.
  // The head of the free list is held in the global variable free.
  this.free = 0;

  this.list = [{ next: null }]; 

  return this.list;
}

LinkedList.search = function search(key) {
  let curr = this.lhead;

  while (this.list[curr] !== null && this.list[curr].key !== key) {
    curr = this.list[curr].next; 
  }

  return curr;
}

LinkedList.traverse = function traverse(pos) {
  let curr = this.lhead;
  
  while (pos > 1 && this.list[curr].next !== null) {
    curr = this.list[curr].next;
    pos--;
  }

  return curr;
}

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

/* Given an element x whose key attribute has already been set,
 * the LIST-INSERT procedure “splices” x onto the end of the linked list */
LinkedList.append = function append(key) {
  if (this.list.length === 1) {
    this.prepend(key);
  } else {
    // Get free position(index in the list array)
    const freePos = this.allocateObject();
    // Initialize an emplty object at freePos
    this.list[freePos] = {};
    // curr is the index of object in list array where procedure is to be performed.
    // In this case, at the end of the list.
    const curr = this.traverse(this.list.length - 1);

    this.list[freePos].key = key;
    this.list[freePos].prev = curr;
    this.list[freePos].next = null;
    this.list[curr].next = freePos;
  }
}

LinkedList.insertAt = function insertAt(key, pos) {
  // Get free position(index in the list array)
  const freePos = this.allocateObject();
  // Initialize an emplty object at freePos
  this.list[freePos] = {};

  // curr is the index of object in list array where insertAt procedure is to be performed.
  const curr = this.traverse(pos);

  // allocate object is taken from free 
  this.list[freePos].key = key;
  // make "next of previous node to current node" equal to "index of node" being inserted
  this.list[this.list[curr].prev].next = freePos;
  // make "prev of node being inserted" equal to prev of current node
  this.list[freePos].prev = this.list[curr].prev;
  // make "prev of current node" equal to 'index of node' being inserted 
  this.list[curr].prev = freePos;
  // make "next of node" being inserted equal to index of current node
  this.list[freePos].next = curr;
}

LinkedList.findByKey = function findByKey(key) {
  let curr = this.lhead;

  while (this.list[curr].key !== key && this.list[curr].next !== null) {
    curr = this.list[curr].next;
  }

  return curr;
}

LinkedList.deleteNode = function deleteNode(key) {
  // Get index of node to be deleted in list
  let curr = this.findByKey(key);  

  if (this.list[curr].prev !== -1) {
    this.list[this.list[curr].prev].next = this.list[curr].next;
  } else this.lhead = this.list[curr].next;

  if (this.list[curr].next !== null) {
    this.list[this.list[curr].next].prev = this.list[curr].prev;
  }

  // Free object
  this.list[curr].key = '';
  this.list[curr].next = this.free;
  this.list[curr].prev = -1;
  this.free = curr;
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
