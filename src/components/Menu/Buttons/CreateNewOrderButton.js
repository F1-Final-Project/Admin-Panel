import React from 'react';
import Button from '@material-ui/core/Button/index';
import * as orderActions from '../../../store/actions/orders';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '@material-ui/core/Menu/index';
import MenuItem from '@material-ui/core/MenuItem/index';

export default function LoginButton() {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const tables=[1,3,7,8,12];
	const dispatch = useDispatch();

	const handleClick = (event) => {
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
				// staff:{},
			}
		)(dispatch);

	};

	return (
		<>
			<Button aria-controls="simple-menu" aria-haspopup="true" color="inherit" onClick={handleClick}>
				create new order
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={closeMenu}
			>
				{tables.map((item)=>
					<MenuItem  key={item} onClick={handleClose(item)}>create order table № {item}</MenuItem>
				)}
			</Menu>
		</>
	);
}