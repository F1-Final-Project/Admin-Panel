import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as ingredientAction from '../../store/actions/ingredient'
import * as orderIngredientAction from '../../store/actions/orderIngredient'
import Ingredient from '../Table'
import * as orderCategoriesAction from '../../store/actions/orderCategories'


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

		dispatch(orderIngredientAction.addOrderIngredient(data))
	}


	return (
		<React.Fragment>
			{loaded ? <Ingredient products={products} handleDeleteItem={handleDeleteItem} handlerUpdateItem={handlerUpdateItem} handlerCreateItem={handlerCreateItem} handlerCreateOrderItem={handlerCreateOrderItem} orderCategories={orderCategories}/> :<div>...LOAD</div> }
		</React.Fragment>
	)

}

