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
    const [state, setState] = useState({
        items: [
            {
                ...today,
            },
        ],
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
    const appendTop = () => {
        let data = null;
        if (state.topMonth === 0) {
            console.log(1);
            data = {
                day: 0,
                month: 11,
                year: state.topYear - 1,
            };
            setState({
                ...state,
                items: [data, ...state.items],
                topMonth: 11,
                topYear: state.topYear - 1,
            });
        } else {
            console.log(2);
            data = {
                day: 0,
                month: state.topMonth - 1,
                year: state.topYear,
            };
            setState({
                ...state,
                items: [data, ...state.items],
                topMonth: state.topMonth - 1,
                topYear: state.topYear,
            });
        }
    };
    const appendBottom = () => {
        let data = null;
        if (state.bottomMonth === 11) {
            console.log(3);
            data = {
                day: 0,
                month: 0,
                year: state.bottomYear + 1,
            };
            setState({
                ...state,
                items: [data, ...state.items],
                bottomMonth: 0,
                bottomYear: state.bottomYear + 1,
            });
        } else {
            console.log(4);
            data = {
                day: 0,
                month: state.bottomMonth + 1,
                year: state.bottomYear,
            };
            setState({
                ...state,
                items: [data, ...state.items],
                bottomMonth: state.bottomMonth + 1,
                bottomYear: state.bottomYear,
            });
        }
    };
    const handleScroll = e => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );
        const windowBottom = windowHeight + window.pageYOffset;
        const topScroll = html.clientHeight ? html : body;
        if (windowBottom >= docHeight) {
            appendBottom();
            alert("Bottom");
        }
        if (topScroll.scrollTop === 0) {
            appendTop();
            alert("Top");
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    console.log("Infinite");
    return (
        <div>
            <div className="header">
                <span className="header-txt">
                    <b>{months[today.month]}</b> {today.year}
                </span>
                <button className="btn-today" onClick={currDate}>
                    Today
                </button>
            </div>
            <div onScroll={handleScroll} className="all-calendar">
                {state.items.map(item => {
                    if (item.day === today.day && item.month === today.month && item.year === today.year) {
                        return (
                            <div ref={calendarRef}>
                                <Calendar date={today} />
                            </div>
                        );
                    } else {
                        return <Calendar date={item} />;
                    }
                })}
            </div>
        </div>
    );
}

export default Home;
