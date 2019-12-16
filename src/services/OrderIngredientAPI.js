import Base from './base'

export default class OrderIngredientAPI extends Base {

	getAllOrderIngredient() {
		return super.get(`order-ingredients`).then(res => res.data)
	}

	addOrderIngredient(data) {
		return super.post(`order-ingredients`, data).then(res => res.data)
	}

	deleteOrderIngredient(id) {
		return super.delete(`order-ingredients/${id}`)
	}

	updateOrderIngredient(id, data) {
		return super.put(`order-ingredients/${id}`, data).then(res => res.data)
	}

}