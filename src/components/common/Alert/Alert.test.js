import React from 'react'
import { shallow } from 'enzyme'
import Alert from './index'
import { configureStore } from '../../../store'
import { Provider } from 'react-redux'

const store = configureStore()

test('should render correctly', () => {
	const component = shallow(
		<Provider store={store}>
		<Alert/>
		</Provider>)
	expect(component).toMatchSnapshot()
})


