import React from 'react'
import { useDispatch } from 'react-redux'
import OrderItem from './OrderDish'
import * as orderActions from '../../store/actions/orders'

export default function OrderItems(props) {
	const order=props.thisOrder;
	const dispatch=useDispatch();

	const updateOrderItemChange=(dish)=>{

		order.orderItems=order.orderItems.map(item=>{
			if(item.title === dish.title){
				return dish
			}
			return item
		})

		orderActions.updateOrder({
			// staff: order.staff,
			table: order.table,
			orderPrice: order.orderPrice,
			onKitchen: order.onKitchen,
			completed: order.completed,
			orderItems: order.orderItems,
		}, order._id)(dispatch);
	}

	return (
		<>{order?(
			<div>
				{(order.orderItems).map((item, index)=>
					<OrderItem item={item}  key={index} index={index} order={order} updateOrderItemChange={updateOrderItemChange}/>
				)}
			</div>
		): null
		}</>
	);
}