import * as ERROR from '../constants/error';

const initState = {
    error:{open:false, message: null},
};

export default function (state = initState, action) {

    switch (action.type) {

        case ERROR.ERROR_OPEN:
            return {
                ...state,
                ...{
                    error: action.data,
                }
            };

        default:
            return state
    }
}