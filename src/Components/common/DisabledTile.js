import React from "react";
import "./Tile.css";

function DisabledTile({ data }) {
    return (
        <div className="disabled-tile overlay">
            <img className="img" src={data.images[0].imageurl} alt="card"></img>
            <div className="legends">
                <div>
                    {data.typeofday.map(item => {
                        if (item === "deep conditioning") return <span className="fill dc">DC</span>;
                        else if (item === "protein treatment") return <span className="fill pr">Pr</span>;
                        else if (item === "hair cut") return <span className="fill cu">Cu</span>;
                        else if (item === "hair color") return <span className="fill hc">HC</span>;
                        else if (item === "clarifying") return <span className="fill c">C</span>;
                        else return <span></span>;
                    })}
                </div>
                <div>
                    {Array(data.rating)
                        .fill(0)
                        .map(() => (
                            <span className="star">★</span>
                        ))}
                    {Array(5 - data.rating)
                        .fill(0)
                        .map(() => (
                            <span className="star">☆</span>
                        ))}
                </div>
            </div>
            <div className="txt truncate-overflow">{data.text}</div>
        </div>
    );
}

export default DisabledTile;
