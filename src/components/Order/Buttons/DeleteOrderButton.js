import React from 'react'
import Button from '@material-ui/core/Button/index'
import * as orderActions from '../../../store/actions/orders'
import { useDispatch } from 'react-redux'
import useStyles from './style'

export default function DeleteOrderButton(props) {
	const dispatch = useDispatch();
	const classes = useStyles();

	const deleteOrder=()=>{
		props.closeModal();
		orderActions.deleteOrder(props.order)(dispatch);
	};

	return (
			<Button className={classes.button} variant="outlined" onClick={deleteOrder}>DELETE ORDER</Button>
	);
}