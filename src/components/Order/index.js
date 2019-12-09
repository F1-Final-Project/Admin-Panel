import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Order from './OrderItems'
import OrderControl from './OrderControl'

const useStyles = makeStyles(theme => ({
	paper: {
		position: 'absolute',
		marginTop: '5%',
		marginLeft: '15%',
		width: '70%',
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

export default function Index(props) {
	const order=props.order;
	const classes = useStyles();

	useEffect(()=> {return ()=>props.handleClose()},[])

	return (
		<>
			{order?(
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={props.isOpen}
					onClose={props.handleClose}
				>

					<div key={order._id} className={classes.paper}>
						<h2   id="simple-modal-title">STAFF: {order.staff}</h2>
						<h2  id="simple-modal-title">table# {order.table}</h2>
						<Order thisOrder={order}/>
						<h2  id="simple-modal-title">ORDER PRICE: {order.orderPrice}</h2>
						<OrderControl order={order} closeModal={props.handleClose}/>
					</div>
				</Modal>
			): null}
		</>
	);
}