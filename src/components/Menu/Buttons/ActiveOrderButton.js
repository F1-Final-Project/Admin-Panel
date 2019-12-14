import Button from '@material-ui/core/Button/index'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as orderActions from '../../../store/actions/orders'

export default function ActiveOrderButton() {
	const dispatch= useDispatch();

	const {order} = useSelector(state =>
		({order: state.order.active})
	);

	const openOrder = () => {
		orderActions.openOrder({open: true, order: order})(dispatch);
	};

	return(
		<>{order?(
			<Button onClick={openOrder} > table#{order.table} order </Button>
			): null}
		</>
	)
}

