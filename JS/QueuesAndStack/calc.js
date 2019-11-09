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
function Token(type, value) {
  this.token_value = value;
  this.token_type = type;
}

Calc.init = function setup() {
  this.expr = null;
  this.queue_infix = [];
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

  /* evaluation direction (associativity) for each precedence level */
  this.op_associativity = ['LEFT', 'LEFT', 'RIGHT'];
}

Calc.input = async function input() {
  const user_input = await stdIn.requestInput("Insert expresstion (infix): ");
  this.exprToInfix(user_input);
  this.infixToPostfix();
  this.evaluatePostfix();
}

Calc.exprToInfix = function expr_to_infix(expression) {
  let type = 'OPERATOR';

  for (const [i, ch] of counteredIterables(expression)) {
	if (ch !== " ") {
	  /* contains value of token */
	  const token_value = {
		operand: null, /* numeric value of operand */
		op_code: null, /* opcode for operators */
	  };

	  if (ch.length === 1) { /* operators are all 1 character */
		switch(ch) {
		  case '+':
			type = 'OPERATOR';
			token_value.op_code = 'ADD';
			break;
		  case '-':
			/* check previous token to distinguish between
			 negate (unary) and subtract (binary) */
			if (type === 'OPERATOR') {
			  token_value.op_code = 'NEGATE';
			} else if (type === 'LPARENS') {
			  token_value.op_code = 'NEGATE';
			} else {
			  token_value.op_code = 'SUBTRACT';
			}
			type = 'OPERATOR';
			break;
		  case '*':
			type = 'OPERATOR';
			token_value.op_code = 'MULTIPLY';
			break;
		  case '/':
			type = 'OPERATOR';
			token_value.op_code = 'DIVIDE';
			break;
		  case '(':
			type = 'LPARENS';
			break;
		  case ')':
			type = 'RPARENS';
			break;
		  default:
			/* not an operator */
			type = 'OPERAND';
			token_value.operand = +ch;
		}
	  } else {
		type = 'OPERAND';
		token_value.operand = +ch;
	  }
	  /* add token with parsed type and value to end of queue */
	  this.queue_infix.push(new Token(type, token_value));
	}
  }
}

/* TO DO: Error Handling 
 * The program would crash on many invalid inputs */
Calc.infixToPostfix = function infix_to_postfix() {
  const op_stack = [];
  const op_idx = this.op.indexOf;
  this.queue_infix.forEach(function parse_infix(token) {
	const type = token.token_type;
	switch (type) {
	  case 'LPARENS':
		op_stack.push(token.token_type);
		break;
	  case 'RPARENS':
		while (op_stack[op_stack.length - 1] !== 'LPARENS') {
		  let popped_tok = op_stack.pop();
		  if (popped_tok !== 'LPARENS') {
			this.queue_postfix.push(popped_tok);
		  }
		};
		op_stack.pop();
		break;
	  case 'OPERATOR':
		while (this.op_precendences[this.op.indexOf(op_stack[op_stack.length - 1])] >=
		  this.op_precendences[this.op.indexOf(token.token_value.op_code)] || 
		  (this.op_precendences[this.op.indexOf(token.token_value.op_code)] 
			=== this.op_precendences[op_stack[op_stack.length]] && 
			this.op_precendences[this.op.indexOf(token.token_value.op_code)])) {
		  this.queue_postfix.push(op_stack.pop());
		}
		op_stack.push(token);
		break;
	  default:
		this.queue_postfix.push(token);
		break;
	}
  }.bind(this));

  while (op_stack.length > 0) {
	this.queue_postfix.push(op_stack.pop());
  }
}

Calc.evaluatePostfix = function evaluate_postfix() {
  const postfix_stack = [];
  let ans;
  this.queue_postfix.forEach(function ev_postfix(token) {
	const type = token.token_type;
	if (token.token_type === 'OPERAND') {
	  postfix_stack.push(token.token_value.operand)
	} else {
	  const op_code = token.token_value.op_code;
	  let interim_result;
	  switch (op_code) {
		case 'ADD':
		  interim_result = postfix_stack.pop() + postfix_stack.pop();
		  break;
		case 'SUBTRACT':
		  interim_result = -(postfix_stack.pop() - postfix_stack.pop());
		  break;
		case 'MULTIPLY':
		  interim_result = postfix_stack.pop() * postfix_stack.pop();
		  break;
		case 'DIVIDE':
		  interim_result = (1 / postfix_stack.pop()) / (1 / postfix_stack.pop());
		  break;
		case 'NEGATE':
		  interim_result = -postfix_stack.pop();
		  break;
	  }
	  postfix_stack.push(interim_result);
	}
  }.bind(this));

  if (postfix_stack.length > 0) {
	ans = postfix_stack.pop();
	console.log("ans: ", ans);
  }
}

Calc.userQueue = function userQueue() {
}

Calc.init();
