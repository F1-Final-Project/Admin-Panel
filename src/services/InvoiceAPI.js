import Base from './base';

export default class InvoiceAPI extends Base {
	getInvoices() {
		return super.get(`invoices`).then(res => res.data);
	}
	addInvoice(order) {
		return super.post(`invoices`, order).then(res => res.data);
	}
	deleteInvoice(id){
		return super.delete(`invoices/${id}`, id).then(res => res.data);
	}
	updateInvoice(order, id){
		return super.put(`invoices/${id}`, order).then(res => res.data);
	}
	getInvoiceById(id) {
		return super.get(`invoices/${id}`).then(res => res.data);
	}
}