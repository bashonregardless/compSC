String.prototype.repeat = function(length) {
  return Array(length + 1).join(this);
};

const List = require('../Linked-List/Doubly/doubly-arr-idx-representation.js');

const Formatter = Object.create(List);

const stack = [];

Formatter.parsejson = function parse_json () {
  this.setup();

  //const jsonString = `{"data":{"id":71,"name":"ededs","createdOn":1574760064172,"createdBy":"Care Innovaccer","updatedOn":1574760477146,"updatedBy":"Care Innovaccer","deliveryType":"INSTANT","status":"SENT","state":2,"introductoryMessage":[],"numberOfRecipients":1,"sender":{"id":1,"CreatedOn":"2019-08-10T00:00:00Z","UpdatedOn":"2019-08-10T00:00:00Z","createdBy":"user_1","updatedBy":"user_1","isActive":true,"senderId":"user_1","senderFirstName":"Innovaccer","senderLastName":"Healthcare","senderEmail":"care@innovaccer.com","status":"VERIFIED","addedBy":"user_1","addedByFirstName":"Innovaccer","addedByLastName":"Healthcare","addedByEmail":"care@innovaccer.com","customer":"740046d2-b005-4bb9-a086-276a25b0c25a"},"retries":0,"retryDuration":null,"regenerateCampaign":null,"senderPhoneNumber":1,"defaultLocale":"en-us","outreachType":"message","channel":{"id":3,"name":"sms","icon":"message","displayName":"Message","customer":"740046d2-b005-4bb9-a086-276a25b0c25a"},"template":[{"id":32,"name":"template_1574760156705","message":"Hello {{first_name}} ,\n\nWe are happy to announce that you have been selected for a free checkup.\n\nThanks,\n{{last_name}}","language":"en-us","channel":"sms","attachment":null,"customer":"740046d2-b005-4bb9-a086-276a25b0c25a","createdOn":1574760156709,"createdBy":"user_1","isSecure":true,"extraKwargs":{}}],"segmentId":"eb54ae88-a7a1-4128-bbfd-1cad3a4bd0bc","customer":{"customerId":"740046d2-b005-4bb9-a086-276a25b0c25a","CreatedOn":"2019-10-10T00:00:00Z","UpdatedOn":"2019-10-10T00:00:00Z","createdBy":"rohit","updatedBy":"rohit","isActive":true,"customerName":"inhouse"},"scheduledOn":1574760474753,"isSecure":true,"locales":[{"displayName":"English","name":"english","code":"en-us","isDefault":true,"isActive":true},{"displayName":"Spanish","name":"spanish","code":"es-cr","isDefault":false}]}}`;
  const jsonString = `{"data":{"name":"\\nharsh"}}`

  let top = "";
  let indent = 0;
  let prevToken = "";
  let stringLiteral = false;

  jsonString.split('').forEach(function parseStr (token) {
	switch (token) {
	  case '[':
	  case '{':
		this.append(token); 
		indent = indent + 2;
		process.stdout.write(`${token}\n${" ".repeat(indent)}`);
		break;

	  case ']':
	  case '}':
		{
		  if ( (token === '}' && this.key[this.last] === '{') || (token === ']' && this.key[this.last] === '[') ) {
			this.freeAtIdx(this.last);
			indent = indent - 2;
			process.stdout.write(`\n${" ".repeat(indent)}${token}`);
		  } else {
			throw new Error("Invalid JSON!");
		  }
		  break;
		}

	  case ',':
		process.stdout.write(`${token}\n${" ".repeat(indent)}`);
		break;

	  case ':':
		process.stdout.write(`${token} `);
		break;

	  default:
		process.stdout.write(`${token}`);
		break
	}
  }.bind(this));

  process.stdout.write("\n");
  process.exit();
}

Formatter.parsejson();
