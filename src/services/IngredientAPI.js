import Base from './base'

export default class IngredientAPI extends Base {

	getAllIngredient() {
		return super.get(`dishes`).then(res => res.data)
	}

	addIngredient(data) {
		return super.post(`ingredients`, data).then(res => res.data)
	}

	deleteIngredient(id) {
		return super.delete(`ingredients/${id}`)
	}

	updateIngredient(id, data) {
		return super.put(`ingredients/${id}`, data).then(res => res.data)
	}

}