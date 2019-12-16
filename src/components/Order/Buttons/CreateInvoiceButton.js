import React from 'react'
import Button from '@material-ui/core/Button/index'
import { useDispatch } from 'react-redux'
import * as invoiceActions from '../../../store/actions/invoices'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import * as orderActions from '../../../store/actions/orders'
import useStyles from './style'
import Box from '@material-ui/core/Box'

export default function CreateInvoiceButton(props) {
	const dispatch = useDispatch();
	const classes = useStyles();

	const [open, setOpen] = React.useState(false);

	const openDialog = () => {
		setOpen(true);
	};

	const closeDialog = () => {
		setOpen(false);
	};

	const createInvoice = (event) => {
		orderActions.openOrder({open: false, order: null})(dispatch);

		const data={
			invoiceItems: props.order.orderItems,
			invoicePrice: props.order.orderPrice,
			// staff: props.order.staff,
			paymentMethod: event.target.innerText,
		};

		invoiceActions.addInvoice(data)(dispatch);
		orderActions.deleteOrder(props.order._id)(dispatch);
	};

	return (
		<>
			<Button className={classes.button} variant="outlined" onClick={openDialog}>create invoice</Button>
			<Dialog
				open={open}
				onClose={closeDialog}
			>
				<Box border={1} borderColor='#7a6c5b' borderRadius={3} className={classes.dialog}>
				<DialogTitle >Choose payment method</DialogTitle>
				<DialogActions >
					<Button className={classes.button} variant="outlined" onClick={createInvoice}>
						cash
					</Button>
					<Button className={classes.button} variant="outlined" onClick={createInvoice}>
						card
					</Button>
				</DialogActions>
			</Box>
			</Dialog>
		</>
	);
}