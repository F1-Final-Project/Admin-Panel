import React from 'react'
import Button from '@material-ui/core/Button/index'
import * as orderActions from '../../../store/actions/orders'
import { useDispatch } from 'react-redux'

export default function ToKitchenOrderButton(props) {
	const dispatch = useDispatch();
	const {order, closeModal}=props;

	const toKitchenOrder=()=> {
		if (order.orderItems && order.orderItems.length > 0) {
			closeModal();

			if (order.newOrderItems) {
				order.orderItems = order.orderItems.concat(order.newOrderItems);
				order.newOrderItems = [];
			}
			orderActions.updateOrder({
				// staff: order.staff,
				table: order.table,
				orderItems: order.orderItems,
				newOrderItems: [],
				orderPrice: order.orderPrice,
				onKitchen: true,
				completed: false,
			}, order._id)(dispatch)
		} else {alert('there are no dishes in the order')}
	};

	return (
			<Button variant="outlined" color="primary" onClick={toKitchenOrder}>TO KITCHEN</Button>
	);
}