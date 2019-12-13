import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import OrderItems from './OrderItems'
import OrderControl from './OrderControl'
import Grid from '@material-ui/core/Grid'
import { useSelector, useDispatch } from 'react-redux'
import * as orderActions from '../../store/actions/orders'

const useStyles = makeStyles(theme => ({
	paper: {
		position: 'absolute',
		marginTop: '2%',
		marginLeft: '10%',
		width: '80%',
		maxHeight: '96%',
		overflow: 'auto',
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

export default function Order() {
	const {order, open} = useSelector(state =>
		({order: state.order.modal.order,
			open: state.order.modal.open})
	);

	const classes = useStyles();
	const dispatch = useDispatch();

	const closeModal=()=>{
		orderActions.openOrder({open: false, order: null})(dispatch);
	};

	useEffect(()=> {return ()=> closeModal()},[]);

	let status;
	if(order){
		if(order.completed){status='completed'}else if(order.onKitchen){status='onKitchen'}else{status='new order'}
	}

	return (
		<>
			{order?(
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={open}
					onClose={closeModal}
				>
					<div key={order._id} className={classes.paper}>
						<h2 id="simple-modal-title">status: {status}</h2>
						<Grid container justify="space-between">
							<h2 id="simple-modal-title">table# {order.table}</h2>
							<h2 id="simple-modal-title">staff: {order.staff}</h2>
						</Grid>
						<OrderItems order={order} status={status}/>
						<h2  id="simple-modal-title">ORDER PRICE: {order.orderPrice} $</h2>
						<OrderControl order={order} status={status} closeModal={closeModal}/>
					</div>
				</Modal>
			): null}
		</>
	);
}