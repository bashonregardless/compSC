'use strict';

/* utility - For iterables in general to get counter in for..of loop */
function * counteredIterables(iterable) {
  let i = 0;

  for (const iter of iterable) {
	yield [i, iter];
	i++;
  }
}

const stdIn = require('./input'),
  Calc = Object.create(stdIn);

/* constructor function to generate token object */
function Token(value) {
  this.token_value = value;
}

Calc.init = function setup() {
  this.expr = null;
  this.queue_infix;
  this.queue_postfix = [];
  this.input();

  /* operator identifiers (opcodes) */
  this.op = [
	'ADD',
	'SUBTRACT',
	'MULTIPLY',
	'DIVIDE',
	'NEGATE'
  ];

  /* number of operands for each operator type */
  this.op_operands = [2, 2, 2, 2, 1];

  /* order-of-operations (precedence) (0 = evaluated last) */
  this.op_precendences = [0, 0, 1, 1, 2];
}

Calc.input = async function input() {
  const user_input = await stdIn.requestInput("Insert expresstion (infix): ");
  this.queue_infix = user_input.split(" ").map(function initializeTokens(token_val) {
	return new Token(token_val);
  });
  this.exprToInfix(user_input);
  this.infixToPostfix();
}

Calc.exprToInfix = function expr_to_infix(expression) {
  let type = 'OPERATOR';
  for (const [i, ch] of counteredIterables(expression)) {
	//for (let i = 0; queue_infix[i]; i++) {
	if (ch) {
	  if (queue_infix[i].token_value.length === 1) {
		switch(queue_infix[i].token_value) {
		  case '+':
			queue_infix[i].token_type = 'OPERAND';
			break;
		  case '-':
			/* check previous token to distinguish between
			 negate (unary) and subtract (binary) */
			if (type === 'OPERATOR') {
			  queue_infix[i].op_code = 'NEGATE';
			} else if (type === 'LPARENS') {
			  queue_infix[i].op_code = 'NEGATE';
			} else {
			  queue_infix[i].op_code = 'SUBTRACT';
			}
			type = 'OPERATOR';
			break;
		  case '*':
			type = 'OPERATOR';
			queue_infix[i].op_code = 'MULTIPLY';
			break;
		  case '/':
			type = 'OPERATOR';
			queue_infix[i].op_code = 'DIVIDE';
			break;
		  case '(':
			type = 'LPARENS';
			break;
		  case ')':
			type = 'RPARENS';
			break;
		  default:
			type = 'OPERAND';
		}
	  } else {
		type = 'OPERAND';
	  }
	  queue_infix[i].token_type = type;
	}
  }
}

Calc.infixToPostfix = function infix_to_postfix() {
  this.queue_infix.forEach(function parse_infix(token) {
	if (token.token_type === 'OPERATOR') {
	} else {
	  this.queue_postfix.push(token.token_value);
	}
  }.bind(this));

  console.log(this.queue_infix);
  console.log(this.queue_postfix);
}

Calc.userQueue = function userQueue() {
}

Calc.init();
