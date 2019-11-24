import React from 'react'
import { Switch, Route } from 'react-router-dom'

import NotFound from '../components/NotFound'
import Layout from '../components/Layout'
import Login from '../components/Login'

import PrivateRoute from './PrivateRoute'
import HiddenAfterAuthRoute from './HiddenAfterAuth'

export const Router = () => {
	return (
		<React.Fragment>
			<main className="content">
				<div className="container">
					<Switch>
						<Route exact path="/" component={props => <Layout {...props} />} />

						<HiddenAfterAuthRoute
							exact
							path="/login"
							component={props => <Login {...props} />}
						/>
						<PrivateRoute
							exact
							path="/adminPanel"
							component={props => <Layout {...props} />}
						/>

						<Route path="*" component={NotFound} />
					</Switch>
				</div>
			</main>
		</React.Fragment>
	)
}
