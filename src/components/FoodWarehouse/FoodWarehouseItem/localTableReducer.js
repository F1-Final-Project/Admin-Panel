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

		default:
			return state
	}
}