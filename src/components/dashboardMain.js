import { useSelector, useDispatch } from "react-redux";
import {Container} from '@material-ui/core';
import { Switch, Route } from "react-router-dom";
import Profile from "../pages/Profile";

 const DashboardMain = () => {
    const auth = useSelector(state => state.auth);

    return (
        <>  
            <h1>Welcome to dashboard</h1>
        </>
    )
 }

 export default  DashboardMain;
