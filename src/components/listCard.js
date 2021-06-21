import {
    Avatar,
    Box,
    Card,
    CardContent,
    Divider,
    Grid,
    Typography
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';

const listCard = ({ product, ...rest }) => (
    <Card
        sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}
        {...rest}
    >
        <CardContent>
        
            <Typography
                align="center"
                color="textPrimary"
                gutterBottom
                variant="h4"
            >
                {listInfo.title}
            </Typography>
            <Typography
                align="center"
                color="textPrimary"
                variant="body1"
            >
                {listInfo.description}
            </Typography>
        </CardContent>

        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <Box sx={{ p: 2 }}>
            <Grid container spacing={2} style={{ justifyContent: 'space-between' }}>
                <Grid
                    item
                    sx={{
                        alignItems: 'center',
                        display: 'flex'
                    }}
                >
                    <AccessTimeIcon color="action" />
                    <Typography
                        color="textSecondary"
                        display="inline"
                        sx={{ pl: 1 }}
                        variant="body2"
                    >
                        Updated 2hr ago
                    </Typography>
                </Grid>
                <Grid
                    item
                    sx={{
                        alignItems: 'center',
                        display: 'flex'
                    }}
                >
                    <GetAppIcon color="action" />
                    <Typography
                        color="textSecondary"
                        display="inline"
                        sx={{ pl: 1 }}
                        variant="body2"
                    >
                        {listInfo.totalDownloads}
                        {' '}
                        Downloads
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    </Card>
);

export default listCard;