import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'
import NotFound from '../components/NotFound'
import FoodWareHouse from '../components/FoodWarehouse'
import OrderIngredient from '../components/OrderIngredients'
import Dish from '../components/Dishes'

import Layout from '../components/Layout'

import PrivateRoute from './PrivateRoute'

export const Router = () => {
	return (
		<React.Fragment>
			<Header/>
			<main className="content">
				<div className="container">
					<Switch>
						<Route exact path="/"
									 component={props => <Layout {...props} />}/>

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
									 path="/order-ingredients"
									 component={props => <Layout {...props}><OrderIngredient {...props}/></Layout>}/>

						<Route exact
									 path="/edit-dishes"
									 component={props => <Layout {...props}><Dish {...props}/></Layout>}/>

						{/*<Route path="*" component={NotFound}/>*/}
					</Switch>
				</div>
			</main>
			<Footer/>
		</React.Fragment>
	)
}
