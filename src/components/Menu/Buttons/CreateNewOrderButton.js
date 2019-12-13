import React from 'react'
import Button from '@material-ui/core/Button/index'
import Menu from '@material-ui/core/Menu/index'
import MenuItem from '@material-ui/core/MenuItem/index'
import Snackbar from '@material-ui/core/Snackbar'

export default function CreateNewOrderButton(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [open, setOpen] = React.useState(false);
	const [table, setTable] = React.useState(false);

	const tables=[1,2,3,4,5,6,7,8];

	const openTables = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const closeMenu=()=>{
		setAnchorEl(null);
	};

	const createOrder =(item)=> (event) => {
		closeMenu();
		props.createNewOrder(item);
		setTable(item);
		setOpen(true);
		setTimeout(()=>setOpen(false), 1800);
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
					<div key={item} >
					<MenuItem onClick={createOrder(item)}>create order table № {item}</MenuItem>
					</div>
				)}
			</Menu>
		</>
	);
}