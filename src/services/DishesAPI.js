import Base from './base'

export default class DishesAPI extends Base {

	getAllDish() {
		return super.get(`dishes`).then(res => res.data)
	}

	addDish(data) {
		return super.post(`dishes`, data).then(res => res.data)
	}

	deleteDish(id) {
		return super.delete(`dishes/${id}`)
	}

	updateDish(id, data) {
		return super.put(`dishes/${id}`, data).then(res => res.data)
	}

}