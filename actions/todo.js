import { ADD_TODO, REMOVE_TODO } from './index';

export function addTodo(text) {
	return {
		type: ADD_TODO,
		text
	};
}

export function removeTodo(todo) {
	return {
		type: REMOVE_TODO,
		todo
	};
}
