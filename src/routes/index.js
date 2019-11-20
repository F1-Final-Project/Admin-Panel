import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'
import NotFound from '../components/NotFound'
import FoodWareHouse from '../components/FoodWarehouse'
import Modal from '../components/common/Modal'

import Layout from '../components/Layout'

import PrivateRoute from './PrivateRoute'

export const Router = () => {
	return (
		<React.Fragment>
			<Header />
			<main className="content">
				<div className="container">
					<Switch>
						<Route exact path="/" component={props => <Layout {...props} />} />

						<PrivateRoute
							exact
							path="/adminPanel"
							component={props => <Layout {...props} />}
						/>

						<Route
							exact
							path="/foodWarehouse"
							component={props => <Layout {...props}><FoodWareHouse {...props}/></Layout>}
						/>
						<Route exact
									 name="foodWarehouse"
									 path="/foodWarehouse/:productId"
									 component={<Modal/>} />

						<Route path="*" component={NotFound} />
					</Switch>
				</div>
			</main>
			<Footer />
		</React.Fragment>
	)
}
