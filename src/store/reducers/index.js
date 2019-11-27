import { combineReducers } from 'redux'

import ingredient from './ingredient'
import orderIngredient from './orderIngredient'
import orderCategories from './orderCategories'

export default combineReducers({
	ingredient,
	orderIngredient,
	orderCategories,
})
