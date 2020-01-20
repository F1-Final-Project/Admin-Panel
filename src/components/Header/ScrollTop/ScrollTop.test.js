import React from 'react'
import { shallow } from 'enzyme'
import ScrollTop from './index'


test('should render correctly', () => {
	const component = shallow(<ScrollTop/>)
	expect(component).toMatchSnapshot()
})


