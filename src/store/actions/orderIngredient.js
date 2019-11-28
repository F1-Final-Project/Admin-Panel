import * as ORDERINGREDIENT from '../constants/orderIngredient'
import OrderIngregientAPI from '../../services/OrderIngredientAPI'

export function getAllOrderIngredienst() {
	return function(dispatch) {
		dispatch({
			type: ORDERINGREDIENT.ORDER_INGREDIENT_REQUEST_SENT,
		});
		(new OrderIngregientAPI())
			.getAllOrderIngredient()
			.then(res => {
				return dispatch({
					type: ORDERINGREDIENT.FETCH_ORDER_INGREDIENT,
					data: res,
				})
			})
	}
}

export function deleteOrderIngredientById(id) {
	return function(dispatch) {
		dispatch({
			type: ORDERINGREDIENT.ORDER_INGREDIENT_REQUEST_SENT,
		});
		(new OrderIngregientAPI())
			.deleteOrderIngredient(id)
			.then(res => {
				return dispatch({
					type: ORDERINGREDIENT.ORDER_INGREDIENT_REMOVE_PRODUCT,
					data: res,
				})
			})
	}
}

export function addOrderIngredient(data) {
	return dispatch => {
		dispatch({
			type: ORDERINGREDIENT.ORDER_INGREDIENT_REQUEST_SENT,
		});
		(new OrderIngregientAPI())
			.addOrderIngredient(
				{
					order: data.order,
					orderCategory: data.orderCategories,
					editingOrder: data.editingOrder,
					pendingOrder: data.pendingOrder,
					orderHasArrived: data.orderHasArrived,
				})
			.then(res => {
				return dispatch({
					type: ORDERINGREDIENT.ADD_ORDER_INGREDIENT,
					data: res,
				})
			})
	}
}

export function updateOrderIngredientById(productId, newAmount) {

	return function(dispatch) {
		dispatch({
			type: ORDERINGREDIENT.ORDER_INGREDIENT_REQUEST_SENT,
		});
		(new OrderIngregientAPI())
			.updateOrderIngredient(productId, newAmount)
			.then(res => dispatch({
					type: ORDERINGREDIENT.UPDATE_ORDER_INGREDIENT,
					data: res,
				}),
			)
	}
}


