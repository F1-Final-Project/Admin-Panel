import React from 'react'
import { shallow } from 'enzyme'
import Error from './index'


test('should render correctly', () => {
	const component = shallow(<Error/>)
	expect(component).toMatchSnapshot()
})


