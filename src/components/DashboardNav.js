import {
    Paper,
    List,
    makeStyles,
    Chip, Grid
} from '@material-ui/core';
import { logOutUser } from "../redux/actionCreators/authActionsCreator";

import CustomListItem from "./ListItem";
import { Link, useRouteMatch } from 'react-router-dom';
import Person from '@material-ui/icons/Person';
import WorkIcon from '@material-ui/icons/Work';
import ExitToApp from '@material-ui/icons/ExitToApp'; 
import LibraryBooks from '@material-ui/icons/LibraryBooks'; 
import { useDispatch, useSelector } from 'react-redux';
import { memo } from 'react';

const style = makeStyles((theme) => ({
    navMenu: {
        background: theme.palette.secondary.main,
        height: "100vh", 
        position : "sticky",
        padding: "0 1em",
        top : 0,
    },
    list : {padding : '2em 0'},
    listItems : { margin : '1em 0'},
    link: { textDecoration: "none", color: "black"},
}))


const DashboardNav = () => {
    const classes = style();
    const auth = useSelector(state => state.auth);
    const userId = auth.userInfo.userId;
    const dispatch = useDispatch();
    const match = useRouteMatch();
    
    const handleClick = () => {
        logOutUser(dispatch, userId);
    }
    console.log(match);

    return ( 
        <>  
            <Paper elevation={2} square className={classes.navMenu}>
                <List className={classes.list}>
                    
                    <Grid container justify="center">
                        <Chip label={auth.userInfo.role} style={{textTransform : "capitalize"}} color="primary"/>
                    </Grid>
                    <br />
                    <Link className={classes.link} to={match.path}>
                        <CustomListItem Icon={WorkIcon} text="Dashboard" />
                    </Link>

                    <Link className={classes.link} to={`${match.path}/profile`}>
                        <CustomListItem Icon={Person} text="Profile" />
                    </Link>
                    {auth.userInfo.role === "employer" && 
                        <Link className={classes.link} to={`${match.path}/profile`}>
                        <CustomListItem Icon={LibraryBooks} text="Listings" />
                        </Link>
                    }
                    <CustomListItem Icon={ExitToApp} onClick={handleClick} text="Logout" />
                   
                </List>
            </Paper>
        </>
     );
}
 
export default memo(DashboardNav);