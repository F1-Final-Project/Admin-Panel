import React from 'react';
import Button from '@material-ui/core/Button/index';
import { useDispatch } from 'react-redux'
import * as invoiceActions from '../../../store/actions/invoices'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as orderActions from '../../../store/actions/orders'

export default function CreateInvoiceButton(props) {
	const dispatch = useDispatch();

	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = (event) => {
		setOpen(false);

		const data={
			invoiceItems: props.order.orderItems,
			invoicePrice: props.order.orderPrice,
			// staff: props.order.staff,
			paymentMethod: event.target.innerText,
		}

		invoiceActions.addInvoice(data)(dispatch);

		orderActions.deleteOrder(props.order._id)(dispatch)

	};

	return (
		<>
			<Button variant="contained" onClick={handleOpen}>create invoice</Button>
			<Dialog
				open={open}
				onClose={handleClose}
			>
				<DialogTitle>Choose payment method</DialogTitle>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						cash
					</Button>
					<Button onClick={handleClose} color="primary" autoFocus>
						card
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}