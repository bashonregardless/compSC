'use strict'

module.exports = {
  isInt: function isInt(val) {
	// check if a variable is an integer
	/* pre-ECMAScript-6 solution (which is also sufficiently robust to
	 * return false even if a non-numeric value such as a string or 
	 * null is passed to the function) would be the following use of 
	 * the bitwise XOR operator:
			function isInteger(x) { return (x ^ 0) === x; }
			-or-
			function isInteger(x) { return (typeof x === 'number') && (x % 1 === 0); }
			*/
	/* ECMAscript 6 which introduces a new Number.isInteger() 
	 * Note: ("3" ^ 0) === "3" -> false
				 ("3" ^ 0) === 3 -> true */
	if ((val ^ 0) === parseInt(val, 10)) {
	  return 1;
	} else {
	  return 0;
	}
  }
}
