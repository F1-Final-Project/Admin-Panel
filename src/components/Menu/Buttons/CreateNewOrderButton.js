import React from 'react'
import MenuItem from '@material-ui/core/MenuItem/index'
import { useSelector, useDispatch} from 'react-redux'
import {useStyles, ColorMenu, ColorButton} from './style'
import Box from '@material-ui/core/Box'
import * as alertActions from "../../../store/actions/alert";

export default function CreateNewOrderButton(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const classes=useStyles();
	const dispatch=useDispatch();

	const tables=[1,2,3,4,5,6,7,8,9,10];

	const {orders} = useSelector(state =>
		({orders: state.order.orders})
	);

	const openTables = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const closeMenu=()=>{
		setAnchorEl(null);
	};

	const showAlert=()=>{
		alertActions.openAlert({open: true, message: 'this table is taken'})(dispatch)
	};

	const createOrder =(item)=> (event) => {
		closeMenu();
		props.createNewOrder(item);
	};

	return (
		<>
			<ColorButton aria-controls="simple-menu" aria-haspopup="true" onClick={openTables}>
				new order
			</ColorButton>
			<ColorMenu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={closeMenu}
			>
				<Box border={1} borderColor='#7a6c5b' borderRadius={3} className={classes.menu}>
				{tables.map(item=>
					<div key={item}>
						{(orders.filter((order) => order.table === item).length>0) ?(
					<MenuItem className={classes.menuTaken} onClick={showAlert}>create order table № {item}</MenuItem>
						):(
							<MenuItem className={classes.menuNew} onClick={createOrder(item)}>create order table № {item}</MenuItem>
						)}
					</div>
				)}
				</Box>
			</ColorMenu>
		</>
	);
}