import React, { useLayoutEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Box({ text, index, month, year }) {
    let history = useHistory();
    const [size, setSize] = useState({ width: 0, height: 0 });
    useLayoutEffect(() => {
        function updateSize() {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    const getStyle = () => {
        let styleObj = {
            height: (size.height - (11 / 100) * size.height - 30) / 6,
            width: (size.width - (2 / 100) * size.width) / 7,
            backgroundColor: "#FCFEFF",
            border: "solid",
            borderWidth: 0.3,
            borderColor: "#000000",
        };
        if (
            text === "Sun" ||
            text === "Mon" ||
            text === "Tue" ||
            text === "Wed" ||
            text === "Thu" ||
            text === "Fri" ||
            text === "Sat"
        ) {
            styleObj["height"] = 30;
        }
        if (index === 0) {
            styleObj["backgroundColor"] = "#ECEAEF";
        }
        return styleObj;
    };
    const gettxt = () => {
        let styleObj = {
            color: "#000000",
        };
        const currDay = new Date().getDate();
        const currMonth = new Date().getMonth();
        const currYear = new Date().getFullYear();
        if (currDay === text && currMonth === month && currYear === year) {
            styleObj["backgroundColor"] = "#ff0000";
            styleObj["borderRadius"] = 50;
        }
        if (text === "Sun") {
            styleObj["color"] = "#818181";
        }
        return styleObj;
    };
    const getDetail = () => {
        if (text >= 1 && text <= 31) {
            history.push(`/details?day=${text}&month=${month}&year=${year}`);
        }
    };
    return (
        <div style={getStyle()} onClick={getDetail}>
            <span style={gettxt()}>{text} </span>
        </div>
    );
}

export default Box;
