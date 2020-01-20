import React from 'react'
import { shallow } from 'enzyme/build'
import CreateNewOrderButton from '../CreateNewOrderButton'
import { Provider } from 'react-redux'
import { configureStore } from '../../../../store'

const store = configureStore()


test('should render correctly', () => {
	const component = shallow(
		<Provider store={store}>
			<CreateNewOrderButton/>
		</Provider>)
	expect(component).toMatchSnapshot()
})


