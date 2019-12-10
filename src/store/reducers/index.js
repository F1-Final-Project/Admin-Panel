import { combineReducers } from 'redux'

import ingredient from './ingredient'
import orderIngredient from './orderIngredient'
import orderCategories from './orderCategories'
import dishes from './dishes'

export default combineReducers({
	ingredient,
	orderIngredient,
	orderCategories,
	dishes
})
