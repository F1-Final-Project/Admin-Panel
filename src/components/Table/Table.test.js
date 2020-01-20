import React from 'react'
import { mount } from 'enzyme'
import TableCreated from './index'

describe('Snapshot Table', () => {

	const exampleArr = [
		{
			price: 1,
			_id: '5dd099be0cdb777077a0bec5',
			title: 'Вода',
			restInStock: 10,
			description: 'Прозрачная жидкость без вкуса',
		},
	]


	it('should open edit modal', () => {
		const component = mount(<TableCreated products={exampleArr}/>)
		component.find('.enzyme--edit-modal').first().simulate('click')
		expect(component.find('.enzyme--modal-open').first().prop('disabled')).toBeFalsy()

		expect(component).toMatchSnapshot()
		component.unmount()
	})

	it('should open delete modal', () => {
		const component = mount(<TableCreated products={exampleArr}/>)
		component.find('.enzyme--delete-modal').first().simulate('click')
		expect(component.find('.enzyme--modal-open').first().prop('disabled')).toBeFalsy()

		expect(component).toMatchSnapshot()
		component.unmount()
	})

	it('should render <tr><td>text</td></tr>', () => {
		const component = mount(<TableCreated products={exampleArr}/>)

		expect(component.find('.MuiTableCell-body').map(i => i.text()))
			.toEqual(['Вода', '10', '1', 'Прозрачная жидкость без вкуса', ''])

		expect(component).toMatchSnapshot()
		component.unmount()
	})

	it('should render correctly', () => {
		const component = mount(<TableCreated products={exampleArr}/>)
		expect(component).toMatchSnapshot()
	})

})
