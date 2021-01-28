import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Details() {
    let query = new URLSearchParams(useLocation().search);
    const [date] = useState(() => {
        return {
            day: query.get("day"),
            month: query.get("month"),
            year: query.get("year"),
        };
    });

    return (
        <div>
            {date.day === null || date.month === null || date.year === null ? (
                <h1> No Details</h1>
            ) : (
                <>
                    <h1>Details</h1>
                    <h1>{date.day}</h1>
                    <h1>{date.month}</h1>
                    <h1>{date.year}</h1>
                </>
            )}
        </div>
    );
}

export default Details;
