import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodo, removeTodo } from "../store/store";
const Todo = ({ todos, dispatchAddTodo, dispatchRemoveTodo }) => {
	const [text, setText] = useState("");
	const onChange = (e) => {
		setText(e.target.value);
	};
	const onSubmit = (e) => {
		e.preventDefault();
		dispatchAddTodo(text);
		setText("");
	};
	const onClickDeleteTodo = (id) => {
		dispatchRemoveTodo(id);
	};
	return (
		<div>
			<h1>TODO</h1>
			<form onSubmit={onSubmit}>
				<input
					value={text}
					type="text"
					placeholder="Add your todo"
					onChange={onChange}
				/>
				<button>ADD!</button>
			</form>
			<ul>
				{todos.map((todo, index) => (
					<li key={index}>
						{todo.text}
						<button
							onClick={() => {
								onClickDeleteTodo(todo.id);
							}}
						>
							DELETE
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

const mapStateToProps = (state) => {
	return { todos: state.todos };
};
const mapDispatchToProps = (dispatch) => {
	return {
		dispatchAddTodo: (text) => dispatch(addTodo(text)),
		dispatchRemoveTodo: (id) => dispatch(removeTodo(id)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Todo);
