import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Order from './index'
import * as orderActions from '../../store/actions/orders'

const useStyles = makeStyles(theme => ({
	wrap:{
		paddingTop: 60,
	},
	table:{
		padding: 60,
		textAlign: 'center',
		margin: 30,
		height: 200,
		width: 200,
	},
	taken:{
		backgroundColor: 'lightgrey',
		color: 'grey',
	}
}));

export default function AllOrders() {
	const {orders} = useSelector(state =>
		({orders: state.order.orders})
	);
	const classes = useStyles();
	const dispatch= useDispatch();
	const tables=[1,2,3,4,5,6,7,8];

	const [open, setOpen] = React.useState(true);
	const [order, setOrder] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const showOrder=(thisOrder)=>{
		orderActions.activeOrder(thisOrder._id)(dispatch);
		setOpen(true);
		setOrder(thisOrder);
	};

	const createNewOrder=(table)=>{
		alert('create new order')
	}

	return (
		<Grid container className={classes.wrap} justify="center">
			{tables.map(item=>
			<>
				{(orders.filter((order) => order.table === item).length>0) ?(
					<Paper className={`${classes.table} ${classes.taken}`} onClick={()=>showOrder(orders.filter((order) => order.table === item)[0])}>
						<Typography variant="h5" component="h3">
							table # {item}
						</Typography>
						<Typography component="p">
							taken
						</Typography>
					</Paper>
				):
					(<Paper className={classes.table} onClick={()=>createNewOrder(item)}>
				<Typography variant="h5" component="h3">
					table # {item}
				</Typography>
				<Typography component="p">
					empty
				</Typography>
			</Paper>)
				}
				</>
			)}
			<Order handleClose={handleClose} isOpen={open} order={order}/>
		</Grid>
	);
}