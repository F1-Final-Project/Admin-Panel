import * as ORDERCATEGORIES from '../constants/orderCategories'

export const initState = {
	orderCategories: [],
	loadedCategories: false,
}

export default function(state = initState, action) {

	switch (action.type) {
		case ORDERCATEGORIES.ORDER_CATEGORIES_REQUEST_SENT:
			return { ...state }

		case ORDERCATEGORIES.FETCH_ORDER_CATEGORIES:

			return {
				...state,
				...{
					orderCategories: action.data,
					loadedCategories: true,
				},
			}

		case ORDERCATEGORIES.ADD_ORDER_CATEGORIES:

			return {
				...state,
				...{
					orderCategories: [
						...state.orderCategories,
						...[action.data],
					],
					loadedCategories: true,
				},
			}


		default:
			return state
	}

};
