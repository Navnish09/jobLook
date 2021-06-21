import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import routes from "./common/routes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect } from "react";
import { hideAlert } from "./redux/actionCreators/alertActionsCreator";
import PublicRoute from "./common/PublicRoute";
import { setUserData } from "./redux/actionCreators/authActionsCreator";
import Listing from "./pages/Listing";
import EmployerPlace from "./pages/EmployerPlace";
import RoleBasedRoute from "./components/RoleBasedRoutes";
import Main from "./pages/Main";
import StyledAlert from "./components/StyledComponents/StyledAlert";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  const alert = useSelector(state => state.alert);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    setUserData(dispatch);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if(alert.isRequired){
          hideAlert(dispatch);
      }
    }, 2000)
  })

  return (
    <>
      {alert.isRequired &&
        <StyledAlert variant="filled" severity={alert.alertType}>
          {alert.message}
        </StyledAlert>
      }

    <Router>
      <Switch>
      
          {/* <Route exact path={routes.root} component={Main} /> */}
          
          <PublicRoute exact path={routes.root} component={Login} restricted={true} />

          <RoleBasedRoute path={routes.dashboard} component={Dashboard} allow="freelancer" />

          <PublicRoute path={routes.signup} component={Signup} restricted={true} />

          <PublicRoute path={routes.reset_password} component={ResetPassword} restricted={true} />

          <RoleBasedRoute path={routes.listing} component={Listing} allow="employer" />

          <RoleBasedRoute path={routes.employerPlace} component={EmployerPlace} allow="employer" />
          
      </Switch>
    </Router>
    </>
  );
}

export default App;
