import React from 'react'
import { Route, Switch } from 'react-router-dom'

import NotFound from '../components/NotFound'

import FoodWareHouse from '../components/FoodWarehouse'
import OrderIngredient from '../components/OrderIngredients'
import Dish from '../components/Dishes'
import AdminLayout from '../components/AdminLayout'
import Modal from '../components/common/Modal'
import Menu from '../components/Menu'
import Kitchen from '../components/Kitchen'

import Layout from '../components/Layout'
import Login from '../components/Login'
import AdminPage from '../components/admin/AdminPage'

import PrivateRoute from './PrivateRoute'
import HiddenAfterAuthRoute from './HiddenAfterAuth'

export const Router = () => {
	return (<React.Fragment>
			{/*<Header/>*/}
			<main className="content">
				<div className="container">
					<Switch>
						<Route exact path="/"
									 component={props => <Layout {...props} />}/>

						<PrivateRoute
							exact
							path="/"
							component={props => <Layout {...props} />}
						/>
						<PrivateRoute
							exact
							path="/admin"
							component={props => <AdminPage {...props} />}
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
						<Route exact
									 path="/admin-panel"
									 component={props => <AdminLayout {...props}/>}/>
						<HiddenAfterAuthRoute
							exact
							path="/login"
							component={props => <Login {...props} />}
						/>

						<Route
							exact
							path="/foodWarehouse"
							component={props => <Layout {...props}><FoodWareHouse {...props}/></Layout>}
						/>

						<Route exact
									 name="foodWarehouse"
									 path="/foodWarehouse/:productId"
									 component={<Modal/>}/>

						<Route
							exact
							path="/menu"
							component={props => <Layout {...props}><Menu {...props}/></Layout>}
						/>

						<Route
							exact
							path="/kitchen"
							component={props => <Layout {...props}><Kitchen {...props}/></Layout>}
						/>

						<Route path="*" component={NotFound}/>

						{/*<Route path="*" component={NotFound}/>*/}
					</Switch>
				</div>
			</main>
			{/*<Footer/>*/}
		</React.Fragment>
	)
}
