import { useHistory } from "react-router-dom";

const Listing = () => {
    const history = useHistory();
    const handleClick = () => {
        history.push('/');
    }
    return ( 
        <>
            <h1>You can list jobs here</h1>
            <button onClick = {handleClick}> Dashboard</button>
        </>
     );
}
 
export default Listing
