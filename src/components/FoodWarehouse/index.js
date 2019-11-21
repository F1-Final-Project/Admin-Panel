import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as ingAction from '../../store/actions/ingredient'
import Ingredient from './FoodWarehouseItem'


export default () => {


	const ingredients = useSelector(state => state.ingredient)
	const { products, loaded } = ingredients

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(ingAction.getAllIngredienst())

	}, [dispatch])

	const handleDeleteItem = id => {
		dispatch(ingAction.deleteIngredientById(id))
	}

	const handlerUpdateItem = (id, data) => {
		dispatch(ingAction.updateIngredientById(id, data))
	}

	const handlerCreateItem = (data) => {
		dispatch(ingAction.addIngredient(data))
	}

	console.log("PRODUCT----->", products)

	return (
		<React.Fragment>
			{loaded ? <Ingredient products={products} handleDeleteItem={handleDeleteItem} handlerUpdateItem={handlerUpdateItem} handlerCreateItem={handlerCreateItem}/> :<div>...LOAD</div> }
		</React.Fragment>
	)

}

