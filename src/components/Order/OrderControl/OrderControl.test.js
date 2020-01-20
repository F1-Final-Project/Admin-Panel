import React from 'react'
import { shallow } from 'enzyme'
import OrderControl from './index'


test('should render correctly', () => {
	const component = shallow(<OrderControl/>)
	expect(component).toMatchSnapshot()
})


