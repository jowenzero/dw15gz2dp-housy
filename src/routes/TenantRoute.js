import React from "react";
import { Redirect, Route } from "react-router-dom";

const TenantRoute = ({component: Component,...rest}) => {
    return (
        <Route {...rest} render={props => (
            (localStorage.getItem("userLogin") === "true" && localStorage.getItem("userListAs") === "Tenant") 
            ? <Component {...props}/> 
            : <Redirect to="/"/>
        )} />   
    );
};

export default TenantRoute;