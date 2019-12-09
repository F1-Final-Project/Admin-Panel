import Button from '@material-ui/core/Button/index'
import React from 'react'
import { useSelector } from 'react-redux'
import Order from '../../Order'

export default function ActiveOrderButton() {

	const [open, setOpen] = React.useState(false);

	const {activeOrder, orders} = useSelector(state =>
		({activeOrder: state.order.active,
			orders: state.order.orders})
	);
	const thisOrder = orders.find((item) => item._id === activeOrder);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return(
		<>{thisOrder?(
			<>
			<Button onClick={handleOpen} > table № {thisOrder.table} order details </Button>
			<Order key={thisOrder._id} handleClose={handleClose} isOpen={open} order={thisOrder}/>
			</>
			): null}
		</>
	)
}

