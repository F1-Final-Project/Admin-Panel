import React from 'react'
import { shallow } from 'enzyme'
import Tables from './index'
import { Provider } from 'react-redux'
import { configureStore } from '../../../store'

const store = configureStore()


test('should render correctly', () => {
	const component = shallow(
		<Provider store={store}>
			<Tables/>
		</Provider>)
	expect(component).toMatchSnapshot()
})


