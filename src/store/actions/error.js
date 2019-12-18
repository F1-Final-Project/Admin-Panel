import * as ERROR from "../constants/error";

export function openError(payload){
    return function (dispatch) {
        dispatch({
            type: ERROR.ERROR_OPEN,
            data: payload,
        });
    };
}