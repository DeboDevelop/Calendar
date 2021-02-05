import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Calendar from "../common/Calendar";
import "./Home.css";

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
        itemsReverse: [],
        posts: [],
    });
    const [title, setTitle] = useState({
        jump: false,
        month: today.month,
        year: today.year,
    });
    const calendarRef = useRef(null);
    const bottomRef = useRef(null);
    const currDate = () => {
        calendarRef.current.scrollIntoView({
            behavior: "smooth",
        });
    };
    const scrollbot = () => {
        bottomRef.current.scrollIntoView();
    };
    const changeTitle = (month, year) => {
        setTitle(prevState => {
            if (prevState.jump === true) {
                return {
                    ...prevState,
                    jump: false,
                };
            }
            return {
                jump: false,
                month: month,
                year: year,
            };
        });
    };
    const appendTop = () => {
        setState(prevState => {
            if (prevState.itemsReverse.length === 0) {
                let data = { ...today };
                if (data.month === 0) {
                    //console.log(1);
                    data = {
                        day: 0,
                        month: 11,
                        year: data.year - 1,
                    };
                    return {
                        ...prevState,
                        itemsReverse: [...prevState.itemsReverse, data],
                    };
                } else {
                    //console.log(2);
                    data = {
                        day: 0,
                        month: data.month - 1,
                        year: data.year,
                    };
                    return {
                        ...prevState,
                        itemsReverse: [...prevState.itemsReverse, data],
                    };
                }
            } else {
                let data = prevState.itemsReverse[prevState.itemsReverse.length - 1];
                if (data.month === 0) {
                    //console.log(1);
                    data = {
                        day: 0,
                        month: 11,
                        year: data.year - 1,
                    };
                    return {
                        ...prevState,
                        itemsReverse: [...prevState.itemsReverse, data],
                    };
                } else {
                    //console.log(2);
                    data = {
                        day: 0,
                        month: data.month - 1,
                        year: data.year,
                    };
                    return {
                        ...prevState,
                        itemsReverse: [...prevState.itemsReverse, data],
                    };
                }
            }
        });
        setTitle({ ...title, jump: true });
        setTimeout(() => {
            scrollbot();
        }, 500);
    };
    const appendBottom = () => {
        setState(prevState => {
            let data = prevState.items[prevState.items.length - 1];
            if (data.month === 11) {
                //console.log(3);
                data = {
                    day: 0,
                    month: 0,
                    year: data.year + 1,
                };
                return {
                    ...prevState,
                    items: [...state.items, data],
                };
            } else {
                //console.log(4);
                data = {
                    day: 0,
                    month: data.month + 1,
                    year: data.year,
                };
                return {
                    ...prevState,
                    items: [...state.items, data],
                };
            }
        });
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
        }
        if (topScroll.scrollTop === 0) {
            appendTop();
        }
    };
    const fetchPost = () => {
        axios
            .post("https://devapi.quinn.care/graph", {
                requestobjects: [
                    {
                        posts: {
                            operationtype: "read",
                            id: {
                                return: true,
                            },
                            userid: {
                                searchvalues: ["41329663-5834-11eb-8e6e-3ca82abc3dd4"],
                                return: true,
                            },
                            iscalendarentry: {
                                searchvalues: ["true"],
                                return: true,
                            },
                            media: {
                                return: true,
                            },
                            rating: {
                                return: true,
                            },
                            text: {
                                return: true,
                            },
                            privacy: {
                                searchvalues: [18],
                                return: true,
                            },
                            typeofday: {
                                return: true,
                            },

                            calendardatetime: {
                                return: true,
                                sort: "descending",
                            },
                            maxitemcount: "30",
                            continuationtoken: null,
                        },
                    },
                ],
            })
            .then(res => {
                setState(prevState => {
                    return {
                        ...prevState,
                        posts: [...prevState.posts, ...res.data.responseobjects[0].posts],
                    };
                });
            })
            .catch(err => console.log(err));
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });
    useEffect(() => {
        fetchPost();
        setTimeout(() => {
            scrollbot();
        }, 500);
    }, []);
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
                <div className="all-calendar-reverse">
                    {state.itemsReverse.map((item, index) => {
                        if (index === state.itemsReverse.length - 2) {
                            return (
                                <div ref={bottomRef}>
                                    <Calendar date={item} changeTitle={changeTitle} posts={state.posts} />
                                </div>
                            );
                        }
                        return <Calendar date={item} changeTitle={changeTitle} posts={state.posts} />;
                    })}
                </div>
                {state.itemsReverse.length < 2 ? <div ref={bottomRef}></div> : <></>}

                <div className="all-calendar">
                    {state.items.map(item => {
                        if (item.day === today.day && item.month === today.month && item.year === today.year) {
                            return (
                                <div ref={calendarRef}>
                                    <Calendar date={today} changeTitle={changeTitle} posts={state.posts} />
                                </div>
                            );
                        } else {
                            return <Calendar date={item} changeTitle={changeTitle} posts={state.posts} />;
                        }
                    })}
                </div>
            </div>
        </div>
    );
}

export default Home;
