import React from 'react'
import { shallow } from 'enzyme'
import Header from './index'


test('should render correctly', () => {
	const component = shallow(<Header/>)
	expect(component).toMatchSnapshot()
})


