import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as orderIngredientAction from '../../store/actions/orderIngredient'
import * as orderCategoriesAction from '../../store/actions/orderCategories'
import Grid from '@material-ui/core/Grid'

import Card from '../common/Card'
import * as ingredientAction from '../../store/actions/ingredient'
import { useStyles } from './OrderIngredientsCSS'


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

	/**
	 * @desc Функция для запроса в базу данных удаления элемента REST API(Delete: /your-link/:ItemId)
	 * @param {string} id
	 */

	const handleDeleteItem = id => {
		dispatch(orderIngredientAction.deleteOrderIngredientById(id))
	}

	/**
	 * @desc Функция для запроса в базу данных редактирования элемента REST API(UPDATE: /your-link/:ItemId)
	 * @param {string} id
	 * @param {Object} data
	 */
	const handlerUpdateItem = (id, data) => {
		dispatch(orderIngredientAction.updateOrderIngredientById(id, data))
	}

	/**
	 * @desc Функция для запроса в базу данных редактирования элементов массива REST API(UPDATE: /your-link/:ItemId)
	 * @param {Object} data
	 */

	const handlerUpdateItemStoke = (data) => {

		if (Array.isArray(data)) {
			data.map(item => dispatch(ingredientAction.updateIngredientById(item._id, item)),
			)
		}

	}

	return (
		<div className={classes.root}>
			<Grid container spacing={2}
						direction="row"
						justify="flex-start"
						alignItems="flex-start"
						className={classes.test}
			>
				{
					loaded ? products.map((itemCard) => {
							return <Card products={itemCard}
													 key={itemCard._id}
													 orderCategories={orderCategories}
													 handleDeleteItem={handleDeleteItem}
													 handlerUpdateItem={handlerUpdateItem}
													 handlerUpdateItemStoke={handlerUpdateItemStoke}
													 loadedCategories={loadedCategories}/>
						})
						: <div>Loading...</div>
				}
				{/*<Notifications />*/}
			</Grid>
		</div>
	)

}

