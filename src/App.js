import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Details from "./Components/pages/Details";
import Home from "./Components/pages/Home";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/details">
                    <Details />
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
