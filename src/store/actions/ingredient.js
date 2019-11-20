import * as INGREDIENT from '../constants/ingredient'
import IngregientAPI from '../../services/IngredientAPI'

export function getAllIngredienst() {
	return function (dispatch) {
		dispatch({
			type: INGREDIENT.INGREDIENT_REQUEST_SENT
		});
		(new IngregientAPI()).getAllIngredient().then(res => {
			return dispatch({
				type: INGREDIENT.FETCH_INGREDIENT,
				data: res
			});
		});
	};
}

export function deleteIngredientById(id) {
	return function (dispatch) {
		dispatch({
			type: INGREDIENT.INGREDIENT_REQUEST_SENT
		});
		(new IngregientAPI()).deleteIngredient(id).then(res => {
			return dispatch({
				type: INGREDIENT.FETCH_INGREDIENT_BY_ID,
				data: res.data
			});
		});
	};
}
