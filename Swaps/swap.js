/* Taken from https://medium.com/@frontman/how-swap-two-values-without-temporary-variables-using-javascript-8bb28f96b5f6 */

module.exports = {
  withMathOp: function withMathOp(a, b) {
    a = a + b;
    b = a - b;
    a = a - b;
    return [a, b];
  },
  
  withXOR: function withXOR(a, b) {
    a = a ^ b;
    b = a ^ b;
    a = a ^ b;
    return [a, b];
  },

  withDestructuring: function withDestructuring(a, b) {
    [a, b] = [b, a];
    return [a, b];
  },

  /* Following are single line swap */

  /* This solution uses no temporary variables, no arrays, only one addition, and it’s fast. In fact, it is sometimes faster than a temporary variable on several platforms. It works for all numbers, never overflows, and handles edge-cases such as Infinity and NaN. */
}
