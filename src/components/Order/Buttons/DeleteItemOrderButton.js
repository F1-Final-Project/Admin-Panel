import React from 'react'
import Button from '@material-ui/core/Button/index'
import * as orderActions from '../../../store/actions/orders'
import { useDispatch } from 'react-redux'

export default function DeleteItemOrderButton(props) {
	const dispatch = useDispatch();
	const {order, item}=props;

	const deleteDish=(event)=>{
		event.stopPropagation();

		if(!order.newOrderItems||order.newOrderItems&&!order.newOrderItems.length>0) {
			const index = order.orderItems.indexOf(item);
			order.orderItems.splice(index, 1);
		};

		if(order.newOrderItems){
			if(order.newOrderItems.length>0){
				const i = order.newOrderItems.indexOf(item);
				order.newOrderItems.splice(i, 1)
			}
		};

		order.orderPrice= +(order.orderPrice)- +(item.price);

		orderActions.updateOrder({
			// staff: order.staff,
			table: order.table,
			newOrderItems: order.newOrderItems,
			orderItems: order.orderItems,
			orderPrice: order.orderPrice,
			onKitchen: order.onKitchen,
			completed: order.completed,
		}, order._id)(dispatch)
	};

	return (
			<Button variant="outlined" onClick={deleteDish}>DELETE ITEM</Button>
	);
}