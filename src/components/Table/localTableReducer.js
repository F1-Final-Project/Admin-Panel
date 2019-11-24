export default function(state, action) {
	switch (action.type) {
		case 'editItem':
			return {
				...state,
				...{
					product: action.payload,
					openEditModal: action.openEditModal,
				},
			}
		case 'closeModal':
			return {
				...state,
				...{
					product: action.payload,
					openEditModal: action.openEditModal,
					openDeleteModal: action.openDeleteModal,
					openCreateModal: action.openCreateModal,
				},
			}
		case 'deleteItem':
			return {
				...state,
				...{
					product: action.payload,
					openDeleteModal: action.openDeleteModal,
				},
			}
		case 'saveNewItem':
			return {
				...state,
				...{
					product: action.payload,
					openEditModal: action.openEditModal,
				},
			}
		case 'onChangeInput':
			let updatedIngredient = { ...state.product, ...action.payload }
			return {
				state,
				...{
					product: updatedIngredient,
					openEditModal: action.openEditModal,
					openCreateModal: action.openCreateModal,
				},
			}

		case 'openCreateModal':
			return {
				...state,
				...{
					product: action.payload,
					openCreateModal: action.openCreateModal,
				},
			}

		case 'selectItems':
			return {
				...state,
				...{
					checkedProduct: action.payload,
				},
			}

		default:
			return state
	}
}