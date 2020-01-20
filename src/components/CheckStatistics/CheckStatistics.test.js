import React from 'react'
import { shallow } from 'enzyme'
import CheckStatistics from './index'


test('should render correctly', () => {
	const component = shallow(<CheckStatistics/>)
	expect(component).toMatchSnapshot()
})


