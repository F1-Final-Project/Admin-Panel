import * as CATEGORY from '../constants/categories';

const initState = {
	categories: [],
	loaded: false,
	isAddSuccessful: false
};

export default function (state = initState, action) {

	switch (action.type) {

		case CATEGORY.CATEGORY_REQUEST_SENT:
			return {
				...state,
				...{
					loaded : false
				}
			};

		case CATEGORY.CATEGORY_FETCH:
			return {
				...state,
				...{
					categories: action.data,
					loaded: true
				}
			};

		case CATEGORY.CATEGORY_ADD:
			return {
				...state,
				...{
					categories : [...state.categories, ...[action.data]],
					loaded : true,
					isAddSuccessful: true
				}
			};
		case CATEGORY.CATEGORY_DELETE:
			const afterDeleteCategories = state.categories.filter(category => {
				return category._id !== action.data._id
			});
			return {
				...state,
				...{
					categories : afterDeleteCategories,
					loaded : true
				}
			};
		case CATEGORY.CATEGORY_UPDATE:
			const afterUpdate = state.categories.map(category => {
				if(category._id === action.data._id){
					return action.data
				}
				return category
			});
			return{
				...state,
				...{
					categories : afterUpdate,
					loaded : true
				}
			};
		default:
			return state
	}
}