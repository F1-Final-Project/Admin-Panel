import React, { useEffect, useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import CardItem from './CardItem'
import { Context } from '../../../context/tableContext'
import reducer from './cardLocalReduser'
import Grid from '@material-ui/core/Grid'
import DeleteIcon from '@material-ui/core/SvgIcon/SvgIcon'
import EditAttributesIcon from '@material-ui/icons/EditAttributes'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ArchiveIcon from '@material-ui/icons/Archive'

const useStyles = makeStyles(theme => ({
	card: {
		maxWidth: 345,
	},
	media: {
		height: 140,
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
}))

const useStylesTheme = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		maxWidth: 752,
	},
	demo: {
		backgroundColor: theme.palette.background.paper,
	},
}))


export default function MediaCard(props) {

	const [secondary, setSecondary] = React.useState(false)
	const { products, handleDeleteItem, handlerUpdateItem, orderCategories, handlerUpdateItemStoke } = props
	const classes = useStyles()
	const classesTheme = useStylesTheme()

	const initState = {
		products: products.order,
		editingOrder: products.editingOrder,
		pendingOrder: products.pendingOrder,
		orderHasArrived: products.orderHasArrived,
	}

	const [state, dispatch] = useReducer(reducer, initState)

	useEffect(() => {
		if (state.products.length <= 0) {
			handleDeleteItem(products._id)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.products.length])


	const handleUpdateDataItem = (id, data) => {

		const newOrderCategories = orderCategories.filter(item => item.title === 'inProgress')

		dispatch({
			type: 'saveNewItem',
			editingOrder: false,
			pendingOrder: true,
			orderHasArrived: false,
			payload: state.products,
		})

		const newData = {
			order: data,
			orderCategory: newOrderCategories[0],
			editingOrder: false,
			pendingOrder: true,
			orderHasArrived: false,
		}
		handlerUpdateItem(id, newData)
	}

	const handleEnterOrderItem = (id, data) => {
		const newOrderCategories = orderCategories.filter(item => item.title === 'inProgress')

		dispatch({
			type: 'saveNewItem',
			editingOrder: false,
			pendingOrder: false,
			orderHasArrived: true,
			payload: state.products,
		})
		const newData = {
			order: data,
			orderCategory: newOrderCategories[0],
			editingOrder: false,
			pendingOrder: false,
			orderHasArrived: true,
		}
		handlerUpdateItem(id, newData)
	}
	const handleArchiveOrderItem = (id, data) => {

		const newOrderCategories = orderCategories.filter(item => item.title === 'archive')

		const newData = {
			order: data,
			orderCategory: newOrderCategories[0],
			editingOrder: state.editingOrder,
			pendingOrder: state.pendingOrder,
			orderHasArrived: state.orderHasArrived,
		}

		handlerUpdateItem(id, newData)

		handlerUpdateItemStoke(newData.order)
	}


	const handleRemoveItem = id => {
		handleDeleteItem(id)
	}

	return (
		<Context.Provider value={{
			dispatch, state,
		}}>
			<Grid item xs={3}>
				<Card className={classes.card}>
					<FormGroup row>
						<FormControlLabel
							control={
								<Checkbox
									checked={secondary}
									onChange={event => setSecondary(event.target.checked)}
									value="secondary"
									disabled={!!state.pendingOrder}
								/>
							}
							label="Editing amount"
						/>
						{state.editingOrder && <EditAttributesIcon/>}
						{state.pendingOrder && <DonutLargeIcon/>}
						{state.orderHasArrived &&<ArchiveIcon/>}
					</FormGroup>
					<CardActionArea>
						<DeleteIcon/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">
								Correct order list
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								<div className={classesTheme.demo}>
									<List>
										{
											state.products.length > 0 && state.products.map(itemList => {
												return <CardItem itemList={itemList}
																				 classes={classes}
																				 secondary={secondary}
																				 key={itemList._id}
												/>
											})
										}
									</List>
								</div>
							</Typography>
						</CardContent>
					</CardActionArea>
					<CardActions>
						{state.editingOrder && <Button size="small" color="primary"
																					 onClick={() => handleUpdateDataItem(products._id, state.products)}>
							Send order list
						</Button>}
						{state.pendingOrder && <Button size="small" color="primary"
																					 onClick={() => handleEnterOrderItem(products._id, state.products)}>
							Enter order
						</Button>}
						{state.orderHasArrived && <Button size="small" color="primary"
																							onClick={() => handleArchiveOrderItem(products._id, state.products)}>
							Save order Archive
						</Button>}
						<Button size="small" color="primary" onClick={() => handleRemoveItem(products._id)}
										disabled={!!state.pendingOrder}>
							Delete order list
						</Button>
					</CardActions>
				</Card>
			</Grid>
		</Context.Provider>
	)
}