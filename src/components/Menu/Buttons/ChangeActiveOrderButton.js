import Badge from '@material-ui/core/Badge/Badge'
import Button from '@material-ui/core/Button/index'
import React, { useEffect } from 'react'
import * as orderActions from '../../../store/actions/orders';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem/index'
import Menu from '@material-ui/core/Menu/index'

export default()=> {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const {loaded, orders} = useSelector(state =>
		({orders: state.order.orders,
			loaded: state.order.loaded,
		})
	);

	const dispatch = useDispatch();

	useEffect(() => orderActions.getOrders()(dispatch), [])

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const changeOrder=(id)=>{
		orderActions.activeOrder(id)(dispatch);
	}

return(
	<>
	{loaded?(
		<>
	<Button aria-label="show orders" color="inherit" aria-haspopup="true" onClick={handleClick}>
		<Badge badgeContent={orders.length} color="secondary">
			orders
		</Badge>
	</Button>
	<Menu
		anchorEl={anchorEl}
		keepMounted
		open={Boolean(anchorEl)}
		onClose={handleClose}
	>
		{orders.map((item)=>
				<MenuItem  key={item._id} onClick={(()=>{handleClose(); changeOrder(item._id)})}  style={{overflowY: "visible"}}>
					перейти в заказ столик №  {item.table}
				</MenuItem>
			)}
	</Menu>
			</>)
		: null}
		</>
	)
}