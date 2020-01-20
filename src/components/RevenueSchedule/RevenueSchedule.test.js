import React from 'react'
import { shallow } from 'enzyme'
import RevenueSchedule from './index'


test('should render correctly', () => {
	const component = shallow(<RevenueSchedule/>)
	expect(component).toMatchSnapshot()
})


