const inputItems = require('./sorted.js').inputItems

const exampleArray = [{
	ingredients: [{ name: 'f1' }, { name: 'f8' }],
	_id: '5dd0a0bd40d38b71a3adc7de',
	title: 'Сырники',
	description: 'Золотистые хрустящие сырники подаются со свежими ягодами, джемами, сметанным кремом или шоколадом12',
	category: {
		_id: '5dd19f3d1c9d440000c0d803',
		title: 'Мясо',
		description: 'Наши повара готовят лучшие стейки в городе!',
	},
	weight: 30,
	img: 'https://cdn.pixabay.com/photo/2017/01/16/17/45/pancake-1984716_960_720.jpg',
}]

describe('Return new array with object transformations', () => {

	test('typeof object keys', () => {
		expect(Array.isArray(inputItems(exampleArray).ingredients)).toBe(true)
		expect(typeof inputItems(exampleArray).category).toBe('object')
		expect(typeof inputItems(exampleArray).title).toBe('string')
		expect(typeof inputItems(exampleArray).description).toBe('string')
		expect(typeof inputItems(exampleArray).weight).toBe('string')
	})

	test('Object values', () => {
		expect(inputItems(exampleArray).ingredients.length).toBe(0)
		expect(inputItems(exampleArray).title.length).toBe(0)
		expect(inputItems(exampleArray).weight.length).toBe(0)
		expect(inputItems(exampleArray).description.length).toBe(0)
		expect(Object.keys(inputItems(exampleArray).category).length).toBe(0)
	})

})




