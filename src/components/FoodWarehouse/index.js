import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as ingredientAction from '../../store/actions/ingredient'
import * as orderIngredientAction from '../../store/actions/orderIngredient'
import Ingredient from '../Table'
import * as orderCategoriesAction from '../../store/actions/orderCategories'
import { messaging } from '../../init-fcm'


export default () => {


	const ingredients = useSelector(state => state.ingredient)
	const { products, loaded } = ingredients
	const orderCategoriesItem = useSelector(state => state.orderCategories)
	const { orderCategories, loadedCategories } = orderCategoriesItem

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(ingredientAction.getAllIngredienst())
		dispatch(orderCategoriesAction.getAllOrderCategories())

	}, [dispatch])

	// useEffect(() => {
	// 	console.log('3ww3w3w3w', messaging.getToken())
	// 	messaging.requestPermission()
	// 		.then(async function() {
	// 			const token = await messaging.getToken()
	// 		})
	// 		.catch(function(err) {
	// 			console.log('Unable to get permission to notify.', err)
	// 		})
	// 	navigator.serviceWorker.addEventListener('message', (message) => console.log(message))
	// 	messaging.onMessage((payload) => console.log('Message received. ', payload))
	// })

	const handleDeleteItem = id => {
		dispatch(ingredientAction.deleteIngredientById(id))
	}

	const handlerUpdateItem = (id, data) => {
		dispatch(ingredientAction.updateIngredientById(id, data))
	}

	const handlerCreateItem = data => {
		dispatch(ingredientAction.addIngredient(data))
	}

	const handlerCreateOrderItem = data => {

		console.log('1111', data)

		dispatch(orderIngredientAction.addOrderIngredient(data))
	}


	return (
		<React.Fragment>
			{loaded ?
				<Ingredient products={products} handleDeleteItem={handleDeleteItem} handlerUpdateItem={handlerUpdateItem}
										handlerCreateItem={handlerCreateItem} handlerCreateOrderItem={handlerCreateOrderItem}
										orderCategories={orderCategories}/> : <div>...LOAD</div>}
		</React.Fragment>
	)

}

