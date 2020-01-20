import React from 'react'
import { mount } from 'enzyme'
import OrderDish from './index'
import OrderItems from '../../index'
import { Provider } from 'react-redux'
import { configureStore } from '../../../../store'

const store = configureStore()


test('should render correctly', () => {
	const component = mount(
		<Provider store={store}>
			<OrderItems>
				<OrderDish/>
			</OrderItems>
		</Provider>,
	)
	expect(component).toMatchSnapshot()
})



