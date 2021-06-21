import * as actionKeys from "../actionKeys";

export const loginAction = (authInfo, userInfo) => (
    {
        type: actionKeys.LOGIN_USER,
        payload: {
            authInfo,
            userInfo
        }
    }
);

export const setUserAction = (userInfo) => (
    { 
        type: actionKeys.SET_USER_DATA,
        payload: {
            userInfo
        }
    }
)


export const logOutAction = () => (
    {
        type: actionKeys.LOGOUT_USER
    }
)