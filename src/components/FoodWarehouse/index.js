import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as ingAction from '../../store/actions/ingredient'
import Ingredient from './FoodWarehouseItem'


export default () => {
	const ingredients = useSelector(state => state.ingredient)
	const { products } = ingredients

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(ingAction.getAllIngredienst())

	}, [dispatch])

	const handleDeleteItem = id => {
		dispatch(ingAction.deleteIngredientById(id))

	}

	const handlerUpdateItem = (id, date) => {
		dispatch(ingAction.updateIngredientById(id, date))
	}

	const handlerCreateItem = (date) => {
		dispatch(ingAction.addIngredient(date))
	}


	return (
		<React.Fragment>
			<Ingredient products={products} handleDeleteItem={handleDeleteItem} handlerUpdateItem={handlerUpdateItem} handlerCreateItem={handlerCreateItem}/>
		</React.Fragment>
	)

}

