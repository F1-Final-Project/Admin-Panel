import Base from './base'

export default class IngredientAPI extends Base {

	getAllIngredient() {
		return super.get(`ingredients`).then(res => res.data)
	}

	addIngredient(data) {
		return super.post(`ingredients`, data)
	}

	deleteIngredient(id) {
		return super.delete(`ingredients/${id}`)
	}

	updateIngredient(id, data) {
		return super.put(`ingredients/${id}`, data).then(res => res.data)
	}

	getIngredientById(id) {
		return super.get(`ingredients/${id}`, id).then(res => res.data)
	}
}