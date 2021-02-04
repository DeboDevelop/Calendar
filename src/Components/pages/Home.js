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
    });
    const [title, setTitle] = useState({
        month: today.month,
        year: today.year,
    });
    const calendarRef = useRef(null);
    const currDate = () => {
        calendarRef.current.scrollIntoView({
            behavior: "smooth",
        });
    };
    const changeTitle = (month, year) => {
        setTitle({
            month: month,
            year: year,
        });
    };
    const appendTop = () => {
        let data = state.items[0];
        if (data.month === 0) {
            console.log(1);
            data = {
                day: 0,
                month: 11,
                year: data.year - 1,
            };
            setState({
                items: [data, ...state.items],
            });
        } else {
            console.log(2);
            data = {
                day: 0,
                month: data.month - 1,
                year: data.year,
            };
            setState({
                items: [data, ...state.items],
            });
        }
    };
    const appendBottom = () => {
        let data = state.items[state.items.length - 1];
        if (data.month === 11) {
            console.log(3);
            data = {
                day: 0,
                month: 0,
                year: data.year + 1,
            };
            setState({
                items: [...state.items, data],
            });
        } else {
            console.log(4);
            data = {
                day: 0,
                month: data.month + 1,
                year: data.year,
            };
            setState({
                items: [...state.items, data],
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
                    <b>{months[title.month]}</b> {title.year}
                </span>
                <button className="btn-today" onClick={currDate}>
                    Today
                </button>
            </div>
            <div
                style={{
                    marginTop: 50,
                }}></div>
            <div onScroll={handleScroll} className="all-calendar">
                {state.items.map(item => {
                    if (item.day === today.day && item.month === today.month && item.year === today.year) {
                        return (
                            <div ref={calendarRef}>
                                <Calendar date={today} changeTitle={changeTitle} />
                            </div>
                        );
                    } else {
                        return <Calendar date={item} changeTitle={changeTitle} />;
                    }
                })}
            </div>
        </div>
    );
}

export default Home;
