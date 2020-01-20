import React from 'react'
import ToKitchenOrderButton from '../Buttons/ToKitchenOrderButton'
import DeleteOrderButton from '../Buttons/DeleteOrderButton'
import CreateInvoiceButton from '../Buttons/CreateInvoiceButton'

export default function Index(props){
	const {order, closeModal, status} =props;


	return(
		<>
			{status==='new order'?(
				<>
					<ToKitchenOrderButton order={order} closeModal={closeModal}/>
					<DeleteOrderButton order={order._id} closeModal={closeModal}/>
				</>
				): status==='onKitchen'&&order.newOrderItems?(
					<>
						{order.newOrderItems.length>0?(
					<ToKitchenOrderButton order={order} closeModal={closeModal}/>
							): null}
					</>
					): status==='completed'?(
				<CreateInvoiceButton order={order}/>
			): null
		}
		</>
	)
}
