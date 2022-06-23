import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Calender = () => {
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
	useEffect(() => {
		console.log("년도", year, month);
		console.log("마지막 날, 첫, 마지막 요일");
		getLastDate(year, month);
		getFirstDay(year, month);
		getLastDay(year, month);
		paintCalender(year, month);
	}, []);
	return (
		<div>
			<h1>
				<Link to="/">Go Home</Link>
			</h1>
			<h1>Calender</h1>
			<div>
				<div className="nav">
					<div>{year}</div>
					<div>{month}</div>
					<button onClick={onClickPrev}>{`<`}</button>
					<button onClick={onClickNext}>{`>`}</button>
				</div>
				<div className="mainCalender">
					<div className="days">
						{days.map((d, index) => (
							<span key={index}> {d} |</span>
						))}
					</div>
					<div className="dates">
						{paintCalender(year, month).map((d) => (
							<span key={d.id}>{d.date} </span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Calender;
