const SkipList = Object.create(require('../Linked-List/Circular/circular-list-array-idx-representation'));
const dList = require('../Linked-List/Doubly/list-as-routine');

SkipList.getCoinToss = function get_coin_toss () {
  return Math.floor(Math.random() * Math.floor(2));
}

SkipList.init = function init() {
  this.setup(dList);
}

SkipList.init();

