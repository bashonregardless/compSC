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

  this.listLength = 0;

  //operation_selector(this);
}

LinkedList.newNode = function new_node (val, freeIdx) {
  this.key[freeIdx] = val;
  this.next[freeIdx] = -1;
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
	this.last = freeIdx;
  }

  else {
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

	this.next[curr] = freeIdx;
	this.listLength++;
	this.last = freeIdx;
  }
}

LinkedList.insertAt = function insert_at (val, pos) {
  /* get the position previous to position of interest */
  const curr = this.traverse(+pos - 1);

  const freeIdx = this.getFreeIdx();
  this.newNode(val, freeIdx);

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

  if (val == this.key[this.lhead]) {
	/* store idx of node of interest (node to be deleted) */
	const idxOfInterest = this.next[this.lhead];

	/* freeList PUSH opreation */
	this.next[this.lhead] = this.free;
	/* PUSH to free list */
	this.free = this.lhead;
	this.last = this.lhead;

	this.key[this.lhead] = '';
	this.lhead = idxOfInterest;
  } else {
	/* store idx of node of interest (node to be deleted) */
	const idxOfInterest = this.next[curr];

	/* 'this.next[curr]' will be an actual node not pointing to -1, because of how we getPrevIdx 
	 * Therefore, the check 'this.next[curr] != -1' is unnecessary 
	 */
	this.key[this.next[curr]] = '';
	this.next[curr] = this.next[this.next[curr]];

	this.next[idxOfInterest] = this.free;
	/* PUSH to free list */
	this.free = idxOfInterest;
	this.last = curr;
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
	this.last = free;
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

//LinkedList.setup();
module.exports = LinkedList;
