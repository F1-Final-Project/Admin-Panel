import React from 'react'
import { shallow } from 'enzyme'
import Login from './index'


test('should render correctly', () => {
	const component = shallow(<Login/>)
	expect(component).toMatchSnapshot()
})


