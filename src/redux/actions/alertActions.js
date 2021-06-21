import * as actionKeys from "../actionKeys";

export const errorAlertAction = (message) => (
    {
        type: actionKeys.ERROR_ALERT,
        payload: {
            message,
            alertType: "error"
        }
    }
)

export const successAlertAction = (message) => (
    {
        type: actionKeys.SUCCESS_ALERT,
        payload: {
            message,
            alertType: "success"
        }
    }
)

export const hideAlertAction = () => (
    {
        type: actionKeys.HIDE_ALERT,
    }
)