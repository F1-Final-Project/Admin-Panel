import Button from '@material-ui/core/Button/index'
import React from 'react'
import { useSelector } from 'react-redux'
import Order from '../../Order'

export default function ActiveOrderButton() {

	const {activeOrder} = useSelector(state =>
		({activeOrder: state.order.active})
	);

	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		activeOrder? setOpen(true): alert('Choose the order');
	};

	const handleClose = () => {
		setOpen(false);
	};

	return(
		<>
			<Button color = "inherit" onClick={handleOpen} > details of this order </Button>
			<Order handleClose={handleClose} open={open} />
		</>
	)
}

