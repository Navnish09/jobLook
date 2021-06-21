import {
    Typography,
    makeStyles,
    FormControl,
    FormHelperText,
    TextField,
    Button,
    CircularProgress
} from "@material-ui/core";
import { useRef, useState, memo } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../redux/actionCreators/authActionsCreator";
import { getRefsValue } from "../common/polyfills";
import { useDispatch } from "react-redux";
import routes from "../common/routes";

const styles = makeStyles((theme) => ({

    link: {
        color: theme.palette.secondary.main,
        textDecoration: "none",
    },
    button: {
        padding: "1em",
        textTransform: "capitalize"
    },
    heading: {
        fontWeight: 500,
    },

}))

const SignupForm = ({setSelectRole}) => {
    const [loading, setLoading] = useState(false);
    const [emailErr, setEmailErr] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [phoneErr, setPhoneErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const nameRef = useRef('');
    const emailRef = useRef('');
    const phoneRef = useRef('');
    const passwordRef = useRef('');
    const classes = styles();
    const disptach = useDispatch();
    
    const resetForm = () => {
        nameRef.current.value = ''
        emailRef.current.value = ''
        phoneRef.current.value = ''
        passwordRef.current.value = ''
    }

    const resetErrors = () => {
        setEmailErr('');
        setNameErr('');
        setPhoneErr('');
        setPasswordErr('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        resetErrors();
        const [name, email, phone, password] = getRefsValue(nameRef, emailRef, phoneRef, passwordRef);

        if(!name || !email || !phone){
            (!name) ? setNameErr('Name can not be empty') : setNameErr('');
            (!email) ? setEmailErr('Email can not be empty') : setEmailErr('');
            (!phone) ? setPhoneErr('Phone can not be empty') : setPhoneErr('');
            (!password) ? setPasswordErr('Phone can not be empty') : setPasswordErr('');
        }else{
            setLoading(true);

            try {
                
                await registerUser(disptach, email, password, { name, phone });
                resetForm();
                setSelectRole(true)
                
            } catch (error) {
                switch (error.code) {
                    case 'auth/invalid-email':
                        setEmailErr('Email is invalid');
                        break;
                    case 'auth/email-already-in-use':
                        setEmailErr('Email is already in use');
                        break;
                    default :
                        console.log(error);
                }
            }
        }

        setLoading(false);      
       
    }

    return ( 
        <>
            <Typography variant="h5" className={classes.heading} align="center" color="initial" gutterBottom={true}>
                Signup
            </Typography>
            <form onSubmit={handleSubmit}>
                <br />
                <FormControl fullWidth={true} margin="normal">
                    <TextField label="Full Name" inputRef={nameRef} error={nameErr ? true : false} helperText={nameErr} type="text" color="secondary" />
                </FormControl>
                <FormControl fullWidth={true} margin="normal">
                    <TextField label="Email" inputRef={emailRef} error={emailErr ? true : false} helperText={emailErr}  color="secondary" />
                </FormControl>
                <FormControl fullWidth={true} margin="normal">
                    <TextField label="Phone" inputRef={phoneRef} error={phoneErr ? true : false} helperText={phoneErr} color="secondary" />
                </FormControl>

                <FormControl fullWidth={true} margin="normal">
                    <TextField label="Password" type="password" inputRef={passwordRef} error={passwordErr ? true : false} helperText={passwordErr} color="secondary" />
                </FormControl>
                
                <br />
                <br />
                {loading ? (
                    <Typography align="center" component="div">
                        <CircularProgress size={25} thickness={5} color="primary" style={{ padding: '0.85em' }} />
                    </Typography>
                ) : (
                    <Button type="submit" variant="contained" className={classes.button} disableElevation={true} size="large" fullWidth={true} color="primary">
                        Sign up
                    </Button>
                )}
                    
            </form>
            <br />
            <br />
            <Typography variant="subtitle2" align="center" color="initial">
                Already have an account?
                <Link to={routes.root} className={classes.link}> Login</Link>
            </Typography>
        </>
     );
}
 
export default memo(SignupForm);