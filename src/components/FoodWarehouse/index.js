import React, { useEffect } from 'react'
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
		console.log('TEST DELETE----->')
		dispatch(ingAction.deleteIngredientById(id))
	}

	return (
		<React.Fragment>
			<Ingredient products={products} handleDeleteItem={handleDeleteItem}/>
		</React.Fragment>
	)

}

