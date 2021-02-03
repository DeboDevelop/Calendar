import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import DisabledTile from "../common/DisabledTile";
import Tile from "../common/Tile";
import "./Details.css";

function Details() {
    let history = useHistory();
    let query = new URLSearchParams(useLocation().search);
    const [date] = useState(() => {
        return {
            day: query.get("day"),
            month: query.get("month"),
            year: query.get("year"),
        };
    });
    const [state, setState] = useState({
        posts: [],
        continuationToken: null,
        currIndex: 0,
        startIndex: 0,
    });
    const fetchPost = () => {
        axios
            .post("https://devapi.quinn.care/graph", {
                requestobjects: [
                    {
                        posts: {
                            operationtype: "read",
                            id: {
                                return: true,
                            },
                            userid: {
                                searchvalues: ["41329663-5834-11eb-8e6e-3ca82abc3dd4"],
                                return: true,
                            },
                            iscalendarentry: {
                                searchvalues: ["true"],
                                return: true,
                            },
                            images: {
                                return: true,
                            },
                            rating: {
                                return: true,
                            },
                            text: {
                                return: true,
                            },
                            privacy: {
                                searchvalues: [18],
                                return: true,
                            },
                            typeofday: {
                                return: true,
                            },
                            calendardatetime: {
                                return: true,
                                sort: "descending",
                            },
                            maxitemcount: "10",
                            continuationtoken: state.continuationToken,
                        },
                    },
                ],
            })
            .then(res => {
                setState(() => ({
                    ...state,
                    continuationToken: res.data.responseobjects[0].continuationtoken,
                    posts: [...state.posts, ...res.data.responseobjects[0].posts],
                }));
            })
            .catch(err => console.log(err));
    };
    useEffect(() => {
        fetchPost();
        // eslint-disable-next-line
    }, []);
    const prev = () => {
        if (state.currIndex === 0) return;
        setState({ ...state, currIndex: state.currIndex - 1 });
    };
    const next = () => {
        if (state.currIndex === state.posts.length - 1) return;
        if (state.currIndex === state.posts.length - 3 && state.continuationToken !== null) fetchPost();
        setState({ ...state, currIndex: state.currIndex + 1 });
    };
    return (
        <div>
            {date.day === null || date.month === null || date.year === null ? (
                history.push("/")
            ) : (
                <>
                    {state.posts.length !== 0 ? (
                        <div className="display">
                            <div className="card-container">
                                {state.currIndex !== 0 ? <DisabledTile data={state.posts[state.currIndex - 1]} /> : ""}
                            </div>
                            <div className="card-container">
                                <Tile data={state.posts[state.currIndex]} />
                                <div className="btn-div">
                                    <button className="btn btn-prev" onClick={() => prev()}>
                                        {"<"}
                                    </button>
                                    <button className="btn btn-next" onClick={() => next()}>
                                        {">"}
                                    </button>
                                </div>
                            </div>
                            <div className="card-container">
                                {state.currIndex !== state.posts.length - 1 ? (
                                    <DisabledTile data={state.posts[state.currIndex + 1]} />
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </>
            )}
        </div>
    );
}

export default Details;
