const SkipList = Object.create(require('../Linked-List/Doubly/doubly-arr-idx-representation'));

SkipList.getCoinToss = function get_coin_toss () {
  return Math.floor(Math.random() * Math.floor(2));
}

SkipList.init = function init() {
  this.setup();
}

SkipList.init();

