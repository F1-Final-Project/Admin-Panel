import React from 'react'
import { mount } from 'enzyme'
import Modal from './index'
import TableCreated from '../../Table'

const exampleArr = [
	{
		price: 1,
		_id: '5dd099be0cdb777077a0bec5',
		title: 'Вода',
		restInStock: 10,
		description: 'Прозрачная жидкость без вкуса',
	},
]

test('should render correctly', () => {
	const component = mount(
		<TableCreated products={exampleArr}>
			<Modal/>
		</TableCreated>,
	)
	expect(component).toMatchSnapshot()
})


