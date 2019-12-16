export default function(state, action) {
	switch (action.type) {

		case 'deleteItem':
			let updatedOrderFilter = state.products.filter(i => i._id !== action.payload._id)
			return {
				...state,
				...{
					products: updatedOrderFilter,
				},
			}

		case 'saveNewItem':
			return {
				...state,
				...{
					products: action.payload,
					editingOrder: action.editingOrder,
					pendingOrder: action.pendingOrder,
					orderHasArrived: action.orderHasArrived
				},
			}
		case 'onChangeInput':
			let updatedOrder = state.products.map(i => i._id === action.payload._id
				? { ...i, ...action.payload }
				: i)

			return {
				...state,
				...{
					products: updatedOrder,
				},
			}

		default:
			return state
	}
}