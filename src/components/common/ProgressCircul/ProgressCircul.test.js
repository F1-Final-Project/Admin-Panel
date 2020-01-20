import React from 'react'
import { shallow } from 'enzyme'
import ProgressCircul from './index'


test('should render correctly', () => {
	const component = shallow(<ProgressCircul/>)
	expect(component).toMatchSnapshot()
})


