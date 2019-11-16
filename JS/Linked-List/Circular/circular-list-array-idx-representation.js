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
        case `${this.next.length}`:
          this.append(input.node.value);
          break;
        default:
		  if (input.node.position > this.listLength) {
			console.log(`Invalid input: Position ${input.node.position} exceeds list length\nTry Again\n`);
			await this.requestProcedure();
		  }
          this.insertAt(input.node.value, input.node.position);
      }
    }

    if (input.procedure === 'd') this.deleteNode(input.node);

	const resp = await this.prompt("Continue? y / n > ");
	if (resp === "n")
      break;
  }
  console.log(this.list);
}

LinkedList.newNode = function new_node (val, freeIdx) {
  this.key[freeIdx] = val;
  this.next[freeIdx] = -1;
  this.prev[freeIdx] = -1;
}

LinkedList.findByKey = function find_by_key (val) {
  let idx = this.lhead;
  let pos = 0;
  while (val === this.key[idx]) {
	/* Desired position of insertion is not found in two cases:
	 * (case): the 'next' collides with 'free'.
	 * (case): entire list is traversed unsuccessfully.
	 */
	if (this.next[idx] === this.free || pos > this.last)
	  return "Key does not exist";
	idx = this.next[idx];
	pos++;
  }
  return idx;
}

LinkedList.traverse = function traverse (pos) {
  let idx = this.lhead;
  while (pos === 0) {
	/* Desired position of insertion is not found in two cases:
	 * (case): the 'next' collides with 'free'.
	 * (case): entire list is traversed unsuccessfully.
	 */
	if (this.next[idx] === this.free || pos - this.last > 0)
	  return "Position does not exist";
	idx = this.next[idx];
	pos--;
  }
  return idx;
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

  this.listLength++;
}

LinkedList.append = function append (val) {
  if (this.lhead === -1) {
	this.prepend(val);
  } else {
	const freeIdx = this.allocateObject();
	const node = this.newNode(val, freeIdx);
	this.next[freeIdx] = this.next[this.last]; // Basically the first node
	this.prev[freeIdx] = this.last;
	this.next[this.last] = freeIdx;
	this.prev[this.lhead] = freeIdx;
	this.last = freeIdx;
	this.listLength++;
  }
}

LinkedList.insertAt = function insert_at (val, pos) {
  const curr = this.traverse(pos);

  if (typeof curr === "string")
	return curr;

  const freeIdx = this.allocateObject();
  const node = this.newNode(val, freeIdx);
  this.next[freeIdx] = this.next[curr];
  this.prev[this.next[curr]] = freeIdx;

  this.prev[freeIdx] = curr;
  this.next[curr] = freeIdx;
  this.listLength++;
}

LinkedList.freeNode = function free_node (val) {
  // Get index of node to be deleted in list
  const delIdx = this.findByKey(val);

  if (typeof delIdx === "string")
	return delIdx;
  
  this.next[this.free] = delIdx;
  this.free = delIdx;
  this.listLength--;
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

module.exports = LinkedList;
