import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import leftArrow from "../../assets/icons/leftArrow.svg";
import rightArrow from "../../assets/icons/rightArrow.svg";
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
                            media: {
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
                            maxitemcount: "30",
                            continuationtoken: null,
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
                            <div className="btn-container">
                                <div className="center">
                                    <button className="btn" onClick={() => prev()}>
                                        <img src={leftArrow} alt="left arrow" />
                                    </button>
                                </div>
                            </div>
                            <div className="card-container dis">
                                {state.currIndex !== 0 ? <DisabledTile data={state.posts[state.currIndex - 1]} /> : ""}
                            </div>
                            <div className="card-container">
                                <Tile data={state.posts[state.currIndex]} />
                            </div>
                            <div className="card-container dis">
                                {state.currIndex !== state.posts.length - 1 ? (
                                    <DisabledTile data={state.posts[state.currIndex + 1]} />
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="btn-container">
                                <div className="center">
                                    <button className="btn" onClick={() => next()}>
                                        <img src={rightArrow} alt="right arrow" />
                                    </button>
                                </div>
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
