import React from 'react'
import { shallow } from 'enzyme'
import MenuAppBar from '../MenuAppBar'


test('should render correctly', () => {
	const component = shallow(<MenuAppBar/>)
	expect(component).toMatchSnapshot()
})


