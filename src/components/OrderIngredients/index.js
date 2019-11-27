import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as orderIngredientAction from '../../store/actions/orderIngredient'
import * as orderCategoriesAction from '../../store/actions/orderCategories'

import Card from '../common/Card'


export default () => {

	const orderIngredients = useSelector(state => state.orderIngredient)
	const orderCategoriesItem = useSelector(state => state.orderCategories)
	const { products, loaded } = orderIngredients
	const { orderCategories, loadedCategories } = orderCategoriesItem


	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(orderIngredientAction.getAllOrderIngredienst())
		dispatch(orderCategoriesAction.getAllOrderCategories())

	}, [dispatch])


	//
	// const handleDeleteItem = id => {
	// 	dispatch(ingredientAction.deleteIngredientById(id))
	// }
	//
	// const handlerUpdateItem = (id, data) => {
	// 	dispatch(ingredientAction.updateIngredientById(id, data))
	// }
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
		<React.Fragment>
			{
				products.map((itemCard, key) => {
					return <Card products={itemCard} key={itemCard._id} orderCategories={orderCategories}/>
				})
			}
		</React.Fragment>
	)

}

