import * as ORDER from '../constants/orders';

const initState = {
	orders: [],
	loaded: false,
	isAddSuccessful: false,
	active: ''
};

export default function (state = initState, action) {

	switch (action.type) {

		case ORDER.ORDER_REQUEST_SENT:
			return {
				...state,
				...{
					loaded : false,
					isAddSuccessful: false
				}
			};

		case ORDER.ORDER_ACTIVE:
			return {
				...state,
				...{
					active: action.data,
				}
			};

		case ORDER.ORDER_FETCH:
			return {
				...state,
				...{
					orders: action.data,
					loaded: true
				}
			};

		case ORDER.ORDER_ADD:
			return {
				...state,
				...{
					active : action.data._id,
					orders : [...state.orders, ...[action.data]],
					loaded : true,
					isAddSuccessful: true,
				}
			};

		case ORDER.ORDER_DELETE:
			const afterDeleteOrders = state.orders.filter(order => {
				return order._id !== action.data
			});
			return {
				...state,
				...{
					orders : afterDeleteOrders,
					loaded : true
				}
			};

		case ORDER.ORDER_UPDATE:
			const afterUpdate = state.orders.map(order => {
				if(order._id === action.data._id){
					return action.data
				}
				return order
			});
			return{
				...state,
				...{
					orders : afterUpdate,
					loaded : true
				}
			};
		default:
			return state
	}
}