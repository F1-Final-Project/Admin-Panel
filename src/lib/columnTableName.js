export const clmns = (array) => {
	let result = []
	if (Array.isArray(array)) {
		result = Object.keys(array[0])
			.map(key => (key !== '_id' && key !== '__v' && key !== undefined) ? {
					id: key,
					label: key.toUpperCase(),
				} : '',
			).filter(item => item !== '')

		result.push({ id: 'button', label: 'ACTION' })
		return result
	}
	return result
}