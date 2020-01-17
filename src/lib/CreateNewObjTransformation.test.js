const inputItemsDataId = require('./sorted.js').inputItemsDataId


const exampleArray = {
	ingredients: [{ name: 'f1', _id: '1' }, { name: 'f8', _id: '2' }],
	_id: '5dd0a0bd40d38b71a3adc7de',
	title: 'Сырники',
	description: 'Золотистые хрустящие сырники подаются со свежими ягодами, джемами, сметанным кремом или шоколадом12',
	category: {
		_id: '5dd19f3d1c9d440000c0d803',
		title: 'Мясо',
		description: 'Наши повара готовят лучшие стейки в городе!',
	},
	weight: '30',
	img: 'https://cdn.pixabay.com/photo/2017/01/16/17/45/pancake-1984716_960_720.jpg',
}

describe('Return new array with object transformations', () => {

	test('typeof object keys', () => {
		expect(Array.isArray(inputItemsDataId(exampleArray).ingredients)).toBe(true)
		expect(typeof inputItemsDataId(exampleArray).category).toBe('object')
		expect(typeof inputItemsDataId(exampleArray).title).toBe('string')
		expect(typeof inputItemsDataId(exampleArray).description).toBe('string')
		expect(typeof inputItemsDataId(exampleArray).weight).toBe('string')
	})

	test('Object values', () => {
		expect(inputItemsDataId(exampleArray).ingredients).toEqual(expect.arrayContaining(['1', '2']))
		expect(inputItemsDataId(exampleArray).title).toBe('Сырники')
		expect(inputItemsDataId(exampleArray).description).toBe('Золотистые хрустящие сырники подаются со свежими ягодами, джемами, сметанным кремом или шоколадом12')
		expect(inputItemsDataId(exampleArray).weight).toBe('30')
		expect.objectContaining({
			category: expect.objectContaining({
				_id: '5dd19f3d1c9d440000c0d803',
			}),
		})
	})

})




