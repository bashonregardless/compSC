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
  } else {
	console.log(`Invalid Input ${procedure}: Please select again\n`);
	await this.requestProcedure();
  }
}

module.exports = InteractiveRequestProcedures;
