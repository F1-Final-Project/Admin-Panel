import React from 'react'
import Button from '@material-ui/core/Button/index'
import * as orderActions from '../../../store/actions/orders'
import { useDispatch } from 'react-redux'

export default function UpdateOrderButton(props) {
	const dispatch = useDispatch();
	const {order, onKitchen, completed, closeModal}=props;



	const updateOrder=()=>{
		closeModal();

		orderActions.updateOrder({
			// staff: order.staff,
			table: order.table,
			orderItems: order.orderItems,
			orderPrice: order.orderPrice,
			onKitchen: onKitchen,
			completed: completed,
		}, order._id)(dispatch)
	}

	return (
		<>
			<Button variant="outlined" color="primary" onClick={updateOrder}>UPDATE ORDER</Button>
		</>
	);
}