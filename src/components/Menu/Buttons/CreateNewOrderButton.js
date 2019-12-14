import React from 'react'
import Button from '@material-ui/core/Button/index'
import Menu from '@material-ui/core/Menu/index'
import MenuItem from '@material-ui/core/MenuItem/index'
import { useSelector } from 'react-redux'

export default function CreateNewOrderButton(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const tables=[1,2,3,4,5,6,7,8];

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
			<Button aria-controls="simple-menu" aria-haspopup="true" color="inherit" onClick={openTables}>
				new order
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={closeMenu}
			>
				{tables.map(item=>
					<div key={item}>
						{(orders.filter((order) => order.table === item).length>0) ?(
					<MenuItem style={{color: 'lightgrey', cursor: 'default'}} onClick={()=> alert('this table is taken')}>create order table № {item}</MenuItem>
						):(
							<MenuItem onClick={createOrder(item)}>create order table № {item}</MenuItem>
						)}
					</div>
				)}
			</Menu>
		</>
	);
}