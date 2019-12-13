import Badge from '@material-ui/core/Badge/Badge'
import Button from '@material-ui/core/Button/index'
import React, { useEffect } from 'react'
import * as orderActions from '../../../store/actions/orders'
import { useDispatch, useSelector } from 'react-redux'
import MenuItem from '@material-ui/core/MenuItem/index'
import Menu from '@material-ui/core/Menu/index'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'

export default function ChangeActiveOrderButton(){
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [open, setOpen] = React.useState(false);
	const [table, setTable] = React.useState(false);

	const {orders} = useSelector(state =>
		({orders: state.order.orders})
	);
	const dispatch = useDispatch();

	useEffect(() => {orderActions.getOrders()(dispatch)}, []);

	useEffect(() => {
		if(orders.length>0){
			orders.sort((a,b)=>{
				return (new Date(b.updated_at||b.created_at).getTime())-(new Date(a.updated_at||a.created_at).getTime())
			});
			orderActions.activeOrder(orders[0])(dispatch);
		}
	}, [orders]);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const changeOrder=(order)=>{
		orderActions.activeOrder(order)(dispatch);
		setTable(order.table);
		setOpen(true);
		setTimeout(()=>setOpen(false), 1800);
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
					{ (orders.filter(item=> item.completed)).length>0?
						(<Snackbar
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							style={{marginTop: 70}}
							open={true}
						>
							<SnackbarContent
								style={{backgroundColor: 'green'}}
								message={<span id="message-id">You have completed orders</span>}
							/>
						</Snackbar>): null}
						<Snackbar style={{marginTop: 25}}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={open}
							message={<span id="message-id">You switched to  order table # {table}</span>}
						/>
						<Menu
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							{orders.map((item)=>
								<MenuItem  key={item._id} onClick={(()=>{handleClose(); changeOrder(item)})}  style={{overflowY: "visible"}}>
									go to order table №  {item.table}
								</MenuItem>
							)}
						</Menu>
					</>)
				: null}
		</>
	)
}