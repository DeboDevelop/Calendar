import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

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
    useEffect(() => {
        axios
            .post("http://quinncareapi-dev.us-east-2.elasticbeanstalk.com/graph", {
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
        // eslint-disable-next-line
    }, []);
    console.log("Infinite");
    return (
        <div>
            {date.day === null || date.month === null || date.year === null ? (
                history.push("/")
            ) : (
                <>
                    {state.posts.length !== 0 ? (
                        <div>{state.posts[state.currIndex].calendardatetime}</div>
                    ) : (
                        <div>Hello</div>
                    )}
                </>
            )}
        </div>
    );
}

export default Details;
