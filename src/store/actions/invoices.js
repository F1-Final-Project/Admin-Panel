import * as INVOICE from "../constants/invoices";
import InvoiceAPI from "../../services/InvoiceAPI";

export function getInvoices() {
	return function (dispatch) {
		dispatch({
			type: INVOICE.INVOICE_REQUEST_SENT
		});
		(new InvoiceAPI()).getInvoices().then(res => {
			return dispatch({
				type: INVOICE.INVOICE_FETCH,
				data: res
			});
		});
	};
}
export function addInvoice(payload){
	return function (dispatch) {
		dispatch({
			type: INVOICE.INVOICE_REQUEST_SENT
		});
		(new InvoiceAPI()).addInvoice(payload)
			.then(res => {
				return dispatch({
					type: INVOICE.INVOICE_ADD,
					data: res,
				});
			})
	};
}
export function deleteInvoice(id){
	return function (dispatch) {
		dispatch({
			type: INVOICE.INVOICE_REQUEST_SENT
		});
		(new InvoiceAPI()).deleteInvoice(id).then(res => {
			return dispatch({
				type: INVOICE.INVOICE_DELETE,
				data: res,
			});
		})
	};
}
export function updateInvoice(payload, id){
	return function (dispatch) {
		dispatch({
			type: INVOICE.INVOICE_REQUEST_SENT
		});
		(new InvoiceAPI()).updateInvoice(payload, id).then(res => {
			return dispatch({
				type: INVOICE.INVOICE_UPDATE,
				data: res,
			});
		})
	};
}
