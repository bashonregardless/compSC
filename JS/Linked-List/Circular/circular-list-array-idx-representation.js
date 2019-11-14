/* CLRS 3rd Edition, Chapter 10: Elementary Data Structures, Section 10.3: A multiple-array representation of objects */

/* Linked list is implemented with three arrays:
 * 	 The array 'key': holds the values of the keys currently in the dynamic set,
 * 	 and the pointers reside in the arrays 'next' and 'prev'.
 *
 * 	 For a given array index x, the array entries 'key[x]', 'next[x]' and 'prev[x]'
 * 	 represent an object in the linked list.
 * 	 Under this interpretation, a pointer x	is simply a common index into the 'key',
 * 	 'next' and 'prev' arrays.
 */

'use strict';

const LinkedList = Object.create(require('../../input_node'));

LinkedList.setup = function setup() {
  //this.list = [{next: null, prev: null}];

  /* Attribute lhead points to the first element (index of list array) of the list.
   * We use an integer (such as -1) that cannot possibly represent an actual index
   * into arrays.
   */
  this.lhead = -1; 

  // Attribute last points to the last element in the list.
  this.last = -1;

  // We keep the free objects in a singly linked list, which we call the free list.
  // The free list uses only 'next' array, which stores next pointers within the
  // list. The head of the free list is held in the global variable 'free'.
  //
  // When the dynamic set represented by linked list is nonempty, the free list may
  // be intertwined with the list L.
  //
  // Note that each object in the representation is either in list L ore in the free
  // list, but not in both.
  this.free = -1;

  this.key = [];
  this.next = [];
  this.prev = [];

  //this.list = [this.allocateObject()]; 

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

LinkedList.newNode = function new_node (val, freeIdx) {
  this.key[freeIdx] = val;
  this.next[freeIdx] = -1;
  this.prev[freeIdx] = -1;
}

LinkedList.prepend = function prepend (val) {
  const freeIdx = this.allocateObject();
  const node = this.newNode(val, freeIdx);

  /* In case the list is empty */
  if (this.lhead === -1) {
	/* store array index of first node in lhead */
	this.lhead = freeIdx;
	this.next[freeIdx] = freeIdx;
	this.prev[freeIdx] = freeIdx;
	this.last = freeIdx;
  }

  else {
	this.next[freeIdx] = this.lhead;
	this.prev[freeIdx] = this.prev[this.lhead];
	this.prev[this.lhead] = freeIdx;
	this.lhead = freeIdx;
	this.next[this.last] = freeIdx;
  }
}

/* returns array index of free node */
LinkedList.allocateObject = function allocate_object () {
  /* If free is not available:
   * A node is added to free list by reclaiming nodes from prior allocated nodes to list.
   *
   * (case) When first node is being allocated memory, free is not available.
   *
   * (case) When all allocated have been consumed , till free is consumed 
   * free is not available.
   */
  if (this.free === -1) {
	return this.next.length;
  } else {
	const free = this.free;
	this.free = this.next[this.free];
	return free;
  }
}

LinkedList.freeNode = function free_node (idx) {
  this.next[this.free] = this.free;
  this.free = idx;
}

module.exports = LinkedList;
