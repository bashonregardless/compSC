const helper = require('../../helpers/isInt');
const input_interface = require('../input_interface');
const InteractiveRequestProcedures = Object.create(input_interface);

InteractiveRequestProcedures.createInputNode = async function createInputNode() {
  const posPat = ["s", "e"]; 
  while (true) {
	var resp = await this.prompt("Position? start(s), end(e), position(integer) > ");
	if(posPat.some((pat) => resp === pat) || helper.isInt(resp)) {
	  return { 
		position: resp,
		value: await this.prompt("Value? > "),
	  };
	}
	else {
	  console.log("Invalid Response. Try again");
	}
  }
}

/* FIXME handle invalid key value to be removes, with appropriate output messages */
InteractiveRequestProcedures.inputRemoveKey = async function inputRemoveKey() {
  return await this.prompt("Remove Key? > ");
}

/* handleContinue returns 1 if user wishes to continue to operate on list
 * 0 if not. */
InteractiveRequestProcedures.handleContinue = async function handleContinue() {
  const yesPat = ["yes", "y"];
  const noPat = ["no", "n"];
  const respFormat = (resp) => resp.toLowerCase();
  while (true) {
	var resp = respFormat(await this.prompt("Continue? Yes / No > "));
	if(noPat.some((pat) => resp === pat)) {
	  return 0;
	}
	else if (yesPat.some((pat) => resp === pat))
	  return 1;
	else {
	  console.log("Invalid Response. Try again");
	}
  }
}

InteractiveRequestProcedures.requestProcedure = async function requestProcedure() {
  const procedure = await this.prompt("Procedure? insert(i), delete(d) > ");

  if (procedure === "i") {
	return {
	  procedure,
	  node: await this.createInputNode(),
	}
  } else if (procedure === "d") {
	return {
	  procedure,
	  node: await this.inputRemoveKey(),
	}
  } 
  /* If the 'return' keyword is not used, this block of 
   * code will not supply a return value from the function. */ 
  else {
	console.log(`Invalid input '${procedure}': Try again`);
	return await this.requestProcedure();
  }
}

module.exports = InteractiveRequestProcedures;
