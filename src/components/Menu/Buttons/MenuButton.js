import Typography from '@material-ui/core/Typography'
import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	span:{
		cursor: 'pointer'
	},
	title: {
		flexGrow: 1,
	},
}));

export default function MenuButton(props) {
	const classes = useStyles();
	const {onMenuClick}=props;

	return(
		<Typography onClick={onMenuClick} variant="h6" noWrap className={classes.title}>
						<span  className={classes.span}>
						MENU
						</span>
		</Typography>
	)
}