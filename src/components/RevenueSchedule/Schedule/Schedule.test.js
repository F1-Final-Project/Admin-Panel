import React from 'react'
import { mount } from 'enzyme'
import Schedule from './index'
import RevenueSchedule from '../index'

const exampleArr = [
	{ 'Daily-people': 4, name: '12/09/2019' },
	{ 'Daily-people': 1, name: '01/09/2019' },
	{ 'Daily-people': 2, name: '12/10/2019' },
	{ 'Daily-people': 15, name: '12/11/2019' },
	{ 'Daily-people': 1, name: '01/11/2019' },
	{ 'Daily-people': 6, name: '12/12/2019' },
]

test('should render correctly', () => {
	const component = mount(
		<RevenueSchedule products={exampleArr}>
			<Schedule/>
		</RevenueSchedule>,
	)
	expect(component).toMatchSnapshot()
})


