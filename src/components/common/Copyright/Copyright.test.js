import React from 'react'
import { shallow } from 'enzyme'
import Copyright from './index'


test('should render correctly', () => {
	const component = shallow(<Copyright/>)
	expect(component).toMatchSnapshot()
})


