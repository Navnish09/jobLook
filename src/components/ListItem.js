import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

const CustomListItem = ({text, Icon, onClick}) => {
    return ( 
        <>
            <ListItem button onClick={onClick} style={{margin : '0.5em 0'}}>
                <ListItemIcon>
                    <Icon color="primary" style={{color : "rgba(0,0,0,0.6)"}} />
                </ListItemIcon>
                <ListItemText primary={text}  />
            </ListItem>
        </>
     );
}
 
export default CustomListItem;