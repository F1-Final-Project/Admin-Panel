import * as CATEGORY from "../constants/categories";
import CategoriesAPI from "../../services/CategoriesAPI";

export function getCategories() {
	return function (dispatch) {
		dispatch({
			type: CATEGORY.CATEGORY_REQUEST_SENT
		});
		(new CategoriesAPI()).getCategories().then(res => {
			return dispatch({
				type: CATEGORY.CATEGORY_FETCH,
				data: res
			});
		});
	};
}
export function addCategory(payload){
	return function (dispatch) {
		dispatch({
			type: CATEGORY.CATEGORY_REQUEST_SENT
		});
		(new CategoriesAPI()).addCategory(payload).then(res => {
			return dispatch({
				type: CATEGORY.CATEGORY_ADD,
				data: res,
			});
		})
	};
}
export function deleteCategory(payload){
	return function (dispatch) {
		dispatch({
			type: CATEGORY.CATEGORY_REQUEST_SENT
		});
		(new CategoriesAPI()).deleteCategory(payload).then(res => {
			return dispatch({
				type: CATEGORY.CATEGORY_DELETE,
				data: res,
			});
		})
	};
}
export function updateCategory (payload){
	return function (dispatch) {
		dispatch({
			type: CATEGORY.CATEGORY_REQUEST_SENT
		});
		(new CategoriesAPI()).updateCategory(payload).then(res => {
			return dispatch({
				type: CATEGORY.CATEGORY_UPDATE,
				data: res,
			});
		})
	};
}