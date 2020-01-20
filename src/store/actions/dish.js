import * as COMMON from "../constants/common";
import * as DISH from "../constants/dish";
import DishAPI from "../../services/DishAPI";

export function getDishes() {
	return function (dispatch) {
		dispatch({
			type: COMMON.REQUEST_SENT
		});
		(new DishAPI()).getDishes().then(res => {
			return dispatch({
				type: DISH.DISH_FETCH,
				data: res
			});
		});
	};
}
export function getDishesByCategory(categoryId) {
	return function (dispatch) {
		dispatch({
			type: COMMON.REQUEST_SENT
		});
		(new DishAPI()).getDishes().then(res => {
			return dispatch({
				type: DISH.DISH_FETCH,
				data: res.filter((item)=>item.category._id===categoryId)
			});
		});
	};
}
export function addDish(payload){
	return function (dispatch) {
		dispatch({
			type: COMMON.REQUEST_SENT
		});
		(new DishAPI()).addDish(payload).then(res => {
			return dispatch({
				type: DISH.DISH_ADD,
				data: res,
			});
		})
	};
}
export function deleteDish(id){
	return function (dispatch) {
		dispatch({
			type: COMMON.REQUEST_SENT
		});
		(new DishAPI()).deleteDish(id).then(res => {
			return dispatch({
				type: DISH.DISH_DELETE,
				data: res,
			});
		})
	};
}
export function updateDish(payload, id){
	return function (dispatch) {
		dispatch({
			type: COMMON.REQUEST_SENT
		});
		(new DishAPI()).updateDish(payload, id).then(res => {
			return dispatch({
				type: DISH.DISH_UPDATE,
				data: res,
			});
		})
	};
}
export function getDishById(id){
	return function (dispatch) {
		dispatch({
			type: COMMON.REQUEST_SENT
		});
		(new DishAPI()).getDishById(id).then(res => {
			return dispatch({
				type: DISH.DISH_FETCH_BY_ID,
				data: res,
			});
		})
	};
}
