import React from "react";
import filledStar from "../../assets/icons/filledStar.svg";
import unfilledStar from "../../assets/icons/unfilledStar.svg";
import "./Tile.css";

function DisabledTile({ data }) {
    const getImg = () => {
        let cellWidth = 200;
        return {
            height: 4 * (cellWidth / 3),
            width: cellWidth,
            overflow: "hidden",
            textAlign: "center",
        };
    };
    return (
        <div className="disabled-tile overlay">
            <div style={getImg()}>
                <img className="img" src={data.images[0].imageurl} alt="card"></img>
            </div>
            <div className="first-row pads">
                <div className="legends">
                    {data.typeofday.map(item => {
                        if (item === "deep conditioning") return <div className="circle-with-text-disabled dc">DC</div>;
                        else if (item === "protein treatment")
                            return <div className="circle-with-text-disabled pr">Pr</div>;
                        else if (item === "hair cut") return <div className="circle-with-text-disabled cu">Cu</div>;
                        else if (item === "hair color") return <div className="circle-with-text-disabled hc">HC</div>;
                        else if (item === "clarifying") return <div className="circle-with-text-disabled c">C</div>;
                        else return <span></span>;
                    })}
                </div>
                <div className="legends star-div">
                    {Array(data.rating)
                        .fill(0)
                        .map(() => (
                            <img className="star-disabled" src={filledStar} alt="filledStar" />
                        ))}
                    {Array(5 - data.rating)
                        .fill(0)
                        .map(() => (
                            <img className="star-disabled" src={unfilledStar} alt="unfilledStar" />
                        ))}
                </div>
            </div>
            <div className="txt truncate-overflow">{data.text}</div>
        </div>
    );
}

export default DisabledTile;
