import * as INGREDIENT from '../constants/ingredient'

export const initState = {
	products: [],
	loaded: false
};

export default function (state = initState, action) {
	switch (action.type) {
		case INGREDIENT.INGREDIENT_REQUEST_SENT:
			return {...state};
		case INGREDIENT.FETCH_INGREDIENT:
			return {
				...state,
				...{
					products: action.data,
					loaded: true
				}
			};
		case INGREDIENT.FETCH_INGREDIENT_BY_ID:
			return {
				...state,
				...{
					products: action.data,
					loaded: true
				}
			};
		default:
			return state
	}

};
