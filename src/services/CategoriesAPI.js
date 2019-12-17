
import Base from './base'

export default class CategoryMenus extends Base {

	getAllCategories() {
		return super.get(`categoryMenus`).then(res => res.data)
	}
	getCategories() {
		return super.get(`categoryMenus`).then(res => res.data);
	}
	addCategory(category) {
		return super.post(`categoryMenus`, category).then(res => res.data);
	}
	deleteCategory(id){
		return super.delete(`categoryMenus/${id}`, id).then(res => res.data);
	}
	updateCategory(category){
		return super.put(`categoryMenus/:id/${category._id}`, category).then(res => res.data);
	}
}