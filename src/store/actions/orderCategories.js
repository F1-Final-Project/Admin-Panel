import * as ORDERCATEGORIES from '../constants/orderCategories'
import OrderCategoriesAPI from '../../services/OrderCategoriesAPI'

export function getAllOrderCategories() {
	return function(dispatch) {
		dispatch({
			type: ORDERCATEGORIES.ORDER_CATEGORIES_REQUEST_SENT,
		});
		(new OrderCategoriesAPI())
			.getAllOrderCategories()
			.then(res => {
				return dispatch({
					type: ORDERCATEGORIES. FETCH_ORDER_CATEGORIES,
					data: res,
				})
			})
	}

}

export function addOrderCategories(data) {
	return dispatch => {
		dispatch({
			type: ORDERCATEGORIES.ORDER_CATEGORIES_REQUEST_SENT,
		});
		(new OrderCategoriesAPI())
			.addOrderCategories(data)
			.then(res => {
				return dispatch({
					type: ORDERCATEGORIES.ADD_ORDER_CATEGORIES,
					data: res,
				})
			})
	}
}


