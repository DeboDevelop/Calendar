import React, { Component } from "react";
import Box from "../common/Box";
import "./Calendar.css";

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

export class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mounted: false,
            calender: [[], [], [], [], [], [], []],
            day: new Date().getDate(),
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.getCalender = this.getCalender.bind(this);
        this.setToday = this.setToday.bind(this);
    }
    componentDidMount() {
        this.setState({ ...this.state, mounted: true, calender: this.getCalender(this.state.month, this.state.year) });
        window.addEventListener("wheel", e => this.handleScroll(e));
    }

    componentWillUnmount() {
        this.setState({ ...this.state, mounted: false });
        window.removeEventListener("wheel", this.handleScroll);
    }

    handleScroll(e) {
        if (e.deltaY < 0) {
            if (this.state.month === 0) {
                this.setState({
                    ...this.state,
                    month: 11,
                    year: this.state.year - 1,
                    calender: this.getCalender(11, this.state.year - 1),
                });
            } else {
                this.setState({
                    ...this.state,
                    month: this.state.month - 1,
                    calender: this.getCalender(this.state.month - 1, this.state.year),
                });
            }
        } else if (e.deltaY > 0) {
            if (this.state.month === 11) {
                this.setState({
                    ...this.state,
                    month: 0,
                    year: this.state.year + 1,
                    calender: this.getCalender(0, this.state.year + 1),
                });
            } else {
                this.setState({
                    ...this.state,
                    month: this.state.month + 1,
                    calender: this.getCalender(this.state.month + 1, this.state.year),
                });
            }
        }
    }

    getCalender(month, year) {
        let result = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let finalRes = [];
        let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if ((year % 4 === 0 && year % 100 === 0) || year % 400 === 0) {
            daysInMonth[1] = 29;
        }
        const blanks = new Date(year, month, 1).getDay();
        for (let i = 0; i < blanks; i++) {
            result.push("");
        }
        for (let i = 1; i <= daysInMonth[month]; i++) {
            result.push(i);
        }
        for (let i = 0; i < 42 - blanks - daysInMonth[month]; i++) {
            result.push("");
        }
        let startIndex = 0;
        for (let i = 0; i < 7; i++) {
            finalRes.push(result.slice(startIndex, startIndex + 7));
            startIndex = startIndex + 7;
        }
        return finalRes;
    }
    setToday() {
        let month = new Date().getMonth();
        let year = new Date().getFullYear();
        this.setState({ ...this.state, month: month, year: year, calender: this.getCalender(month, year) });
    }
    render() {
        return (
            <div>
                <div className="header">
                    <span>
                        {months[this.state.month]} , {this.state.year}
                    </span>
                    <button onClick={this.setToday}>Today</button>
                </div>
                <div className="calendar-col">
                    {this.state.calender.map(row => {
                        return (
                            <div className="calendar-row">
                                {row.map(item => {
                                    return <Box text={item} month={this.state.month} year={this.state.year} />;
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Calendar;
