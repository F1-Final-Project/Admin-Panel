import React from 'react'
import { mount } from 'enzyme'
import TableHead from './index'
import { Context } from '../../../context/tableContext'



describe('Snapshot TableHead', () => {

	const exampleArr = [
		{
			price: 1,
			_id: '5dd099be0cdb777077a0bec5',
			title: 'Вода',
			restInStock: 10,
			description: 'Прозрачная жидкость без вкуса',
		},
	]

	const state = {
		openCheckBox: false
	}


	it('should render <tr><th>text</th></tr>', () => {
		const component = mount(<Context.Provider value={{
				 state
			}}>
				<TableHead products={exampleArr}/>
			</Context.Provider>,
		)


		expect(component.find('.MuiTableCell-head').map(i => i.text()))
			.toEqual(['TITLE', 'RESTINSTOCK','PRICE','DESCRIPTION', 'ACTION'   ])

		expect(component).toMatchSnapshot()
		component.unmount()
	})


	it('should render correctly', () => {
		const component = mount(<Context.Provider value={{
				state
			}}>
				<TableHead products={exampleArr}/>
			</Context.Provider>,
		)
		expect(component).toMatchSnapshot()
	})

})
