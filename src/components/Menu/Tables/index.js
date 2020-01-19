import React from 'react'
import {useStyles, ColorButton, Table, TakenTable} from './style'
import Typography from '@material-ui/core/Typography/index'
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@material-ui/core/Grid/index'
import * as orderActions from '../../../store/actions/orders'
import DialogTitle from '@material-ui/core/DialogTitle/index'
import DialogActions from '@material-ui/core/DialogActions/index'
import Dialog from '@material-ui/core/Dialog/index'
import Box from '@material-ui/core/Box'

export default function Index(props) {
	const {createNewOrder}=props;
	const {orders} = useSelector(state =>
		({orders: state.order.orders})
	);
	const classes = useStyles();
	const dispatch= useDispatch();
	const tables=[1,2,3,4,5,6,7,8,9,10];

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
		<>
			<Grid container className={classes.wrap} justify="center">
				{tables.map(item=>
					<div key={item}>
						{(orders.find((order) => order.table === item)) ?(
								<Box  className={classes.box} border={1} borderColor='#7a6c5b' borderRadius={4}>
									<TakenTable className={`${classes.table} ${classes.taken}`} onClick={()=>showOrder(orders.filter((order) => order.table === item)[0])}>
										<Typography variant="h5" component="h3">
											table # {item}
										</Typography>
										<Typography component="p">
											taken
										</Typography>
									</TakenTable>
								</Box>
							):
							(<Box  className={classes.box} border={1} borderColor='#7a6c5b' borderRadius={4}>
								<Table className={classes.table} onClick={()=>{setOpen(true); setTable(item)}}>
									<Typography variant="h5" component="h3">
										table # {item}
									</Typography>
									<Typography component="p">
										empty
									</Typography>
								</Table>
							</Box>)
						}
					</div>
				)}
			</Grid>
			<Dialog
				open={open}
				onClose={()=>setOpen(false)}
			>
				<Box border={1} borderColor='#7a6c5b' borderRadius={3} className={classes.dialog}>
					<DialogTitle>Create new order table # {table} ?</DialogTitle>
					<DialogActions>
						<ColorButton variant="outlined" onClick={createOrder}>
							yes
						</ColorButton>
						<ColorButton onClick={()=> setOpen(false)} variant="outlined">
							no
						</ColorButton>
					</DialogActions>
				</Box>
			</Dialog>
		</>
	);
}