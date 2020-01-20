import React from 'react'
import { shallow } from 'enzyme'
import CreateInvoiceButton from '../CreateInvoiceButton'
import { Provider } from 'react-redux'
import { configureStore } from '../../../../store'

const store = configureStore()


test('should render correctly', () => {
	const component = shallow(
		<Provider store={store}>
			<CreateInvoiceButton/>
		</Provider>)
	expect(component).toMatchSnapshot()
})


