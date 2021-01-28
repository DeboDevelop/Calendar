import React, { Component } from "react";
import Box from "../common/Box";

export class Calendar extends Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
    }
    componentDidMount() {
        this.prev = window.scrollY;
        window.addEventListener("wheel", e => this.handleScroll(e));
    }

    componentWillUnmount() {
        window.removeEventListener("wheel", this.handleScroll);
    }

    handleScroll(e) {
        if (e.deltaY < 0) {
            console.log("scrolling up");
        } else if (e.deltaY > 0) {
            console.log("scrolling down");
        }
    }
    render() {
        return (
            <div onScroll={this.handleScroll}>
                <Box />
            </div>
        );
    }
}

export default Calendar;
