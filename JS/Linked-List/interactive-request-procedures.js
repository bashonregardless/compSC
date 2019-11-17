const input_interface = require('../input_interface');
const InteractiveRequestProcedures = Object.create(input_interface);

InteractiveRequestProcedures.createInputNode = async function createInputNode() {
  return {
	position: await this.prompt("Position? start(s), end(e), position(integer) > "),
	value: await this.prompt("Value? > "),
  };
}

InteractiveRequestProcedures.inputRemoveKey = async function inputRemoveKey() {
  return await this.prompt("Remove Key? > ");
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
	console.log(`Invalid input '${procedure}': Please select again\n`);
	return await this.requestProcedure();
  }
}

module.exports = InteractiveRequestProcedures;
