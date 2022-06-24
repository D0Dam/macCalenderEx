import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const CalenderContainer = styled.div``;
const MainCalender = styled.div`
	display: flex;
	flex-direction: column;
	font-family: "SUIT-EL";
`;

const YearAndMonth = styled.div`
	font-family: "SUIT-EL";
	margin-bottom: 0.4rem;
`;
const Buttons = styled.div`
	display: flex;
	align-items: center;
`;
const Button = styled.button`
	font-family: "SUIT-EL";
	border: white;
	border-radius: 4px;
	margin: 1.5px;
	background-color: white;
	box-shadow: 0px 0px 2.4px grey;
	height: 1.2rem;
	font-size: 0.8rem;
`;
const CalenderNav = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: 2.4rem;
`;
const Days = styled.div`
	display: grid;
	grid-template-columns: repeat(7, minmax(112px, auto));
	width: 100%;
	height: 100%;
`;
const Day = styled.div`
	height: 100%;
	font-size: 1.2rem;
	text-align: right;
`;
const Dates = styled.div`
	display: grid;
	justify-content: space-between;
	width: 100%;
	grid-template-columns: repeat(7, 1fr);
	grid-template-rows: repeat(6, 1fr);
	border-left: 0.05rem solid #dddddd;
	border-top: 0.1rem solid #dfdfde;
`;

const DateItem = styled.div`
	font-size: 1.2rem;
	padding-top: 0.2rem;
	width: 100%;
	height: 5.6rem;
	text-align: right;
	font-size: 1rem;
	border-bottom: 0.05rem solid #dddddd;
	border-right: 0.05rem solid #dddddd !important;
	border-collapse: collapse;
	:nth-child(7n) {
		background-color: #f7f7f7;
	}
	:nth-child(7n + 1) {
		background-color: #f7f7f7;
		color: #f94c66;
	}
	${(props) => {
		if (props.month === "next" || props.month === "prev") {
			return css`
				color: #d1d1d1 !important;
			`;
		}
	}}
`;

const DateItemText = styled.span`
	margin: 2px;
	${(props) => {
		if (
			props.textId ===
			"D" +
				new Date().getFullYear() +
				(new Date().getMonth() + 1) +
				new Date().getDate()
		) {
			return css`
				padding: 0.15rem;
				font-size: 0.9rem;
				color: white;
				border-radius: 40%;
				background: #f94c66;
			`;
		}
	}};
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
					month: "prev",
				});
			} else {
				dates.unshift({
					date: getLastDate(y, m - 1) - i,
					id: "D" + y + (m - 1) + (getLastDate(y, m - 1) - i),
					month: "prev",
				});
			}
		}
		for (let i = 1; i <= getLastDate(y, m); i++) {
			dates.push({ date: i, id: "D" + y + m + i, month: "this" });
		}
		if (dates.length <= 35) {
			for (let i = 1; i < 14 - getLastDay(y, m); i++) {
				if (m === 12) {
					dates.push({ date: i, id: "D" + y + 1 + i, month: "next" });
				} else {
					dates.push({ date: i, id: "D" + y + (m + 1) + i, month: "next" });
				}
			}
		} else {
			for (let i = 1; i < 7 - getLastDay(y, m); i++) {
				if (m === 12) {
					dates.push({ date: i, id: "D" + y + 1 + i, month: "next" });
				} else {
					dates.push({ date: i, id: "D" + y + (m + 1) + i, month: "next" });
				}
			}
		}

		console.log(new Date(y, m, 0).getDate());
		console.log(new Date(y, m - 1, 1).getDay());
		console.log(new Date(y, m, 0).getDay());
		console.log(dates.length);
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
		<CalenderContainer>
			<div>
				<Link to="/" style={{ textDecoration: "none" }}>
					<Button>{`<`} Go Home</Button>
				</Link>
				<CalenderNav>
					<YearAndMonth>
						{year}년 {month}월
					</YearAndMonth>
					<Buttons>
						<Button onClick={onClickPrev}>{`<`}</Button>
						<Button onClick={onClickToday}>오늘</Button>
						<Button onClick={onClickNext}>{`>`}</Button>
					</Buttons>
				</CalenderNav>
				<MainCalender className="mainCalender">
					<Days className="days">
						{days.map((d, index) => (
							<Day key={index}>{d}</Day>
						))}
					</Days>
					<Dates className="dates">
						{paintCalender(year, month).map((d) => (
							<DateItem key={d.id} id={d.id} month={d.month}>
								<div>
									<DateItemText textId={d.id}>{d.date}</DateItemText>
									<span>일</span>
								</div>
							</DateItem>
						))}
					</Dates>
				</MainCalender>
			</div>
		</CalenderContainer>
	);
};

export default Calender;
