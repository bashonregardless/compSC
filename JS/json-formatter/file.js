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

function errExit(msg, lineNumber) {
  const err = new Error();
  err.message = `\n\n**** ERROR *****\n${msg} ${lineNumber}\n\n**********\n\n`;
  throw err;
}

function formatJson () {
  const jsonString = process.argv[2];

  function closeCaseBracket(token, prevToken, collectionType) {
	if (bracketStack.pop() === collectionType) {
	  (prevToken === collectionType) ?
		process.stdout.write(`${token}`)
		:
		process.stdout.write(`\n${" ".repeat(indent)}${token}`);
	}
	else
	  errExit(`Bracket mismatch at line\nLast matched line :`, lineNumber)
  }

  function openCaseBracket(token, prevToken, collectionType) {
	//(prevToken === collectionType) ?
	(prevToken === '{' || prevToken === '[') ?
	  process.stdout.write(`\n${" ".repeat(indent)}${token}`)
	  :
	  process.stdout.write(`${token}`);
  }


  let prevToken = "",
	stringLiteral = false,

	indent = 0,
	lineNumber = 0,

	bracketStack = [];

  jsonString.split('').forEach(function parseStr (token) {
	if (stringLiteral) {
	  process.stdout.write(token);
	  if ( prevToken !== '\\' && token === '"' )
		stringLiteral = false
	} else {
	  switch (token) {
		case '[':
		  bracketStack.push(token);
		  openCaseBracket(token, prevToken);
		  if (prevToken === ']')
			lineNumber += 1;
		  indent += 2;
		  break;

		case '{':
		  bracketStack.push(token);
		  indent += 2;
		  openCaseBracket(token, prevToken);
		  if (prevToken === '}')
			lineNumber += 1;
		  break;

		case '}':
		  indent-=2;
		  closeCaseBracket(token, prevToken, '{');
		  if (prevToken !== '{')
			lineNumber += 1;
		  break;

		case ']':
		  indent-=2;
		  closeCaseBracket(token, prevToken, '[')
		  if (prevToken !== ']')
			lineNumber += 1;
		  break;

		case ',':
		  lineNumber += 1;
		  process.stdout.write(`${token}\n${" ".repeat(indent)}`);
		  break;

		case ':':
		  process.stdout.write(`${token} `);
		  break;

		case '"':
		  if (prevToken === ':')
			stringLiteral = true;

		default:
		  openCaseBracket(token, prevToken);
	  }
	}
	prevToken = token;
  }.bind(this));

  process.stdout.write("\n");

  if (indent > 0) {
	errExit(`Last matched line :`, lineNumber);
  }
  process.exit();
}

formatJson();
