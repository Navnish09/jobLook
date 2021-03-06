import { isTokenAvailable } from "../services/authServices";
import { Route, Redirect } from "react-router";

 const PrivateRoute = ({ component: Component, ...rest }) => {
     
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        
        <Route {...rest} render={props => (
            isTokenAvailable()  ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;