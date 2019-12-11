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
			const updatedIngredient = { ...state.product, ...action.payload }

			return {
				...state,
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
		case 'createList':
			return {
				...state,
				...{
					openCreateListModal: action.openCreateListModal,
				},
			}
		case 'checkedProduct':
			return {
				...state,
				...{
					openCheckBox: action.openCheckBox,
					checkedProduct: action.payload,
					checkBoxActive: action.checkBoxActive,
				},
			}
		case 'checkBoxActive':
			return {
				...state,
				...{
					checkBoxActive: action.payload,
				},
			}
		case 'searchChange':
			let updatedSearch = { ...state.search, ...action.searchItem }

			return {
				...state,
				...{
					transferListItemSearch: action.payload,
					search: updatedSearch,
				},
			}

		default:
			return state
	}
}