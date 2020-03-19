window.onload = function () {
  let insert_input = document.querySelector('input[name=insert]');
  let position_input = document.querySelector('input[name=position]');
  let delete_input = document.querySelector('input[name=delete]');

  const state = {
	key: [],
	next: []
  }

  function debounce (task, duration) {
	return  function(...args) {
	  let lastTime = Date.now();
	  if (lastTime && Date.now() - this.lastTime < duration) {
		clearTimeout(this.idleTimer);
	  }
	  this.idleTimer = setTimeout(task.bind(this, args), duration);
	}
  }

  insert_input.addEventListener('keyup', function (e) {
	let val = e.target.value;
	let focus = debounce(position_input.focus, 1600);
	focus.apply(position_input);
  });

  delete_input.addEventListener('keyup', function (e) {
	let val = e.target.value;
	let del = debounce(OPERATION_SELECTOR.selector, 2000);
	del(LIST, { value: val, operation: 'd' }).apply(this);
  });

  position_input.addEventListener('keyup', function (e) {
	if (e.key === "Enter") {
	  let val = e.target.value;
	  let insert = debounce(OPERATION_SELECTOR, 2000);
	  insert({ value: insert_input.value, procedure: 'i', position: val });
	  const elNode = React.createElement(
		'div',
		{className: 'elNode'},
		null
	  )
	  const listContainer = document.querySelector('#listContainer');
	  ReactDOM.render(elNode, listContainer);
	}
  });
}
