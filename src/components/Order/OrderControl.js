import React, { useState } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import UpdateOrderButton from './Buttons/UpdateOrderButton'
import DeleteOrderButton from './Buttons/DeleteOrderButton'
import CreateInvoiceButton from './Buttons/CreateInvoiceButton'
import Grid from '@material-ui/core/Grid'

export default function OrderControl(props){
	const {order, closeModal} =props;
	const [OnKitchen, setOnKitchen]=React.useState(order.onKitchen);
	const [Completed, setCompleted]=React.useState(order.completed);

	const changeStatus=(event)=>{
		if(event.target.value==="onKitchen"){
		setOnKitchen(!OnKitchen)}else{
			setCompleted(!Completed)
		}
	}

	const checkbox=(value, name)=> {
		if (value) {
			return (
				<FormControlLabel
					control={
						<Switch
							defaultChecked
							value={name}
							color="primary"
							onChange={changeStatus}
						/>
					}
					label={name}
				/>
			)
		} else {
			return (
				<FormControlLabel
					control={
						<Switch
							value={name}
							color="primary"
							onChange={changeStatus}
						/>
					}
					label={name}
				/>
			)
		}
	}

	return(
		<>
		<div>
			{checkbox(OnKitchen, "onKitchen")}
			{checkbox(Completed, "completed")}
		</div>
			<Grid
				container
				justify="space-between"
			>
		<div>
			<UpdateOrderButton order={order} onKitchen={OnKitchen} completed={Completed} closeModal={closeModal}/>
			<DeleteOrderButton order={order._id}/>
		</div>
			{Completed?(
				<CreateInvoiceButton order={order}/>
				): null}
			</Grid>
		</>
	)
}
