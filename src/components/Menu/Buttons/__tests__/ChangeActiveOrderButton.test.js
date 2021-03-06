import React from 'react'
import { shallow } from 'enzyme'
import ChangeActiveOrderButton from '../ChangeActiveOrderButton'
import { Provider } from 'react-redux'
import { configureStore } from '../../../../store'

const store = configureStore()


test('should render correctly', () => {
	const component = shallow(
		<Provider store={store}>
			<ChangeActiveOrderButton/>
		</Provider>)
	expect(component).toMatchSnapshot()
})


