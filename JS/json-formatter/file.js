/* JSON Rules:
 * 1. An Object is a collection of name/value pairs
 * 2. It starts with the left curly brackets ‘{‘ and ends with right curly brackets ‘}’
 * 3. Each name in the Object is a string in double quotation, and it’s followed by colon ‘:’ then the value associated with that name.
 * 4. name/value pairs are separated by comma ‘,’
 *
 *
 * JSON values:
 * 1. a string in double quotes
 * 2. a number
 * 3. boolean; true or false
 * 4. null
 * 5. an object
 * 6. an array
 */

String.prototype.repeat = function(length) {
  return Array(length + 1).join(this);
};

function formatJson () {
  //const jsonString = `{"data":{"name":"\\nharsh"}}`
  const jsonString = process.argv[2];

  // token tracking info
  let prevToken = "";
  let stringLiteral = false;
  
  // indent % 2 gives line number
  let indent = 0;
  let lineNumber = 0;

  jsonString.split('').forEach(function parseStr (token) {
	if (stringLiteral) {
	  process.stdout.write(token);
	  if ( prevToken !== '\\' && token === '"' )
		stringLiteral = false
	} else {
	  switch (token) {
		case '[':
		case '{':
		case ']':
		case '}':
		  try {
			if (token === '[' || token === '{') {
			  lineNumber += 1;
			  if (prevToken === '{' || prevToken === '[') {
				// If indent becomes negative, throw parantheses balance error: Invalid JSON
				process.stdout.write(`\n${" ".repeat(indent)}${token}`);
				indent = indent + 2;
			  }
			  else {
				indent = indent + 2;
				process.stdout.write(`${token}`);
			  }
			  break;
			}

			if (token === ']' || token === '}') {
			  lineNumber += 1;
			  indent = indent - 2;

			  if (prevToken === '{' || prevToken === '[') {
				process.stdout.write(`${token}`);
			  } else
				process.stdout.write(`\n${" ".repeat(indent)}${token}`);
			  break;
			}
		  }
		  catch (err) {
			console.log(`\n\n**** ERROR *****\nLast matched line : ${lineNumber}\nLook for error till last matching collection type\n\n**********\n\n`);
			throw new Error('Check JSON');
		  }

		case ',':
		  if (!(prevToken === '}' || prevToken === ']')) {
			lineNumber += 1;
		  }

		  process.stdout.write(`${token}\n${" ".repeat(indent)}`);
		  break;

		case ':':
		  process.stdout.write(`${token} `);
		  break;

		case '"':
		  if ( !stringLiteral && prevToken === ':')
			stringLiteral = true;

		default:
		  if (prevToken === '{' || prevToken === '[')
			process.stdout.write(`\n${" ".repeat(indent)}${token}`);
		  else
			process.stdout.write(`${token}`);
		  break
	  }
	}
	prevToken = token;
  }.bind(this));

  process.stdout.write("\n");

  if (indent > 0) {
	// print in reverrse order till last collection type ( '{' || '[') token
	console.log(`\n\n**** ERROR *****\nLast matched line : ${lineNumber}\nLook for error till last matching collection type\n\n**********\n\n`);
	throw new Error('Check JSON');
  }
  process.exit();
}

formatJson();
