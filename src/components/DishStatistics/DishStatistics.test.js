import React from 'react'
import { shallow } from 'enzyme'
import DishStatistics from './index'


test('should render correctly', () => {
	const component = shallow(<DishStatistics/>)
	expect(component).toMatchSnapshot()
})


