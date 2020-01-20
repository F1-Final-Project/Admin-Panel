import React from 'react'
import { shallow } from 'enzyme'
import DeleteOrderButton from '../DeleteOrderButton'
import { Provider } from 'react-redux'
import { configureStore } from '../../../../store'

const store = configureStore()


test('should render correctly', () => {
	const component = shallow(
		<Provider store={store}>
			<DeleteOrderButton/>
		</Provider>)
	expect(component).toMatchSnapshot()
})


