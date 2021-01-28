import React, { useLayoutEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Box({ text, month, year }) {
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
            height: (size.height - (11 / 100) * size.height) / 7,
            width: (size.width - (2 / 100) * size.width) / 7,
            backgroundColor: "#f0e1af",
            border: "solid",
            borderWidth: 0.3,
            borderColor: "#000000",
        };
        if (text === "Sun") {
            styleObj["backgroundColor"] = "#ff0000";
        } else if (
            text === "Mon" ||
            text === "Tue" ||
            text === "Wed" ||
            text === "Thu" ||
            text === "Fri" ||
            text === "Sat"
        ) {
            styleObj["backgroundColor"] = "#0000ff";
        } else if (text === "") {
            styleObj["backgroundColor"] = "#ababab";
        }
        const currDay = new Date().getDate();
        const currMonth = new Date().getMonth();
        const currYear = new Date().getFullYear();
        if (currDay === text && currMonth === month && currYear === year) {
            styleObj["borderColor"] = "#1009e0";
            styleObj["backgroundColor"] = "#26f0dc";
        }
        return styleObj;
    };
    const gettxt = () => {
        if (
            text === "Sun" ||
            text === "Mon" ||
            text === "Tue" ||
            text === "Wed" ||
            text === "Thu" ||
            text === "Fri" ||
            text === "Sat"
        ) {
            return {
                color: "#ffffff",
            };
        } else {
            return {
                color: "#000000",
            };
        }
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
