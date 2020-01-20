import * as ALERT from "../constants/alert";

export function openAlert(payload){
    return function (dispatch) {
        dispatch({
            type: ALERT.ALERT_OPEN,
            data: payload,
        });
    };
}
