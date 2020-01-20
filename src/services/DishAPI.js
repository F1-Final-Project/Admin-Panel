import Base from './base';

export default class DishAPI extends Base {
	getDishes() {
		return super.get(`dishes`).then(res => res.data);
	}
	addDish(dish) {
		return super.post(`dishes`, dish).then(res => res.data);
	}
	deleteDish(id){
		return super.delete(`dishes/${id}`, id).then(res => res.data);
	}
	updateDish(dish, id){
		return super.put(`dishes/${id}`, dish).then(res => res.data);
	}
	getDishById(id) {
		return super.get(`dishes/${id}`).then(res => res.data);
	}
}