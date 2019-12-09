import Badge from '@material-ui/core/Badge/Badge'
import Button from '@material-ui/core/Button/index'
import React, { useEffect } from 'react'
import * as orderActions from '../../../store/actions/orders';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem/index'
import Menu from '@material-ui/core/Menu/index'

export default()=> {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const {orders} = useSelector(state =>
		({orders: state.order.orders,
		})
	);
	const dispatch = useDispatch();

	useEffect(() => {orderActions.getOrders()(dispatch)}, []);


	useEffect(() => {
		if(orders.length>0){
			orders.sort((a,b)=>{
				return (new Date(b.updated_at||b.created_at).getTime())-(new Date(a.updated_at||a.created_at).getTime())
			});
			orderActions.activeOrder(orders[0]._id)(dispatch);
		}
	}, [orders]);

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
			{orders.length>0?(
					<>
						<Button aria-label="show orders" color="inherit" aria-haspopup="true" onClick={handleClick}>
							<Badge badgeContent={orders.length} color="primary">
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
									go to order table №  {item.table}
								</MenuItem>
							)}
						</Menu>
					</>)
				: null}
		</>
	)
}