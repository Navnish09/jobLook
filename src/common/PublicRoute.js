import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router";
import { isTokenAvailable } from "../services/authServices";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const auth = useSelector(state => state.auth);
    const role = auth.userInfo.role;
    let RedirectUrl;
    if(role){
        switch(role){
            case "employer" :
                RedirectUrl = "/employerPlace";
                break;

            case "freelancer" :
                RedirectUrl = "/dashboard";
                break;
        }
    }

    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
            <Route {...rest} render={props =>
                isTokenAvailable() && restricted ?
                    <Redirect to={RedirectUrl} />
                    :
                    <Component {...props} />
            } />
    );
};

export default PublicRoute;