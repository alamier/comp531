
const Reducer = (state =  {
	nextId: 2,
	todoItems: [
	    {id: 0, text: "This is an item", done: false},
	    {id: 1, text: "Another item", done: false}
	]
}, action) => {
	switch(action.type) {
		case 'ADD_TODO':
			// append a new todoItem to the todoItems
			let todoItems = [...state.todoItems,{
				id:state.nextId, text:action.text, done:false
			}]
			return {nextId:state.nextId + 1, todoItems: todoItems}
		case 'REMOVE_TODO':
			// remove the todoItem with id == action.id
			todoItems = state.todoItems.filter(({id}) => id != action.id)
			return {nextId:state.nextId, todoItems: todoItems}
		case 'TOGGLE_TODO':
			// replace the designated todoItem with a new todoItem, whose 
			// done value equals to !done
			todoItems = state.todoItems.map((x) => {
				if(x.id === action.id){
					return {...x, done: !x.done}
				}
				return x;
			})
			return {nextId:state.nextId, todoItems: todoItems}
		default: 
			return state
	}
}

export default Reducer