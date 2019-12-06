import { combineReducers } from 'redux';

import ingredient from './ingredient';
import categories from './category';
import dish from './dish';
import order from './order'

export default combineReducers({
	ingredient,
	categories,
	dish,
	order,
})
