import Base from './base'

export default class CategoryMenus extends Base {

	getAllCategories() {
		return super.get(`categoryMenus`).then(res => res.data)
	}

}