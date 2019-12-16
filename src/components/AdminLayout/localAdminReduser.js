export default function(state, action) {
	switch (action.type) {
		case 'openMenu':
			return {
				...state,
				...{
					menu: action.payload,
					main: false,
					foodWareHouse: false,
					statistics: false,
					orderIngredients: false,
				},
			}
		case 'openFoodWareHouse':
			return {
				...state,
				...{
					foodWareHouse: action.payload,
					main: false,
					menu: false,
					statistics: false,
					orderIngredients: false,

				},
			}
		case 'openMain':
			return {
				...state,
				...{
					main: action.payload,
					menu: false,
					foodWareHouse: false,
					statistics: false,
					orderIngredients: false,
				},
			}
		case 'openStatistics':
			return {
				...state,
				...{
					statistics: action.payload,
					main: false,
					menu: false,
					foodWareHouse: false,
					orderIngredients: false,
				},
			}
		case 'openOrderIngredients':

			return {
				...state,
				...{
					orderIngredients: action.payload,
					main: false,
					menu: false,
					foodWareHouse: false,
					statistics: false,
				},
			}

		default:
			return state
	}
}