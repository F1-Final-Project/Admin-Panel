import * as ALERT from '../constants/alert';

const initState = {
    alert:{open:false, message: null},
};

export default function (state = initState, action) {

    switch (action.type) {

        case ALERT.ALERT_OPEN:
            return {
                ...state,
                ...{
                    alert: action.data,
                }
            };

        default:
            return state
    }
}