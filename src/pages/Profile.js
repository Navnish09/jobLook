import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField, 
    Container,
    CircularProgress
} from '@material-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { successAlert } from '../redux/actionCreators/alertActionsCreator';
import { updateUser } from '../redux/actionCreators/authActionsCreator';
import AccountProfile from '../components/AccountProfile';

const Profile = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        name: auth.userInfo.name,
        email: auth.userInfo.email,
        phone: auth.userInfo.phone ? auth.userInfo.phone : ""
    });

    const [loading, setLoading] = useState(false);
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };
    console.log(auth);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await updateUser(auth.userInfo.userId, values);
        setLoading(false);
        successAlert(dispatch, "Updated Successfully", "success");
    }

    return ( 
        <>                   
        
         <Container maxWidth="md">
            <AccountProfile />
            <form
                onSubmit={handleSubmit}
                autoComplete="off"
                noValidate>
                <Card style = {{padding : '1em 2em'}}>
                    <CardHeader  subheader="You can manage your profile here" title="Profile" />
                    <Divider />
                    <br />
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Full name"
                                    name="name"
                                    onChange={handleChange}
                                    required
                                    value={values.name}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    value={auth.userInfo.email}
                                    variant="outlined"
                                    disabled
                                />
                                
                            </Grid>
                            <Grid item md={6} xs={12} >
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="phone"
                                    onChange={handleChange}
                                    type="number"
                                    value={values.phone}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                        <br />

                    <Divider />
                    <Box style={{display: 'flex',justifyContent: 'center', padding: '2em'}}>
                    {loading ?  
                        <CircularProgress size={25} thickness={5} color="primary" />
                    :
                        <Button color="primary" type="submit" variant="contained" size="large" style={{ textTransform: "capitalize"}}>
                            Update
                        </Button>
                    }
                    </Box>
                </Card>
            </form>
            </Container>

        </>
     );
}
 
export default Profile;