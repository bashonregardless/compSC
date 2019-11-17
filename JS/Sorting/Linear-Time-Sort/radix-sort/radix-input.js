'use strict'

const input_interface = require('../../../input_interface');
const InteractiveRequestProcedure = Object.create(input_interface);

InteractiveRequestProcedure.intValidation = function intValidation(val) {
  if ( (val ^ 0) === parseInt(val, 10) ) {
	return parseInt(val, 10);
  } else {
	console.log("Response is not an integer!");
	return false;
  }
}

InteractiveRequestProcedure.createInputArr = async function createInputArr() {
  let input_arr = [];
  let digits;
  while (true) {
	// Singleton behaviour
	if (!digits) {
	  digits = this.intValidation(await input_interface.prompt("Digits? > "));
	} else {
	  const resp = await input_interface.prompt("Element? input(integer), done(n) > ");
	  if (resp === "n") {
		break;
	  } else {
		/* Check if a variable is an integer:
		 * pre-ECMAScript-6 solution (which is also sufficiently robust to
		 * return false even if a non-numeric value such as a string or 
		 * null is passed to the function) would be the following use of 
		 * the bitwise XOR operator:
			function isInteger(x) { return (x ^ 0) === x; }
			-or-
			function isInteger(x) { return (typeof x === 'number') && (x % 1 === 0); }
			*/

		/* ECMAscript 6 introduces, Number.isInteger() to check if a variable is an integer */

		/* Note: ("3" ^ 0) === "3" -> false, eg: Boolean( (resp ^ 0) === parseInt(resp, 10) ).
				   ("3" ^ 0) === 3 -> true,

				   Operator precedence: '===' has higher precedence than '^' or any other Bitwise operator.
				   */
		if (this.intValidation(resp)) {
		  input_arr.push(+resp);
		}
	  }
	}
  }
  return { digits, input_arr };
}

module.exports = InteractiveRequestProcedure;

