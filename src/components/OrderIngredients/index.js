import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as orderIngredientAction from '../../store/actions/orderIngredient'
import * as orderCategoriesAction from '../../store/actions/orderCategories'
import Grid from '@material-ui/core/Grid'

import Card from '../common/Card'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
	test: {
		alignItems: 'flex-start',
		flexWrap: 'wrap',
		alignContent: 'center'
	}

})


export default () => {

	const orderIngredients = useSelector(state => state.orderIngredient)
	const orderCategoriesItem = useSelector(state => state.orderCategories)
	const { products, loaded } = orderIngredients
	const { orderCategories, loadedCategories } = orderCategoriesItem
	const classes = useStyles()


	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(orderIngredientAction.getAllOrderIngredienst())
		dispatch(orderCategoriesAction.getAllOrderCategories())

	}, [dispatch])

	const handleDeleteItem = id => {
		dispatch(orderIngredientAction.deleteOrderIngredientById(id))
	}

	const handlerUpdateItem = (id, data) => {
		dispatch(orderIngredientAction.updateOrderIngredientById(id, data))
	}
	//
	// const handlerCreateItem = data => {
	// 	dispatch(ingredientAction.addIngredient(data))
	// }
	//
	// const handlerCreateOrderItem = data => {
	// 	dispatch(orderIngredientAction.addOrderIngredient(data))
	// }
	console.log('PRODUCT---->', products, orderCategories)

	return (
		<div className={classes.root}>
			<Grid container spacing={2}
						direction="row"
						justify="flex-start"
						alignItems="flex-start"
						className={classes.test}
			>
					{
						products.map((itemCard) => {
							return <Card products={itemCard}
													 key={itemCard._id}
													 orderCategories={orderCategories}
													 handleDeleteItem={handleDeleteItem}
													 handlerUpdateItem={handlerUpdateItem}/>
						})
					}
				</Grid>
		</div>
	)

}

