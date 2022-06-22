import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { plusOne, minusOne } from "../store/store";
const Counter = ({ count, dispatchPlusOne, dispatchMinusOne }) => {
	return (
		<div>
			<h1>
				<Link to="/">Go Home</Link>
			</h1>
			<h1>Counter</h1>
			<div>
				<button
					onClick={() => {
						dispatchMinusOne();
					}}
				>
					-1
				</button>
				<h3>{count}</h3>
				<button
					onClick={() => {
						dispatchPlusOne();
					}}
				>
					+1
				</button>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return { count: state.counter };
};

const mapDispatchToProps = (dispatch) => {
	return {
		dispatchPlusOne: () => dispatch(plusOne()),
		dispatchMinusOne: () => dispatch(minusOne()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
