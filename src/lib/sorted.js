/**
 * @desc Функция для сортировки заголовков в таблице по алфавиту
 * @return {Number}
 */

function compare(a, b) {
	if (a.id > b.id) {
		return -1
	}
	if (a.id < b.id) {
		return 1
	}
	return 0
}

module.exports.compare = compare

/**
 * @desc Функция для создания полей в модальном окне, количество полей зависит от количества элементов в объекте
 * @type {Object} object
 * @return {Object}
 */

const inputItems = (object) => {
	if (object) {

		let firstItem = Object.entries(object[0])
			.map((key) => key,
			)


		const sortedObjc = firstItem.map(i => {
			if (i[0] !== '_id' && i[0] !== '__v' && i[0] !== undefined) {
				if (Array.isArray(i[1])) {
					return [i[0], []]
				} else if (typeof i[1] === 'object') {
					return [i[0], {}]
				} else {
					return [i[0], '']
				}
			}
		}).filter(item => item !== undefined)

		return sortedObjc.reduce(function(acc, cur) {
			acc[cur[0]] = cur[1]
			return acc

		}, {})
	}

}

module.exports.inputItems = inputItems

/**
 * @desc Функция принимает объект и возвращает отсортированный элемент для Schema Mongoose,
 * если поля объекта типа (Object, Array) возвращает только _id(String)
 * @type {Object} object
 * @return {Object}
 */


const inputItemsDataId = (object) => {
	let item = Object.entries(object)
		.map((key) => key)

	const sortedItems = item.map(i => {
		if (i[0] !== '_id' && i[0] !== '__v' && i[0] !== undefined) {
			if (Array.isArray(i[1])) {
				if (i[1]) {
					return [i[0], i[1].map(i => i._id)]
				}
				return [i[0], []]
			} else if (typeof i[1] === 'object') {
				if (Object.keys(i[1]).length !== 0) {
					return [i[0], i[1]]
				}
				return [i[0], 'unCategories']
			} else {
				if (i[1]) {
					return [i[0], i[1]]
				}
				return [i[0], '']
			}
		}

	}).filter(item => item !== undefined)

	return sortedItems.reduce(function(acc, cur) {
		acc[cur[0]] = cur[1]

		return acc

	}, {})

}

module.exports.inputItemsDataId = inputItemsDataId
