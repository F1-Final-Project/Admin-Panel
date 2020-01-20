import React from 'react'
import { shallow } from 'enzyme'
import Logout from './index'


test('should render correctly', () => {
	const component = shallow(<Logout/>)
	expect(component).toMatchSnapshot()
})


