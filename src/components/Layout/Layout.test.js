import React from 'react'
import { shallow } from 'enzyme'
import Layout from './index'


test('should render correctly', () => {
	const component = shallow(<Layout/>)
	expect(component).toMatchSnapshot()
})


