import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    CircularProgress
} from '@material-ui/core';
import EditOutlined from '@material-ui/icons/EditOutlined';
import avatar from '../static/images/avatar.png';
import { useDispatch, useSelector } from 'react-redux';
import { setUserImage } from '../redux/actionCreators/authActionsCreator';
import { useEffect, useState } from 'react';

const AccountProfile = (props) => {
    const auth = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(auth.userInfo.imageUrl ? auth.userInfo.imageUrl : avatar);


    const handleFile = async (e) => {
        const file = e.target.files[0];
        if(!file) return;
        setLoading(true);
        const fileName = `${auth.userInfo.userId}.webp`;

        let imageUrl;
        try {
        
            imageUrl = await setUserImage(dispatch, file, `userProfile/${fileName}`, auth.userInfo.userId);
            setImage(imageUrl);

        } catch (error) {
            console.log(error);
        }

        setLoading(false)
    }

    return (
       <>
            <Card {...props} elevation={0} style={{background : 'rgba(0,0,0,0)'}}>
                <CardContent>
                    <Box style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                    {
                        loading ?
                            <CircularProgress size={16} thickness={5} color="primary" />
                        :
                        <Avatar
                            src={image}
                            style={{
                                height: 80,
                                width: 80,
                                filter: 'contrast(1)'
                            }}
                        />

                    }

                        <Button
                            color="primary"
                            variant="text"
                            component="label"
                            startIcon={<EditOutlined color="secondary" fontSize="small" />}
                            style={{ textTransform: 'capitalize' }}>
                            <Typography variant="caption" style={{ fontSize: '0.8em', fontWeight: 'bold' }} color="initial">Edit</Typography>
                            <input type="file" hidden onChange={handleFile} />
                        </Button>

                    </Box>
                </CardContent>

            </Card>
       </>
    );
}

export default AccountProfile;