import React from 'react'
import Button from '@material-ui/core/Button/index'
import useStyles from './style'

export default function UpdateItemOrderButton(props) {
	const classes = useStyles();

	return (
			<Button className={`${classes.button} ${classes.buttonSize}`} variant="outlined" onClick={props.submitItemChange}>UPDATE DISH</Button>
	);
}