import * as ORDERINGREDIENT from '../constants/orderIngredient'

export const initState = {
	products: [],
	loaded: false,
}

export default function(state = initState, action) {

	switch (action.type) {
		case ORDERINGREDIENT.ORDER_INGREDIENT_REQUEST_SENT:
			return { ...state }

		case ORDERINGREDIENT.FETCH_ORDER_INGREDIENT:

			return {
				...state,
				...{
					products: action.data,
					loaded: true,
				},
			}

		case ORDERINGREDIENT.ORDER_INGREDIENT_REMOVE_PRODUCT:

			let updatedIngredientList = state.products.filter(el => el._id !== action.data.data.id)

			return {
				...state,
				...{
					products: updatedIngredientList,
					loaded: true,
				},
			}

		case ORDERINGREDIENT.ADD_ORDER_INGREDIENT:

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

		case ORDERINGREDIENT.UPDATE_ORDER_INGREDIENT:
			const data = action.data
			const updateIngredient = state.products.map(prod => {
				if (prod._id === data.product._id) {
					return { ...prod, ...data.product }
				}
				return prod
			})

			return {
				...state,
				...{
					products: updateIngredient,
					loaded: true,
				},
			}

		default:
			return state
	}

};
