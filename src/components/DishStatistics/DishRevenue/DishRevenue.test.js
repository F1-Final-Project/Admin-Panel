import React from 'react'
import { shallow } from 'enzyme'
import DishRevenue from './index'


test('should render correctly', () => {
	const component = shallow(<DishRevenue/>)
	expect(component).toMatchSnapshot()
})


