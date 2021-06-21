import { Alert } from "@material-ui/lab";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";

const pop = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const StyledAlert = styled(Alert)`
    width: 20%;
    position: absolute;
    right: 8%;
    top: 5%;
    animation : ${pop} 300ms linear forwards
`
 
export default StyledAlert;