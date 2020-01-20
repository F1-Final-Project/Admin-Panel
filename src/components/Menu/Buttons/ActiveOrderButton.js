import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as orderActions from '../../../store/actions/orders'
import {ColorButton} from './style'

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
			<ColorButton onClick={openOrder} >order#{order.table}</ColorButton>
			): null}
		</>
	)
}

