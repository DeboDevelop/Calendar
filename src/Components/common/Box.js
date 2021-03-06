import React, { useEffect, useLayoutEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import filledStar from "../../assets/icons/filledStar.svg";
import unfilledStar from "../../assets/icons/unfilledStar.svg";
import "./Box.css";

function createDates(day1, month1, year1) {
    let d = new Date(year1, month1, day1);
    return d.getTime();
}

function getDateFromString(str) {
    let year1 = +str.substring(0, 4);
    let month1 = +str.substring(5, 7);
    let day1 = +str.substring(8, 10);
    return createDates(day1, month1 - 1, year1);
}

function Box({ text, index, month, year, posts }) {
    let history = useHistory();
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [post, setPost] = useState(null);
    const search = () => {
        if (posts.length === 0) return null;
        let d1 = createDates(+text, month, year);
        for (let i = 0; i < posts.length; i++) {
            let d2 = getDateFromString(posts[i].calendardatetime);
            if (d1 === d2) {
                setPost(posts[i]);
                break;
            }
        }
    };
    useLayoutEffect(() => {
        function updateSize() {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    useEffect(() => {
        if (text >= 1 && text <= 31) {
            search();
        }
        // eslint-disable-next-line
    }, [posts]);
    const getImg = () => {
        let cellWidth = (size.width - (7 / 100) * size.width) / 7;
        return {
            height: 4 * (cellWidth / 3),
            width: cellWidth,
            overflow: "hidden",
            textAlign: "center",
        };
    };
    const getStyle = () => {
        let styleObj = {
            width: (size.width - (7 / 100) * size.width) / 7,
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
        if (text === "Sun") {
            styleObj["color"] = "#818181";
        }
        return styleObj;
    };
    const getCurr = () => {
        let styleObj = {
            backgroundColor: "transparent",
        };
        const currDay = new Date().getDate();
        const currMonth = new Date().getMonth();
        const currYear = new Date().getFullYear();
        if (currDay === text && currMonth === month && currYear === year) {
            styleObj["backgroundColor"] = "#ff0000";
        }
        return styleObj;
    };
    const getDetail = () => {
        if (text >= 1 && text <= 31 && post !== null) {
            history.push(`/details?day=${text}&month=${month}&year=${year}`);
        }
    };
    return (
        <div style={getStyle()} onClick={getDetail}>
            {text >= 1 && text <= 31 ? (
                <>
                    <div className="first-row">
                        <div>
                            {post !== null ? (
                                <div className="legends-div star-div">
                                    {Array(post.rating)
                                        .fill(0)
                                        .map(() => (
                                            <img className="star" src={filledStar} alt="filledStar" />
                                        ))}
                                    {Array(5 - post.rating)
                                        .fill(0)
                                        .map(() => (
                                            <img className="star" src={unfilledStar} alt="unfilledStar" />
                                        ))}
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                        <div className="circle-with-text" style={getCurr()}>
                            <span style={gettxt()}>{text}</span>
                        </div>
                    </div>
                </>
            ) : (
                <span style={gettxt()}>{text}</span>
            )}

            {post !== null ? (
                <>
                    <div style={getImg()}>
                        <img className="post-img" src={post.media[0].mediaurl} alt="user's post"></img>
                    </div>
                    <div className="legends-div">
                        {post.typeofday.map(item => {
                            if (item === "deep conditioning") return <div className="circle-with-text dc">DC</div>;
                            else if (item === "protein treatment") return <div className="circle-with-text pr">Pr</div>;
                            else if (item === "hair cut") return <div className="circle-with-text cu">Cu</div>;
                            else if (item === "hair color") return <div className="circle-with-text hc">HC</div>;
                            else if (item === "clarifying") return <div className="circle-with-text c">C</div>;
                            else return <span></span>;
                        })}
                    </div>
                </>
            ) : (
                <>
                    <div style={getImg()}></div>
                    <div className="legends-div"></div>
                </>
            )}
        </div>
    );
}

export default Box;
