import React from 'react';
import Button from '@material-ui/core/Button/index';
import * as orderActions from '../../../store/actions/orders';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '@material-ui/core/Menu/index';
import MenuItem from '@material-ui/core/MenuItem/index';
import Snackbar from '@material-ui/core/Snackbar'

export default function LoginButton() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [open, setOpen] = React.useState(false);
	const [table, setTable] = React.useState(false);

	const tables=[1,2,3,4,5,6,7,8];
	const dispatch = useDispatch();

	const openTables = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const closeMenu=()=>{
		setAnchorEl(null);
	}

	const handleClose =(item)=> (event) => {
		closeMenu();
		orderActions.addOrder(
			{
				orderPrice: 0,
				onKitchen: false,
				completed: false,
				table: +(item),
				orderItems: [],
				newOrderItems: [],
				// staff:{},
			}
		)(dispatch);

		setTable(item);
		setOpen(true);
		setTimeout(()=>setOpen(false), 1800)
	};

	return (
		<>
			<Button aria-controls="simple-menu" aria-haspopup="true" color="inherit" onClick={openTables}>
				create new order
			</Button>
			<Snackbar style={{marginTop: 25}}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={open}
				message={<span id="message-id">New order table # {table} was created</span>}
			/>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={closeMenu}
			>
				{tables.map((item)=>
					<>
					<MenuItem  key={item} onClick={handleClose(item)}>create order table № {item}</MenuItem>
					</>
				)}
			</Menu>

		</>
	);
}