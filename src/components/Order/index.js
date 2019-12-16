import React, { useEffect } from 'react'
import useStyles from './style'
import OrderItems from './OrderItems'
import OrderControl from './OrderControl'
import Grid from '@material-ui/core/Grid'
import { useSelector, useDispatch } from 'react-redux'
import * as orderActions from '../../store/actions/orders'
import Box from '@material-ui/core/Box'
import DialogActions from '@material-ui/core/DialogActions'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

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
				<Dialog
					open={open}
					onClose={closeModal}
					fullWidth='true'
					maxWidth='md'
				><Box className={classes.box} border={1} borderColor='#7a6c5b' borderRadius={3} >
					<DialogContent >
						<h2 > status: {status}</h2>
						<Grid container justify="space-between">
							<h2 className={classes.table} >table# {order.table}</h2>
							<h2 >staff: {order.staff}</h2>
						</Grid>
						<OrderItems order={order} status={status}/>
						<h2  id="simple-modal-title">ORDER PRICE: {order.orderPrice} $</h2>
					</DialogContent>
					<DialogActions >
						<OrderControl order={order} status={status} closeModal={closeModal}/>
					</DialogActions>
				</Box>
				</Dialog>
			): null}
		</>
	);
}