import React from 'react'
import Button from '@material-ui/core/Button/index'
import MenuItem from '@material-ui/core/MenuItem/index'
import { useSelector } from 'react-redux'
import {useStyles, ColorMenu, ColorButton} from './style'
import Box from '@material-ui/core/Box'

export default function CreateNewOrderButton(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const classes=useStyles();

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
					<MenuItem className={classes.menuTaken} onClick={()=> alert('this table is taken')}>create order table № {item}</MenuItem>
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