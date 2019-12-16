import * as DISH from '../constants/dishes'

export const initState = {
	products: [],
	loaded: false,
}

export default function(state = initState, action) {

	switch (action.type) {
		case DISH.DISH_REQUEST_SENT:
			return { ...state }

		case DISH.FETCH_DISH:

			return {
				...state,
				...{
					products: action.data,
					loaded: true,
				},
			}

		case DISH.DISH_REMOVE_PRODUCT:

			let updatedDishList = state.products.filter(el => el._id !== action.data.data.id)

			return {
				...state,
				...{
					products: updatedDishList,
					loaded: true,
				},
			}

		case DISH.ADD_DISH:
			console.log('TETSETST--->', action.data)
			return {
				...state,
				...{
					products: [
						...state.products,
						...[action.data],
					],
					loaded: true,
				},
			}

		case DISH.UPDATE_DISH:
			const data = action.data
			const updateDish = state.products.map(prod => {
				if (prod._id === data.product._id) {
					return { ...prod, ...data.product }
				}
				return prod
			})
			console.log('3ef3ef3--->', updateDish)
			return {
				...state,
				...{
					products: updateDish,
					loaded: true,
				},
			}

		default:
			return state
	}

};
