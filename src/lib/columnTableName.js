/**
 * @desc Функция для создания заголовков в таблице. Принимает массив объектов и возвращает для каждого значения в объекте id: "price", label: "PRICE"
 * @param {Array} array
 * @return {Array} масив обьектов
 */
const clmns = (array) => {
	let result = []
	if (Array.isArray(array)) {
		result = Object.keys(array[0])
			.map(key => (key !== '_id' && key !== '__v' && key !== undefined && key !== 'additionalIngredients' && key !== 'img' ) ? {
					id: key,
					label: key.toUpperCase(),
				} : '',
			).filter(item => item !== '')

		result.push({ id: 'button', label: 'ACTION' })
		return result
	}
	return result
}

exports.clmns = clmns
