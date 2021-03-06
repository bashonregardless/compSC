/* bucket sort assumes that the input is generated by a
 * random process that distributes elements uniformly and
 * independently over the interval [0, 1). */

var stdIn = require('../../../input'),
  ListAsRoutine = require('../../../Linked-List/Singly/list-as-routine'),
  util = require('util'),
  BucketSort = Object.create(ListAsRoutine);

BucketSort.setup = async function setup() {
  this.input_arr = await stdIn.createInputArr();
  this.adj_list = [];
}

BucketSort.headNode = function headNode(head_idx) {
  // head_node : { head: number, free: number, list: [] }
  this.adj_list[head_idx] = { head: null, free: 0 };
  this.adj_list[head_idx].list = [{ next: null }]
}

BucketSort.bucketSort = async function bucketSort () {
  await this.setup();

  Array.apply(null, new Array(10))
    .forEach(function (i, idx) { return this.headNode(idx) }.bind(this));
  /* alternatively,
   * [...Array(10).keys()].map(function (i) { return null }) */

  for (let i = 0; i < this.input_arr.length; i++) {
    const { [Math.floor(this.input_arr[i] * 10)]: adjLNode } = this.adj_list;

    // First parameter is the element at index i in input_arr ( key for list ). 
    // Second parameter is the head of bucket.
    // LinkedList.prepend(buck_head_arr, this.input_arr[i], Math.floor(this.input_arr[i] * 10));      
    this.prepend(adjLNode, this.input_arr[i]);
  }

  for (let i = 0; i < 10; i++) {
    let { [i]: adjLNode } = this.adj_list;

    if (this.adj_list[i].head !== null) {
      this.insertSort(adjLNode);
    }
  }

  console.log(util.inspect(this.adj_list, { showHidden: false, depth: null }));

  for (let i = 0; i < 10; i++) {
    if (this.adj_list[i].head !== null) {
      let { [i]: adjLNode } = this.adj_list;
      this.print(adjLNode);
    }
  }
}  

BucketSort.bucketSort();
