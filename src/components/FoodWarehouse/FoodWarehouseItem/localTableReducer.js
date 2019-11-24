export default function(state, action) {
	switch (action.type) {
		case 'edit':
			return {
				...state,
				...{
					product: action.payload,
					open: action.open,
				},
			}
		case 'close':
			return {
				...state,
				...{
					open: action.open,
					openDeleteModal: action.openDeleteModal,
					openCreateItem: action.openCreateItem
				},
			}
		case 'deleteModal':
			return {
				...state,
				...{
					product: action.payload,
					openDeleteModal: action.openDeleteModal,
				},
			}
		case 'save':
			return {
				...state,
				...{
					product: action.payload,
					open: action.open,
				},
			}
		case 'onChangeInput':
			let updatedIngredient = {...state.product, ...action.payload}
			return {
				state,
				...{
					product: updatedIngredient,
					open: action.open,
					openCreateItem: action.openCreateItem
				},
			}

		case 'openCreateItem':
			return {
				...state,
				...{
					product: action.payload,
					openCreateItem: action.openCreateItem,
				},
			}

		default:
			return state
	}
}