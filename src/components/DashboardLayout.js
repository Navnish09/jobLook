import DashboardNav from "./DashboardNav";
import Grid from '@material-ui/core/Grid'
import DashboardMain from "./DashboardMain";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { makeStyles, Container, Typography } from "@material-ui/core";
import Profile from "../pages/Profile";
import { memo } from "react";
import { useSelector } from "react-redux";
const styles = makeStyles((theme) => ({
    container : {
        padding : '2em'
    }
}))

const DashboardLayout = () => {
    const classes = styles();
    const auth = useSelector(state => state.auth);
    const match = useRouteMatch();

    return ( 
        <>
            <Grid container>
                <Grid item md={2}>
                    <DashboardNav />
                </Grid>
                <Grid item md={10} className={classes.container}>
                    <Switch>
                        <Route exact path={`${match.path}`}>
                        <Typography variant="h5" color="initial">
                            Welcome, {auth.userInfo.name}
                        </Typography>
                        </Route>
                        <Route path={`${match.path}/profile`}>
                            <Profile />
                        </Route>
                    </Switch>
                </Grid>
            </Grid>
        </>
     );
}
 
export default memo(DashboardLayout);