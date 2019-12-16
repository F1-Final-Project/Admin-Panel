import { combineReducers } from 'redux'

import ingredient from './ingredient'
import orderIngredient from './orderIngredient'
import orderCategories from './orderCategories'
import dishes from './dishes'
import categories from './category'
import dish from './dish'
import order from './order'
import invoice from './invoice'

export default combineReducers({
	ingredient,
	orderIngredient,
	orderCategories,
	dishes,
	categories,
	dish,
	order,
	invoice,
})
