import * as DISH from '../constants/dishes'
import DishesAPI from '../../services/DishesAPI'


export function getAllDish() {
	return function(dispatch) {
		dispatch({
			type: DISH.DISH_REQUEST_SENT,
		});
		(new DishesAPI())
			.getAllDish()
			.then(res => {
				return dispatch({
					type: DISH.FETCH_DISH,
					data: res,
				})
			})
	}
}

export function deleteDishById(id) {
	return function(dispatch) {
		dispatch({
			type: DISH.DISH_REQUEST_SENT,
		});
		(new DishesAPI())
			.deleteDish(id)
			.then(res => {
				return dispatch({
					type: DISH.DISH_REMOVE_PRODUCT,
					data: res,
				})
			})
	}
}

export function addDish(sortedData, data) {
	return dispatch => {
		dispatch({
			type: DISH.DISH_REQUEST_SENT,
		});
		(new DishesAPI())
			.addDish(sortedData)
			.then(res => {
				const newData = {...res, ...data}
				return dispatch({
					type: DISH.ADD_DISH,
					data: newData,
				})
			})
	}
}



export function updateDishById(productId, newAmount) {

	return function(dispatch) {
		dispatch({
			type: DISH.DISH_REQUEST_SENT,
		});
		(new DishesAPI())
			.updateDish(productId, newAmount)
			.then(res => dispatch({
					type: DISH.UPDATE_DISH,
					data: res,
				})
			)


	}
}


