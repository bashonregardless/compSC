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

const operation_selector = require('../operation-selector');
const LinkedList = Object.create(require('../interactive-request-procedures'));

LinkedList.setup = function setup() {
  /* Attribute lhead points to the first element (index of list array) of the list.
   * We use an integer (such as -1) that cannot possibly represent an actual index
   * into arrays.
   */
  this.lhead = -1; 

  // Attribute last points to the last element in the list.
  this.last = -1;

  /* We keep the free objects in a singly linked list, which we call the free list.
  * The free list uses only 'next' array, which stores next pointers within the
  * list. The head of the free list is held in the global variable 'free'.
  *
  * When the dynamic set represented by linked list is nonempty, the free list may
  * be intertwined with the list L.
  *
  * Note that each object in the representation is either in list L ore in the free
  * list, but not in both.
  */
  this.free = -1;

  this.key = [];
  this.next = [];
  this.prev = [];

  this.listLength = 0;

  operation_selector(this);
}

LinkedList.newNode = function new_node (val, freeIdx) {
  this.key[freeIdx] = val;
  this.next[freeIdx] = -1;
  this.prev[freeIdx] = -1;
}

LinkedList.findByKey = function find_by_key (val) {
  let idx = this.lhead;
  let pos = 0;
  while (val !== this.key[idx]) {
	/* Desired position of insertion is not found in two cases:
	 * (case): the 'next' collides with 'free'.
	 * (case): entire list is traversed unsuccessfully.
	 */
	if (this.next[idx] === this.free)
	  return "Key does not exist";
	idx = this.next[idx];
	pos++;
  }
  return idx;
}

/* returns the position previous to position of interest */
LinkedList.traverse = function traverse (pos) {
  let idx = this.lhead;

  /* Suppose the positon of insertion is 3,
   * In first iteration itself the position previous to position of interest. i.e 2
   * is reached.
   */
  while (pos > 1) {
	/* Desired position of insertion is not found in two cases:
	 * (case): the 'next' collides with 'free'.
	 * (case): entire list is traversed unsuccessfully.
	 */
	if (pos > this.listLength)
	  return "Position does not exist";
	idx = this.next[idx];
	pos--;
  }
  return idx;
}

LinkedList.prepend = function prepend (val) {
  const freeIdx = this.getFreeIdx();
  this.newNode(val, freeIdx);

  /* In case the list is empty */
  if (this.lhead === -1) {
	/* store array index of first node in lhead */
	this.lhead = freeIdx;
  }

  else {
	this.prev[this.lhead] = freeIdx;
	this.next[freeIdx] = this.lhead;
	this.lhead = freeIdx;
  }

  this.listLength++;
}

LinkedList.append = function append (val) {
  if (this.lhead === -1) {
	this.prepend(val);
  } else {
	const freeIdx = this.getFreeIdx();
	this.newNode(val, freeIdx);

	/* get the position previous to position of interest */
	const curr = this.traverse(this.listLength);

	this.prev[freeIdx] = curr;
	this.next[curr] = freeIdx;
	this.listLength++;
  }
}

LinkedList.insertAt = function insert_at (val, pos) {
  /* get the position previous to position of interest */
  const curr = this.traverse(+pos - 1);

  const freeIdx = this.getFreeIdx();
  this.newNode(val, freeIdx);

  this.prev[this.next[curr]] = freeIdx;
  this.prev[freeIdx] = curr;
  this.next[freeIdx] = this.next[curr];
  this.next[curr] = freeIdx;

  this.listLength++;
}

/* returns idx prev to idx of interest, "message" otherwise */
LinkedList.getPrevIdx = function get_prev_idx (val) {
  let idx = this.lhead;
  let pos = 0;

  if (val == this.key[this.lhead])
	return idx;

  /* if idx is not equal to lhead, then 'this.key[this.next[idx]]' will always exist */
  while (val != this.key[this.next[idx]]) {
	if (this.next[idx] === this.free || pos > this.listLength)
	  return "Key does not exist";
	idx = this.next[idx];
	pos++;
  }

  return idx;
}

LinkedList.freeNode = function free_node (val) {
  // Get prev idx of key to be deleted.
  const curr = this.getPrevIdx(val);

  if (typeof curr === "string")
	return curr;

  /* When node to be deleted is the head node itself */
  if (val == this.key[this.lhead]) {
	/* idxOfInterest (node to be deleted) is the head node */
	const idxOfInterest = this.lhead;

	this.key[idxOfInterest] = '';

	/* handle deletion of first and only node */
	if (this.next[idxOfInterest] != -1) {
	  this.prev[this.next[idxOfInterest]] = -1;
	}
	this.prev[idxOfInterest] = "";

	this.lhead = this.next[idxOfInterest];
	
	/* store current next in next of new free */
	this.next[idxOfInterest] = this.free;
	/* PUSH to free list */
	this.free = idxOfInterest;
  }
  
  /* When node to be deleted is some other node than the head node */
  else {
	/* store idx of node of interest (node to be deleted) */
	const idxOfInterest = this.next[curr];

	/* 'this.next[curr]' will be an actual node not pointing to -1, because of how we getPrevIdx 
	 * Therefore, the check 'this.next[curr] != -1' is unnecessary 
	 */
	this.key[idxOfInterest] = '';
	
	/* handle deletion of last element */
	if (this.next[idxOfInterest] != -1) {
	  this.prev[this.next[idxOfInterest]] = curr;
	}
	this.prev[idxOfInterest] = "";

	this.next[curr] = this.next[idxOfInterest];

	/* store current next in next of new free */
	this.next[idxOfInterest] = this.free;
	/* PUSH to free list */
	this.free = idxOfInterest;
  }

  this.listLength--;
}

/* similar operation is allocate-object in CLRS */
/* returns array index of free node */
LinkedList.getFreeIdx = function get_free_idx () {
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
	/* freeList POP operation */
	this.free = this.next[this.free];
	return free;
  }
}

LinkedList.printList = function print_list (head) {
  let stubIdx = head;
  let pos = this.listLength;

  for (; pos > 0;) {
	process.stdout.write(`key: ${this.key[stubIdx]} -> `);
	stubIdx = this.next[stubIdx];
	pos--;
  }
}

/* Uncomment below line to work with this file independently */
//LinkedList.setup();

/* Uncomment below line for this file to be used as routine */
module.exports = LinkedList;
