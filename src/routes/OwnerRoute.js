import React from "react";
import { Redirect, Route } from "react-router-dom";

const OwnerRoute = ({component: Component,...rest}) => {
    return (
        <Route {...rest} render={props => (
            (localStorage.getItem("userLogin") === "true" && localStorage.getItem("userListAs") === "Owner") 
            ? <Component {...props}/> 
            : <Redirect to="/"/>
        )} />   
    );
};

export default OwnerRoute;