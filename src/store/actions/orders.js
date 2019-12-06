import * as ORDER from "../constants/orders";
import OrderAPI from "../../services/OrderAPI";

export function getOrders() {
	return function (dispatch) {
		dispatch({
			type: ORDER.ORDER_REQUEST_SENT
		});
		(new OrderAPI()).getOrders().then(res => {
			return dispatch({
				type: ORDER.ORDER_FETCH,
				data: res
			});
		});
	};
}
export function addOrder(payload){
	return function (dispatch) {
		dispatch({
			type: ORDER.ORDER_REQUEST_SENT
		});
		(new OrderAPI()).addOrder(payload)
			.then(res => {
			return dispatch({
				type: ORDER.ORDER_ADD,
				data: res,
			});
		})
	};
}
export function deleteOrder(id){
	return function (dispatch) {
		dispatch({
			type: ORDER.ORDER_REQUEST_SENT
		});
		(new OrderAPI()).deleteOrder(id).then(res => {
			return dispatch({
				type: ORDER.ORDER_DELETE,
				data: res,
			});
		})
	};
}
export function updateOrder(payload, id){
	return function (dispatch) {
		dispatch({
			type: ORDER.ORDER_REQUEST_SENT
		});
		(new OrderAPI()).updateOrder(payload, id).then(res => {
			return dispatch({
				type: ORDER.ORDER_UPDATE,
				data: res[0]
			});
		})
	};
}
export function activeOrder(id){
	return function (dispatch) {
		dispatch({
			type: ORDER.ORDER_ACTIVE,
			data: id,
		});
	};
}