/* CLRS 3rd Edition, Chapter 10: Elementary Data Structures */
/* List DS follows hole model.
  * Free position are holes. If an existing item is deleted, a hole is created
  * in its place and next of this hole points to sentinel hole.
  * Any new item added thereof will be given this hole position. */

'use strict';

const stdIn = require('../../input_node'),
  LinkedList = Object.create(stdIn);

LinkedList.init = function setup() {
  //  attribute lhead points to the first element (index of list array) of the list
  this.lhead = null; 

  // We keep the free objects in a singly linked list, which we call the free list.
  // prev of objects in free list always equal -1, an integer
  // (such -1) that cannot possibly represent an actual index into the arrays.
  // The head of the free list is held in the global variable free.
  this.free = 0;

  this.list = [{next: null}]; 

  this.input();

}

LinkedList.input = async function input() {
  const node = {};
  while(true) {
    let input = await stdIn.requestProcedure();
    if (input.procedure === "i") {
      switch (input.node.position) {
        case '1':
        case 's':
          this.prepend(input.node.value);
          break;
        case 'e':
        case `${this.list.length}`:
          this.append(input.node.value);
          break;
        default:
          this.insertNth(input.node.value, input.node.position);
      }
    }

    if (input.procedure === 'd') this.deleteNode(input.node);

    if(await this.prompt("Continue? Yes / No > ") === "No")
      break;
  }
  console.log(this.list, this.lhead, this.free);
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

  // Traverse till the node after which procedure is to be performed.
  // Eg. insertAt(key, 2) will traverse till 1st node.
  while (pos > 2 && this.list[curr].next !== null) {
    curr = this.list[curr].next;
    pos--;
  }

  return curr;
}

LinkedList.prepend = function prepend(key) {
  // Get free position(index in the list array)
  const freePos = this.allocateObject();

  // Initialize an emplty object at freePos
  this.list[freePos] = {};

  // Set key
  this.list[freePos].key = key;

  // point next of element being inserted to index where head points
  this.list[freePos].next = this.lhead;

  // point head to index of element being inserted
  this.lhead = freePos;
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
    this.list[freePos].next = null;
    this.list[curr].next = freePos;
  }
}

LinkedList.insertNth = function insertNth(key, pos) {
  // Get free position(index in the list array)
  const freePos = this.allocateObject();

  // Initialize an emplty object at freePos
  this.list[freePos] = {};

  // curr is the index of object in list ( list is represented as array in languages
  // that have no explicit pointers ) where insertNth procedure is to be performed.
  const curr = this.traverse(pos);

  // allocate object is taken from free list.
  this.list[freePos].key = key;

  // make "next of node" being inserted equal to index of current node
  this.list[freePos].next = this.list[curr].next;

  // make "next of previous node to current node" equal to "index of node" being inserted
  this.list[curr].next = freePos;

}

LinkedList.findByKey = function findByKey(key) {
  let curr = this.lhead,
    prev;

  while (this.list[curr].key !== key && this.list[curr].next !== null) {
    curr = this.list[curr].next;
  }

  return curr;
}

LinkedList.deleteNode = function deleteNode(key) {
  // Get index of node before the node that is to be deleted.
  let curr = this.lhead, prev;

  // Search for the key to be deleted, keep track of the 
  // previous node as we need to change 'prev.next' 
  while (this.list[curr].key !== key && this.list[curr].next !== null) {
    prev = curr;
    curr = this.list[curr].next;
  }

  // If node to be deleted is the first node.
  if (this.lhead === curr) {
    this.lhead = this.list[curr].next;
  } else {
    this.list[prev].next = this.list[curr].next;
  }

  // Free object ( Creates a hole ).
  this.list[curr].key = '';
  this.list[curr].next = this.free;
  this.free = curr;
}

LinkedList.allocateObject = function allocateObject() {
  if (this.list[this.free].next === null) {
    const free = this.free;
    this.free++;

    // Initialize new sentinel object { next: null }, this is maintained at the end of the list.
    this.list[this.free] = {};
    this.list[this.free].next = null;
    return free;
  } else {
    const free = this.free;
    this.free = this.list[free].next;
    return free;
  }
}

LinkedList.init();
