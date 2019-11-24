import * as INGREDIENT from '../constants/ingredient'
import IngregientAPI from '../../services/IngredientAPI'

export function getAllIngredienst() {
	return function(dispatch) {
		dispatch({
			type: INGREDIENT.INGREDIENT_REQUEST_SENT,
		});
		(new IngregientAPI())
			.getAllIngredient()
			.then(res => {
				return dispatch({
					type: INGREDIENT.FETCH_INGREDIENT,
					data: res,
				})
			})
	}
}

export function deleteIngredientById(id) {
	return function(dispatch) {
		dispatch({
			type: INGREDIENT.INGREDIENT_REQUEST_SENT,
		});
		(new IngregientAPI())
			.deleteIngredient(id)
			.then(res => {
				return dispatch({
					type: INGREDIENT.INGREDIENT_REMOVE_PRODUCT,
					data: res,
				})
			})
	}
}

export function addIngredient(data) {
	return dispatch => {
		dispatch({
			type: INGREDIENT.INGREDIENT_REQUEST_SENT,
		});
		(new IngregientAPI())
			.addIngredient(data)
			.then(res => {
				return dispatch({
					type: INGREDIENT.ADD_INGREDIENT,
					data: res,
				})
			})
	}
}

export function updateIngredientById(productId, newAmount) {

	return function(dispatch) {
		dispatch({
			type: INGREDIENT.INGREDIENT_REQUEST_SENT,
		});
		(new IngregientAPI())
			.updateIngredient(productId, newAmount)
			.then(res => dispatch({
					type: INGREDIENT.UPDATE_INGREDIENT,
					data: res,
				}),
			)
	}
}


