import Base from './base';

export default class OrderAPI extends Base {
	getOrders() {
		return super.get(`orders`).then(res => res.data);
	}
	addOrder(order) {
		return super.post(`orders`, order).then(res => res.data);
	}
	deleteOrder(id){
		return super.delete(`orders/${id}`, id).then(res => res.data);
	}
	updateOrder(order, id){
		return super.put(`orders/${id}`, order).then(res => res.data);
	}
	getOrderById(id) {
		return super.get(`orders/${id}`).then(res => res.data);
	}
}