import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Calendar from "./Components/pages/Calendar";
import Details from "./Components/pages/Details";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/details">
                    <Details />
                </Route>
                <Route exact path="/">
                    <Calendar />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
