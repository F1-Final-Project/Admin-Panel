import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as ingredientAction from '../store/actions/ingredient'


export default function useUpdateItem(id, data) {

	const dispatch = useDispatch()

	useEffect(() => {
		if (Array.isArray(data)) {
			data.map(item => dispatch(ingredientAction.updateIngredientById(item._id, item)))
		}

		dispatch(ingredientAction.updateIngredientById(id, data))
	}, [data])


}