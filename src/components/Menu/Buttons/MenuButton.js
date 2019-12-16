import Typography from '@material-ui/core/Typography'
import React from 'react'
import {useStyles} from './style'

export default function MenuButton(props) {
	const classes = useStyles();
	const {onMenuClick, setView}=props;

	const showMenu=()=>{
		setView('dishes');
		onMenuClick();
	};

	return(
		<Typography onClick={showMenu} variant="h6" noWrap className={classes.titleMenu}>
						<span  className={classes.spanMenu}>MENU</span>
		</Typography>
	)
}