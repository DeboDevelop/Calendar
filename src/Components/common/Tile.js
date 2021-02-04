import React from "react";
import ReactReadMoreReadLess from "react-read-more-read-less";
import filledStar from "../../assets/icons/filledStar.svg";
import unfilledStar from "../../assets/icons/unfilledStar.svg";
import "./Tile.css";

function Tile({ data }) {
    const getImg = () => {
        let cellWidth = 250;
        return {
            height: 4 * (cellWidth / 3),
            width: cellWidth,
            overflow: "hidden",
            textAlign: "center",
        };
    };
    const getText = () => {
        let months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let year = data.calendardatetime.substring(0, 4);
        let month = data.calendardatetime.substring(5, 7);
        let day = data.calendardatetime.substring(8, 10);
        let strData = "";
        if (day.charAt(0) === "0") {
            strData = day.charAt(1);
        } else {
            strData = day;
        }

        if (day.charAt(1) === "1") {
            strData += "st";
        } else if (day.charAt(1) === "2") {
            strData += "nd";
        } else if (day.charAt(1) === "3") {
            strData += "rd";
        } else {
            strData += "th";
        }
        strData += " " + months[month] + ", " + year;
        return strData;
    };
    return (
        <div className="tile">
            <div style={getImg()}>
                <img className="img" src={data.images[0].imageurl} alt="card"></img>
            </div>
            <div className="first-row pads">
                <div className="legends">
                    {data.typeofday.map(item => {
                        if (item === "deep conditioning") return <div className="circle-with-text dc">DC</div>;
                        else if (item === "protein treatment") return <div className="circle-with-text pr">Pr</div>;
                        else if (item === "hair cut") return <div className="circle-with-text cu">Cu</div>;
                        else if (item === "hair color") return <div className="circle-with-text hc">HC</div>;
                        else if (item === "clarifying") return <div className="circle-with-text c">C</div>;
                        else return <span></span>;
                    })}
                </div>
                <div className="legends star-div">
                    {Array(data.rating)
                        .fill(0)
                        .map(() => (
                            <img className="star" src={filledStar} alt="filledStar" />
                        ))}
                    {Array(5 - data.rating)
                        .fill(0)
                        .map(() => (
                            <img className="star" src={unfilledStar} alt="unfilledStar" />
                        ))}
                </div>
            </div>
            <p className="date">{getText()}</p>
            <div className="txt">
                <ReactReadMoreReadLess
                    charLimit={100}
                    readMoreText={"(more)"}
                    readLessText={"(less)"}
                    readMoreClassName={"link"}
                    readLessClassName={"link"}>
                    {data.text}
                </ReactReadMoreReadLess>
            </div>
        </div>
    );
}

export default Tile;
