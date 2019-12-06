import React from 'react';
import Button from '@material-ui/core/Button/index';

export default function UpdateItemOrderButton(props) {

	return (
		<>
			<Button variant="outlined" onClick={props.handleClick}>UPDATE ITEM</Button>
		</>
	);
}