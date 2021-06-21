import {
    Typography,
    Button,
    FormControl,
    TextField,
    CircularProgress,
    makeStyles
} from "@material-ui/core"
import { useRef, useState } from "react";
import FormOuter from "../components/FormOuter";
import { resetPassword } from '../redux/actionCreators/authActionsCreator';
import { successAlert } from "../redux/actionCreators/alertActionsCreator";
import { useDispatch } from "react-redux";

const styles = makeStyles((theme) => ({
    heading: {
        fontWeight: 500,
    },
    link: {
        color: theme.palette.secondary.main,
        textDecoration: "none",
    },
    button: {
        padding: "1em",
        textTransform: "capitalize"
    }
}))

const ResetPassword = () => {
    const classes = styles();
    const [emailMsg, setEmailMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const emailRef = useRef('');
    const dispatch = useDispatch();



    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;

        if (!email) {
            (!email) ? setEmailMsg("Email can't be empty") : setEmailMsg(null);
        }else{
            setLoading(true);
            try {
                
                await resetPassword(email);
                setEmailMsg(null);
                successAlert(dispatch, "Check your email for password reset link");

            } catch (err) {
                switch (err.code) {
                    case 'auth/invalid-email':
                    case 'auth/user-not-found':
                        setEmailMsg("Email not registered");
                        break;

                    default:
                        console.log(err);
                }
            }
        }

        setLoading(false);

    }
    return ( 
        <>
            <FormOuter>
                <Typography variant="h5" className={classes.heading} align="center" color="initial" gutterBottom={true}>
                    Reset Password
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth={true} margin="normal">
                        <TextField label="Email" error={emailMsg ? true : false} color="primary" inputRef={emailRef} helperText={emailMsg} />
                    </FormControl>
                   
                    <br />
                    <br />
                    {loading ? (
                        <Typography align="center" component="div">
                            <CircularProgress size={25} thickness={5} color="primary" style={{ padding: '0.85em' }} />
                        </Typography>
                    ) : (
                        <Button type="submit" variant="contained" className={classes.button} disableElevation={true} size="large" fullWidth={true} color="primary">
                            Submit
                        </Button>
                    )}

                </form>
            </FormOuter>
        </>
     );
}
 
export default ResetPassword;