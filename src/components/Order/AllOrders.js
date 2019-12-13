import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import * as orderActions from '../../store/actions/orders'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'

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

export default function AllOrders(props) {
	const {createNewOrder}=props;
	const {orders} = useSelector(state =>
		({orders: state.order.orders})
	);
	const classes = useStyles();
	const dispatch= useDispatch();
	const tables=[1,2,3,4,5,6,7,8];

	const showOrder=(order)=>{
		orderActions.openOrder({open: true, order: order})(dispatch);
		orderActions.activeOrder(order)(dispatch);
	};

	const [open, setOpen] = React.useState(false);
	const [table, setTable] = React.useState(false);

	const createOrder=()=>{
		setOpen(false);
		createNewOrder(table);
	};

	return (
		<Grid container className={classes.wrap} justify="center">
			{tables.map(item=>
			<div key={item}>
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
					(<Paper className={classes.table} onClick={()=>{setOpen(true); setTable(item)}}>
				<Typography variant="h5" component="h3">
					table # {item}
				</Typography>
				<Typography component="p">
					empty
				</Typography>
			</Paper>)
				}
				</div>
			)}
			<Dialog
				open={open}
				onClose={()=>setOpen(false)}
			>
				<DialogTitle>Create new order table # {table} ?</DialogTitle>
				<DialogActions>
					<Button onClick={createOrder} color="primary">
						yes
					</Button>
					<Button onClick={()=> setOpen(false)} color="primary" autoFocus>
						no
					</Button>
				</DialogActions>
			</Dialog>
		</Grid>
	);
}