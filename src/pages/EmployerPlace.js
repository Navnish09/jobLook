import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../redux/actionCreators/authActionsCreator";
import {Box, CircularProgress, makeStyles} from '@material-ui/core';
import DashboardLayout from "../components/DashboardLayout";
const styles = makeStyles(() => ({
    box: {
        position: "absolute",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
    }
}))
const EmployerPlace = () => {
    const classes = styles();
    const auth = useSelector(state => state.auth);
    
    const userId = auth.userInfo.userId;
    const dispatch = useDispatch();

    const handleClick = () => {
        logOutUser(dispatch, userId);
    }

   
    return ( 
        <>
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
        </>
     );
}
 
    export default EmployerPlace;