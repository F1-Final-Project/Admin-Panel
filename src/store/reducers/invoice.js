import * as INVOICE from '../constants/invoices';

const initState = {
	invoices: [],
	loaded: false,
};

export default function (state = initState, action) {

	switch (action.type) {

		case INVOICE.INVOICE_REQUEST_SENT:
			return {
				...state,
				...{
					loaded : false,
				}
			};

		case INVOICE.INVOICE_FETCH:
			return {
				...state,
				...{
					invoices: action.data,
					loaded: true,
				}
			};

		case INVOICE.INVOICE_ADD:
			return {
				...state,
				...{
					invoices : [...state.invoices, ...[action.data]],
					loaded : true,
				}
			};

		case INVOICE.INVOICE_DELETE:
			const afterDeleteInvoices = state.invoices.filter(invoice => {
				return invoice._id !== action.data
			});
			return {
				...state,
				...{
					invoices : afterDeleteInvoices,
					loaded : true,
				}
			};

		case INVOICE.INVOICE_UPDATE:
			const afterUpdate = state.invoices.map(invoice => {
				if(invoice._id === action.data._id){
					return action.data
				}
				return invoice
			});
			return{
				...state,
				...{
					invoices : afterUpdate,
					loaded : true
				}
			};
		default:
			return state
	}
}