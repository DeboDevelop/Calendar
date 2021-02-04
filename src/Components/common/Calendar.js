import React, { Component } from "react";
import VizSensor from "react-visibility-sensor";
import Box from "./Box";
import "./Calendar.css";

export class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calender: [[], [], [], [], [], [], []],
            day: this.props.date.day,
            month: this.props.date.month,
            year: this.props.date.year,
        };
        this.getCalender = this.getCalender.bind(this);
        this.setToday = this.setToday.bind(this);
    }
    componentDidMount() {
        this.setState({ ...this.state, calender: this.getCalender(this.state.month, this.state.year) });
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
            <VizSensor
                partialVisibility
                onChange={isVisible => {
                    if (isVisible) {
                        this.props.changeTitle(this.state.month, this.state.year);
                    }
                }}>
                <div>
                    <div className="calendar-col">
                        {this.state.calender.map(row => {
                            return (
                                <div className="calendar-row">
                                    {row.map((item, index) => {
                                        return (
                                            <Box
                                                text={item}
                                                index={index}
                                                month={this.state.month}
                                                year={this.state.year}
                                            />
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </VizSensor>
        );
    }
}

export default Calendar;
