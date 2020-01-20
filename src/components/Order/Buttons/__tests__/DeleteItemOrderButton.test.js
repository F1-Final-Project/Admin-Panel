import React from 'react'
import { shallow } from 'enzyme'
import DeleteItemOrderButton from '../DeleteItemOrderButton'
import { Provider } from 'react-redux'
import { configureStore } from '../../../../store'

const store = configureStore()


test('should render correctly', () => {
	const component = shallow(
		<Provider store={store}>
			<DeleteItemOrderButton/>
		</Provider>)
	expect(component).toMatchSnapshot()
})


