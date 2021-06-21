import { Grid, Button } from "@material-ui/core"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Main = () => {
    const auth = useSelector(state => state.auth);
    return ( 
        <>  
           <h1>Index Page</h1>
        </>
     );
}
 
export default Main;