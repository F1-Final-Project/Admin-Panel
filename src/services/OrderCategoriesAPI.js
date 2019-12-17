import Base from './base'

export default class IngredientAPI extends Base {

	getAllOrderCategories() {
		return super.get(`order-categories`).then(res => res.data)
	}
	addOrderCategories(data) {
		return super.post(`order-categories`, data).then(res => res.data)
	}
}