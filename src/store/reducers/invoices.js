import * as INVOICES from '../constants/invoices'

export const initState = {
	products: [],
	loaded: false,
}

export default function(state = initState, action) {

	switch (action.type) {
		case INVOICES.INVOICE_REQUEST_SENT:
			return { ...state }

		case INVOICES.INVOICE_FETCH:

			return {
				...state,
				...{
					products: action.data,
					loaded: true,
				},
			}

		default:
			return state
	}

};
