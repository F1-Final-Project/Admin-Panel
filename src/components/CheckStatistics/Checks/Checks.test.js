import React from 'react'
import { shallow } from 'enzyme'
import Checks from './index'


test('should render correctly', () => {
	const component = shallow(<Checks/>)
	expect(component).toMatchSnapshot()
})


