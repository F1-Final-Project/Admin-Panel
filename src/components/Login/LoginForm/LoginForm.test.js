import React from 'react'
import { mount } from 'enzyme'
import LoginForm from './index'
import Login from '../'


const formData = {
	password: 'password',
	email: 'email@test.com'
}

test('should render correctly', () => {
	const component = mount(
		<Login formData={formData}>
			<LoginForm/>
		</Login>,
	)
	expect(component).toMatchSnapshot()
})






