import Badge from '@material-ui/core/Badge/Badge'
import React, { useEffect } from 'react'
import * as orderActions from '../../../store/actions/orders'
import { useDispatch, useSelector } from 'react-redux'
import MenuItem from '@material-ui/core/MenuItem/index'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import Box from '@material-ui/core/Box'
import {useStyles, ColorMenu, ColorButton} from './style'

export default function ChangeActiveOrderButton(){
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [open, setOpen] = React.useState(false);
	const [table, setTable] = React.useState(false);
	const classes=useStyles();

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
		setTimeout(()=>setOpen(false), 2200);
	}

	return(
		<>
			{orders.length>0?(
				<>
					<ColorButton aria-label="show orders" aria-haspopup="true" onClick={handleClick}>
						<Badge badgeContent={orders.length} color='default'>
							orders
						</Badge>
					</ColorButton>
					{ (orders.filter(item=> item.completed)).length>0?
						(<Snackbar
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'right',
							}}
							open={true}
							className={classes.completed}
						>
							<SnackbarContent
								className={classes.snackbarContent}
								message={<span id="message-id">You have completed orders</span>}
							/>
						</Snackbar>): null}
						<Snackbar
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							className={classes.snackbar}
							open={open}>
						<SnackbarContent
							className={classes.snackbarContent}
							message={<span id="message-id">You switched to  order table # {table}</span>}
							/>
						</Snackbar>
						<ColorMenu
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleClose}
							>
						<Box border={1} borderColor='#7a6c5b' borderRadius={3} className={classes.menu}>
							{orders.map((item)=>
								<MenuItem   key={item._id} onClick={(()=>{handleClose(); changeOrder(item)})}  className={classes.menuItem} >
									go to order table №  {item.table}
								</MenuItem>
							)}
						</Box>
						</ColorMenu>
					</>)
				: null}
		</>
	)
}