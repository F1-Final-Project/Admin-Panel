import React from 'react'
import { mount } from 'enzyme'
import Dish from './'
import Menu from '../../index'
import { Provider } from 'react-redux'
import { configureStore } from '../../../../store'

const store = configureStore()

const exampleArr = [
	{ name: 'Капрезе', value: 1, created_at: 'December 2019' },
	{ name: ' Ruggeri Prosecco ', value: 1, created_at: 'January 2019' },
	{ name: 'Ребра', value: 1, created_at: 'November 2019' },
	{ name: 'Сырники', value: 1, created_at: 'January 2020' },
]

test('should render correctly', () => {
	const component = mount(
		<Provider store={store}>
			<Menu categories={exampleArr}>
				<Dish/>
			</Menu>
		</Provider>,
	)
	expect(component).toMatchSnapshot()
})



