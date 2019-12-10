export function compare(a, b) {
	if (a.id > b.id) {
		return -1
	}
	if (a.id < b.id) {
		return 1
	}
	return 0
}

export const inputItems = (object) => {
	let test = Object.entries(object[0])
		.map((key) => key,
		)

	const jjj = test.map(i => {
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

	return jjj.reduce(function(acc, cur) {
		acc[cur[0]] = cur[1]

		return acc

	}, {})

}


export const inputItemsDataId = (object) => {
	let test = Object.entries(object)
		.map((key) => key)

	const jjj = test.map(i => {
		if (i[0] !== '_id' && i[0] !== '__v' && i[0] !== undefined) {
			if (Array.isArray(i[1])) {
				if (i[1]) {
					return [i[0], i[1].map(i => i._id)]
				}
				return [i[0], []]
			} else if (typeof i[1] === 'object') {

				if (i[1].length > 0) {
					return [i[0], i[1]]
				}
				return [i[0], '']
			} else {
				if (i[1]) {
					return [i[0], i[1]]
				}
				return [i[0], '']
			}
		}

	}).filter(item => item !== undefined)


	return jjj.reduce(function(acc, cur) {
		acc[cur[0]] = cur[1]

		return acc

	}, {})

}
