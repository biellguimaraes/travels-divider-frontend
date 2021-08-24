import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from '../components/home';
import ListTraveler from '../components/traveler';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={ListTraveler} path="/traveler" />
        </BrowserRouter>
    )
}

export default Routes;