import React, { useEffect } from 'react'
import * as ingredientAction from '../store/actions/ingredient'
import { useSelector } from 'react-redux'



export default () => {

	const ingredients = useSelector(state => state.ingredient)

	useEffect(() => {
		dispatch(ingredientAction.getAllIngredienst())
	}, [dispatch])

	console.log('ededed', ingredients)
}