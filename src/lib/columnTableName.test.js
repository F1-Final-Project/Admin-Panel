const columnTableName = require('./columnTableName')
//import columnTableName from './columnTableName'


const exampleArray = [
	{
		name: 'F1',
		stepProject: 'Final',
		participants: ['Misha', 'Masha', 'Fedia'],
	},
	{
		name: 'F1',
		stepProject: 'Final',
		participants: ['Misha', 'Masha', 'Fedia'],
	},
]

test('Return new renamed array', () => {

	expect(columnTableName.clmns(exampleArray)).toEqual(
		expect.arrayContaining([
			expect.objectContaining({
				id: 'name',
				label: 'NAME',
			}),
			expect.objectContaining({
				id: 'stepProject',
				label: 'STEPPROJECT',
			}),
			expect.objectContaining({
				id: 'participants',
				label: 'PARTICIPANTS',
			}),
			expect.objectContaining({
				id: 'button',
				label: 'ACTION',
			}),
		]),
	)
})
