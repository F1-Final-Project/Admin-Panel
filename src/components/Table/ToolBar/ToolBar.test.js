import React from 'react'
import { mount } from 'enzyme'
import ToolBAr from './index'
import TableCreated from '../index'

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

	const openCheckBoxList = true

	it('should open creat modal', () => {
		const component = mount(
			<TableCreated products={exampleArr}>
				<ToolBAr/>
			</TableCreated>)


		component.find('.enzyme--creat-modal').first().simulate('click')

		expect(component.find('.enzyme--modal-open').first().prop('disabled')).toBeFalsy()

		expect(component).toMatchSnapshot()

		component.unmount()
	})

	it('should open checkbox', () => {
		const component = mount(
			<TableCreated products={exampleArr} openCheckBoxList={openCheckBoxList}>
				<ToolBAr/>
			</TableCreated>)


		component.find('.enzyme--open-table__checkbox').first().simulate('click')
		expect(component.find('.enzyme--table-checkbox').first().prop('disabled')).toBeFalsy()
		expect(component.props().openCheckBoxList).toBeTruthy()

		component.unmount()
	})

	it('should checked items', () => {
		const component = mount(
			<TableCreated products={exampleArr} openCheckBoxList={openCheckBoxList}>
				<ToolBAr/>
			</TableCreated>)


		component.find('.enzyme--open-table__checkbox').first().simulate('click')
		component.find('.enzyme--table-checked').first().simulate('click')
		expect(component.find('.enzyme--close-table__checkbox').first().prop('disabled')).toBeFalsy()

		component.unmount()
	})


	it('should render correctly', () => {
		const component = mount(<TableCreated products={exampleArr}>
			<ToolBAr/>
		</TableCreated>)
		expect(component).toMatchSnapshot()
	})

})
