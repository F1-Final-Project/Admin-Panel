import React from 'react'
import { shallow } from 'enzyme'
import ActiveOrderButton from '../ActiveOrderButton'
import { Provider } from 'react-redux'
import { configureStore } from '../../../../store'

const store = configureStore()


test('should render correctly', () => {
	const component = shallow(
		<Provider store={store}>
			<ActiveOrderButton/>
		</Provider>)
	expect(component).toMatchSnapshot()
})



