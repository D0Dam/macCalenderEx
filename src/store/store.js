import { configureStore, createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
	name: "todos",
	initialState: [],
	reducers: {
		addTodo: (state, action) => {
			state.push({ text: action.payload, id: Date.now() });
		},
		removeTodo: (state, action) =>
			state.filter((todo) => todo.id !== action.payload),
	},
});

const counterSlice = createSlice({
	name: "counter",
	initialState: 0,
	reducers: {
		plusOne: (state) => state + 1,
		minusOne: (state) => state - 1,
	},
});

const reducer = {
	todos: todoSlice.reducer,
	counter: counterSlice.reducer,
};
const store = configureStore({
	reducer,
});
export default store;
export const { addTodo, removeTodo } = todoSlice.actions;
export const { plusOne, minusOne } = counterSlice.actions;
