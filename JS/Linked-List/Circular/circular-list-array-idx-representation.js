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
  while(true) {
	try {
	  let input = await this.requestProcedure();
	  let { position, value } = input.node;

	  if (input.procedure === "i") {
		switch (position) {
		  case '1':
		  case 's':
			this.prepend(value);
			break;
		  case 'e':
		  case `${this.listLength + 1}`:
			this.append(value);
			break;
		  default:
			/* Check to see if position is an integer */
			if ( !((position ^ 0) === parseInt(position, 10) )) {
			  console.log(`Invalid input: Position ${position} is not an integer`);
			  continue;
			}

			/* Check to see if position exceeds list length */
			if (position - 1 > this.listLength) {
			  console.log(`Invalid input: Position ${position} exceeds list length ${this.listLength}\nTry Again\n`);
			  continue;
			}

			this.insertAt(value, position);
		}
	  }

	  if (input.procedure === 'd') this.freeNode(input.node);

	  const resp = await this.prompt("Continue? y / n > ");
	  if (resp === "n")
		break;
	  console.log("\n");
	}
	catch (err) {
	  console.log(err);
	}
  }

  this.printList(this.lhead);
  process.exit(0);
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
	if (this.next[idx] === this.free || pos > this.last)
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
  while (pos > 2) {
	/* Desired position of insertion is not found in two cases:
	 * (case): the 'next' collides with 'free'.
	 * (case): entire list is traversed unsuccessfully.
	 */
	if (this.next[idx] === this.free)
	  return "Position does not exist";
	idx = this.next[idx];
	pos--;
  }
  return idx;
}

LinkedList.prepend = function prepend (val) {
  const freeIdx = this.allocateObject();
  this.newNode(val, freeIdx);

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
	this.next[this.last] = freeIdx;

	this.lhead = freeIdx;
  }

  this.listLength++;
}

LinkedList.append = function append (val) {
  if (this.lhead === -1) {
	this.prepend(val);
  } else {
	const freeIdx = this.allocateObject();
	this.newNode(val, freeIdx);

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
  this.newNode(val, freeIdx);

  this.next[freeIdx] = this.next[curr];
  this.prev[freeIdx] = curr;

  this.prev[this.next[curr]] = freeIdx;
  this.next[curr] = freeIdx;

  this.listLength++;
}

LinkedList.freeNode = function free_node (val) {
  // Get index of node to be deleted in list
  const delIdx = this.findByKey(val);

  if (typeof delIdx === "string")
	return delIdx;

  this.next[this.prev[delIdx]] = this.next[delIdx];
  this.prev[this.next[delIdx]] = this.prev[delIdx];

  if (delIdx == this.lhead) {
	this.lhead = this.next[this.lhead];
  }

  if (delIdx === this.last) {
	this.last = this.prev[delIdx];
  }

  this.listLength--;
  if (this.listLength === 0) {
	this.lhead = -1;
	this.last = -1;
  }

  if (this.free !== -1)
	this.next[this.free] = delIdx;
  this.free = delIdx;
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

LinkedList.printList = function print_list (head) {
  let stubIdx = head;

  for (; stubIdx !== this.last;) {
	process.stdout.write(`key: ${this.key[stubIdx]} -> `);
	stubIdx = this.next[stubIdx];
  }
  console.log(`key: ${this.key[this.last]}`);
}

module.exports = LinkedList;
