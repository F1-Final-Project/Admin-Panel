import * as COMMON from '../constants/common';
import * as DISH from '../constants/dish';

const initState = {
	dishes: [],
	openDish: {},
	loaded: false,
	isAddSuccessful: false
};

export default function (state = initState, action) {

	switch (action.type) {

		case COMMON.REQUEST_SENT:
			return {
				...state,
				...{
					loaded : false
				}
			};

		case DISH.DISH_FETCH:
			return {
				...state,
				...{
					dishes: action.data,
					loaded: true
				}
			};

		case DISH.DISH_FETCH_BY_ID:
			return {
				...state,
				...{
					openDish: action.data,
					loaded: true
				}
			};

		case DISH.DISH_ADD:
			return {
				...state,
				...{
					dishes : [...state.dishes, ...[action.data]],
					loaded : true,
					isAddSuccessful: true
				}
			};
		case DISH.DISH_DELETE:
			const newDishList = state.dishes.filter(dish => {
				return dish._id !== action.data._id
			});
			return {
				...state,
				...{
					dishes : newDishList,
					loaded : true
				}
			};
		case DISH.DISH_UPDATE:
			const updateDish = state.dishes.map(dish => {
				if(dish._id === action.data._id){
					return action.data
				}
				return dish
			});
			return{
				...state,
				...{
					dishes : updateDish,
					loaded : true
				}
			};
		default:
			return state
	}
}