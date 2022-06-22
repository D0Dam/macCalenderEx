import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div>
			<h1>HomePage</h1>
			<h3>
				<Link to="/calender">calender</Link>
			</h3>
			<h3>
				<Link to="/todo">todo</Link>
			</h3>
		</div>
	);
};

export default Home;
