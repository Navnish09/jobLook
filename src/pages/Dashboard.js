import { memo } from "react";
import { useSelector } from "react-redux";
import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import DashboardLayout from "../components/DashboardLayout";
import { Redirect, Switch, Route } from "react-router-dom";
import Profile from "./Profile";
const styles = makeStyles(() => ({
    box : {
        position : "absolute",
        top : '50%',
        left : '50%',
        transform : 'translate(-50%,-50%)'
    }
}))

const Dashboard = () => {
    const classes = styles();
    const auth = useSelector(state => state.auth);
    
    return ( 
        <>
        {auth.isLoggedIn ? 
            <>
                <DashboardLayout />
            </>
            :
            <Box component="div" className={classes.box}>
                <CircularProgress size={25} thickness={5} color="primary" />
            </Box>
        }
        </>
     );
}
 
export default memo(Dashboard);