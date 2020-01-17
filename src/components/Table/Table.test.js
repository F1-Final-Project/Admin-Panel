import React from 'react'
import { shallow, mount } from 'enzyme'
import Table from './'

describe('Snapshot Table', () => {
	it('should render correctly in "debug" mode', () => {
		const component = shallow(<Table/>)

		expect(component).toMatchSnapshot()
	})
})
