/* CLRS 3rd Edition, Chapter 10: Elementary Data Structures */

'use strict';

const LinkedList = Object.create(require('../../input_node'));

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
    let input = await this.requestProcedure();
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
          this.insertAt(input.node.value, input.node.position);
      }
    }

    if (input.procedure === 'd') this.deleteNode(input.node);

    if(await this.prompt("Continue? Yes / No > ") === "No")
      break;
  }
  console.log(this.list);
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

LinkedList.prepend = function prepend(key) {
  // Get free position(index in the list array)
  const freePos = this.allocateObject();
  // Initialize an emplty object at freePos
  this.list[freePos] = {};

  // Set key
  this.list[freePos].key = key;
  // point next of element being inserted to index where head points
  this.list[freePos].next = this.lhead;
  // point prev of element that head previously pointed to, to index of element being inserted
  if (this.lhead !== null) 
    this.list[this.lhead].prev = freePos;
  // point head to index of element being inserted
  this.lhead = freePos;
  // prev of first element points to an integer
  // (such -1 or null) that cannot possibly represent an actual index into the arrays.
  this.list[freePos].prev = -1;
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

LinkedList.allocateObject = function allocateObject() {
  if (this.list[this.free].next === null) {
    const free = this.free;
    this.free++;

    // sentinel object {next: null}, this is maintained at the end of the list
    this.list[this.free] = {};
    this.list[this.free].next = null;
    return free;
  } else {
    const free = this.free;
    this.free = this.list[free].next;
    return free;
  }
}

module.exports = LinkedList;
