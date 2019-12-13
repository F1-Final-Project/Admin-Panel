import React from 'react'
import Button from '@material-ui/core/Button/index'

export default function UpdateItemOrderButton(props) {

	return (
			<Button variant="outlined" style={{height: 40, width: 125}} color="primary" onClick={props.submitItemChange}>UPDATE DISH</Button>
	);
}