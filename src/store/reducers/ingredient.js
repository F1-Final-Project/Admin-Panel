import * as INGREDIENT from '../constants/ingredient'

export const initState = {
	products: [],
	loaded: false,
}

export default function(state = initState, action) {

	switch (action.type) {
		case INGREDIENT.INGREDIENT_REQUEST_SENT:
			return { ...state }

		case INGREDIENT.FETCH_INGREDIENT:

			return {
				...state,
				...{
					products: action.data,
					loaded: true,
				},
			}

		case INGREDIENT.INGREDIENT_REMOVE_PRODUCT:

			let updatedIngredientList = state.products.filter(el => el._id !== action.data.data.id)

			return {
				...state,
				...{
					products: updatedIngredientList,
					loaded: true,
				},
			}

		case INGREDIENT.ADD_INGREDIENT:

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

		case INGREDIENT.UPDATE_INGREDIENT:
			const data = action.data
			const updateIngredient = state.products.map(prod => {
				if (prod._id === data.product._id) {
					return { ...prod, ...data.product }
				}
				return prod
			})
			console.log('3ef3ef3--->', updateIngredient)
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
