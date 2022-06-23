import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const MainCalender = styled.div`
	display: flex;
	flex-direction: column;
`;

const CalenderNav = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: 2.4rem;
`;
const Days = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	width: 100%;
	height: 2.4rem;
`;
const Day = styled.div`
	width: 2.4rem;
	height: 2.4rem;
	font-size: 1.6rem;
	text-align: center;
`;
const Dates = styled.div`
	display: grid;
	justify-content: space-between;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
`;

const DateItem = styled.div`
	font-size: 1.2rem;
	width: 2.4rem;
	height: 2.4rem;
	text-align: center;
	${(props) => {
		if (
			props.id ===
			"D" +
				new Date().getFullYear() +
				(new Date().getMonth() + 1) +
				new Date().getDate()
		) {
			console.log(
				"st",
				props.key,
				"D" +
					new Date().getFullYear() +
					(new Date().getMonth() + 1) +
					new Date().getDate()
			);
			return css`
				background: red;
			`;
		}
	}}
`;

const Calender = ({ background }) => {
	const today = new Date();
	const days = ["일", "월", "화", "수", "목", "금", "토"];
	const [year, setYear] = useState(today.getFullYear());
	const [month, setMonth] = useState(today.getMonth() + 1);
	//입력한 년, 월에 해당하는 마지막 일 반환(29, 30, 31 등)
	const getLastDate = (y, m) => {
		return new Date(y, m, 0).getDate();
	};
	//입력한 년, 월에 해당하는 첫째 요일 반환
	const getFirstDay = (y, m) => {
		return new Date(y, m - 1, 1).getDay();
	};
	//입력한 년, 월에 해당하는 마지막 요일 반환
	const getLastDay = (y, m) => {
		return new Date(y, m, 0).getDay();
	};
	//캘린더 채우기
	const paintCalender = (y, m) => {
		let dates = [];
		for (let i = 0; i < getFirstDay(y, m); i++) {
			if (m === 1) {
				dates.unshift({
					date: getLastDate(y, 12) - i,
					id: "D" + y + 12 + (getLastDate(y, 12) - i),
				});
			} else {
				dates.unshift({
					date: getLastDate(y, m - 1) - i,
					id: "D" + y + (m - 1) + (getLastDate(y, m - 1) - i),
				});
			}
		}
		for (let i = 1; i <= getLastDate(y, m); i++) {
			dates.push({ date: i, id: "D" + y + m + i });
		}
		for (let i = 1; i < 7 - getLastDay(y, m); i++) {
			if (m === 12) {
				dates.push({ date: i, id: "D" + y + 1 + i });
			} else {
				dates.push({ date: i, id: "D" + y + (m + 1) + i });
			}
		}
		console.log(new Date(y, m, 0).getDate());
		console.log(new Date(y, m - 1, 1).getDay());
		console.log(new Date(y, m, 0).getDay());
		console.log(dates);
		return dates;
	};
	const onClickPrev = () => {
		if (month === 1) {
			setYear(() => year - 1);
			setMonth(12);
		} else {
			setMonth(() => month - 1);
		}
	};
	const onClickNext = () => {
		if (month === 12) {
			setYear(() => year + 1);
			setMonth(1);
		} else {
			setMonth(() => month + 1);
		}
	};
	const onClickToday = () => {
		setYear(today.getFullYear());
		setMonth(today.getMonth() + 1);
	};
	useEffect(() => {
		console.log("년도", year, month);
		console.log("마지막 날, 첫, 마지막 요일");
		getLastDate(year, month);
		getFirstDay(year, month);
		getLastDay(year, month);
		paintCalender(year, month);
	}, [year, month]);
	return (
		<div>
			<h1>
				<Link to="/">Go Home</Link>
			</h1>
			<h1>Calender</h1>
			<div>
				<CalenderNav>
					<div>
						{year}년 {month}월
					</div>
					<div>
						<button onClick={onClickPrev}>{`<`}</button>
						<button onClick={onClickToday}>오늘</button>
						<button onClick={onClickNext}>{`>`}</button>
					</div>
				</CalenderNav>
				<MainCalender className="mainCalender">
					<Days className="days">
						{days.map((d, index) => (
							<Day key={index}>{d}</Day>
						))}
					</Days>
					<Dates className="dates">
						{paintCalender(year, month).map((d) => (
							<DateItem key={d.id} id={d.id}>
								{d.date}
							</DateItem>
						))}
					</Dates>
				</MainCalender>
			</div>
		</div>
	);
};

export default Calender;
