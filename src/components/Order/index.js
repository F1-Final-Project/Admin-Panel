import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Order from './OrderItems'
import { useSelector } from 'react-redux'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import DeleteOrderButton from './Buttons/DeleteOrderButton'

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
	const classes = useStyles();

	const {activeOrder, orders} = useSelector(state =>
		({activeOrder: state.order.active,
			orders: state.order.orders})
	);

	const thisOrder = orders.find((item) => item._id === activeOrder);

	return (
		<>
			{thisOrder?(
			<Modal
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={props.open}
				onClose={props.handleClose}
			>

				<div className={classes.paper}>
					<h2   id="simple-modal-title">STAFF: {thisOrder.staff}</h2>
					<h2  id="simple-modal-title">table# {thisOrder.table}</h2>
					<Order thisOrder={thisOrder}/>
					<h2  id="simple-modal-title">ORDER PRICE: {thisOrder.orderPrice}</h2>
					<div>
						<FormControlLabel
							control={
								<Switch
									value={thisOrder.onKitchen}
									color="primary"
								/>
							}
							label="onKitchen"
						/>
						<FormControlLabel
							control={
								<Switch
									value={thisOrder.completed}
									color="primary"
								/>
							}
							label="completed"
						/>
					</div>
					<Button variant="outlined" color="primary">UPDATE ORDER</Button>
					<DeleteOrderButton order={thisOrder._id}/>
				</div>
			</Modal>
				): null}
		</>
	);
}