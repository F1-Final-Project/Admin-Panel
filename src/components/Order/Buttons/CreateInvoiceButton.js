import React from 'react'
import Button from '@material-ui/core/Button/index'
import { useDispatch } from 'react-redux'
import * as invoiceActions from '../../../store/actions/invoices'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import * as orderActions from '../../../store/actions/orders'

export default function CreateInvoiceButton(props) {
	const dispatch = useDispatch();

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
			<Button variant="contained" onClick={openDialog}>create invoice</Button>
			<Dialog
				open={open}
				onClose={closeDialog}
			>
				<DialogTitle>Choose payment method</DialogTitle>
				<DialogActions>
					<Button onClick={createInvoice} color="primary">
						cash
					</Button>
					<Button onClick={createInvoice} color="primary" autoFocus>
						card
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}