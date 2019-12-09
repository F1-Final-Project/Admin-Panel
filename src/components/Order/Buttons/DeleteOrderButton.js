import React from 'react';
import Button from '@material-ui/core/Button/index';
import * as orderActions from '../../../store/actions/orders';
import { useDispatch } from 'react-redux';


export default function DeleteOrderButton(props) {
	const dispatch = useDispatch();

	const handleClick=()=>{
		orderActions.deleteOrder(props.order)(dispatch)
	}
	return (
		<>
			<Button variant="outlined" onClick={handleClick}>
				DELETE ORDER
			</Button>
		</>
	);
}