import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router";
import { isTokenAvailable } from "../services/authServices";
import routes from "../common/routes";

const RoleBasedRoute = ({ component: Component, allow , ...rest}) => {
    const auth = useSelector(state => state.auth);
    const userRole = auth.userInfo.role;

    return (
        <>  
            { !isTokenAvailable() && <Redirect to={routes.root} /> }

            {userRole &&
                <Route {...rest} render={ props => 
                    allow === userRole ?
                        <Component {...props}/>
                        :
                        <h1>You are not Authorized to access this route</h1>
                } />
            }
        </>
    )
}

export default RoleBasedRoute;