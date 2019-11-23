module.exports = async function operationSelector (list) {
  while(true) {
	try {
	  let input = await list.requestProcedure();
	  let { position, value } = input.node;

	  if (input.procedure === "i") {
		switch (position) {
		  case '1':
		  case 's':
			list.prepend(value);
			break;

		  case 'e':
		  case `${list.listLength + 1}`:
			list.append(value);
			break;

		  default:
			/* Check to see if position is an integer */
			if ( !((position ^ 0) === parseInt(position, 10) )) {
			  console.log(`Invalid input: Position ${position} is not an integer`);
			  continue;
			}

			/* Check to see if position exceeds list length */
			if (position - 1 > list.listLength) {
			  console.log(`Invalid input: Position ${position} exceeds list length ${list.listLength}\nTry Again\n`);
			  continue;
			}

			list.insertAt(value, position);
		}
	  }

	  if (input.procedure === 'd') {
		if (list.listLength === 0) {
		  console.log(`Cannot delete from an empty list\nTry again`);
		  continue;
		}
		list.freeNode(input.node);
	  }

	  const resp = await list.prompt("Continue? y / n > ");
	  if (resp === "n")
		break;
	  console.log("\n");
	}
	catch (err) {
	  console.log(err);
	}
  }

  list.printList(list.lhead);
  process.exit(0);
}
