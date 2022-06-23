import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Todo from "./routes/Todo";
import Calender from "./routes/Calender";
import Counter from "./routes/Counter";
import "./styles/App.css";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/*" element={<Home />} />
				<Route path="/calender" element={<Calender />} />
				<Route path="/Todo" element={<Todo />} />
				<Route path="/Counter" element={<Counter />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
