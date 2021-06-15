;const Chain = function(fn) {
  this.fn = fn;
  this.successor = null;
};

Chain.prototype.setNextSuccessor = function(successor) {
  return this.successor = successor;
}

Chain.prototype.passRequest = function() {
  const ret = this.fn.apply(this, arguments)
  if (ret === 'nextSuccessor') {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments);
  }
  return ret;
};

const order500 = function (orderType) {
  if (orderType === 500) {
      console.log('已预付500定金，享有100优惠券')
  } else {
    return 'nextSuccessor'
  }
} 

const order200 = function (orderType) {
  if (orderType === 200) {
    console.log('已预付200定金，享有50元优惠券')
  } else {
    return 'nextSuccessor'
  }
} 

const chainOrder500 = new Chain(order500)

const chainOrder200 = new Chain(order200)

chainOrder500.setNextSuccessor(chainOrder200)

chainOrder500.passRequest(200)