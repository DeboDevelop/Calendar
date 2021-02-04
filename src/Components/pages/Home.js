import React, { useEffect, useRef, useState } from "react";
import Calendar from "../common/Calendar";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

function Home() {
    const today = {
        day: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    };
    const [state, setstate] = useState({
        items: [],
        topMonth: new Date().getMonth(),
        topYear: new Date().getFullYear(),
        bottomMonth: new Date().getMonth(),
        bottomYear: new Date().getFullYear(),
    });
    const calendarRef = useRef(null);
    const currDate = () => {
        calendarRef.current.scrollIntoView({
            behavior: "smooth",
        });
    };
    const getToday = () => {
        return (
            <div ref={calendarRef}>
                <Calendar date={today} />
            </div>
        );
    };
    const getItem = (month, year) => {
        const newDate = {
            day: 0,
            month,
            year,
        };
        return <Calendar date={newDate} />;
    };
    useEffect(() => {
        const items = state.items.concat(getToday());
        setstate({ ...state, items: items });
    }, []);
    return (
        <div>
            <div className="header">
                <span className="header-txt">
                    <b>{months[today.month]}</b> {today.year}
                </span>
                <button className="btn-today" onClick={currDate}>
                    Today
                </button>
                <div ref={calendarRef}>
                    <Calendar date={today} />
                </div>
            </div>
        </div>
    );
}

export default Home;
