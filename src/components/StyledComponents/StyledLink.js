import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
    text-decoration : ${prop => prop.$underline ? 'underline' : 'none'};
    color : ${p => p.color ? p.color : "black"}
` 
 
export default StyledLink;