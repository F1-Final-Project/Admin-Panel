import React from 'react'
import { shallow } from 'enzyme'
import TabPanel from './index'


test('should render correctly', () => {
	const component = shallow(<TabPanel/>)
	expect(component).toMatchSnapshot()
})


