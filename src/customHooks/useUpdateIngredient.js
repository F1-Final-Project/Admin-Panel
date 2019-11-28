import React from 'react'
import { useDispatch } from 'react-redux'
import * as ingredientAction from '../store/actions/ingredient'


export default function useUpdateItem(id, data) {

	const dispatch = useDispatch()

	if (Array.isArray(data)) {
		data.map(item => {
			return dispatch(ingredientAction.updateIngredientById(item._id, item))
		})
	}

	return dispatch(ingredientAction.updateIngredientById(id, data))

}