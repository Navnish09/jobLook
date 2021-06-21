import * as actionKeys from "../actionKeys";
import { userRegisterAction, errorAlertAction, hideAlertAction, successAlertAction } from "../actions/alertActions";

export const successAlert = (dispatch, message, alertType) => {
    dispatch(successAlertAction(message,alertType));
}

export const errorAlert = (dispatch, message) => {
    dispatch(errorAlertAction(message));
}

export const hideAlert = (dispatch) => {
    dispatch(hideAlertAction());
}