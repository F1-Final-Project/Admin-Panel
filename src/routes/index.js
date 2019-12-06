import React from 'react'
import {Route, Switch} from 'react-router-dom'

import NotFound from '../components/NotFound'

import FoodWareHouse from '../components/FoodWarehouse'
import Modal from '../components/common/Modal'
import Menu from '../components/Menu'

import Layout from '../components/Layout'
import Login from '../components/Login'
import AdminPage from '../components/admin/AdminPage'

import PrivateRoute from './PrivateRoute'
import HiddenAfterAuthRoute from './HiddenAfterAuth'

export const Router = () => {
    return (
        <React.Fragment>
            <main className="content">
                <div className="container">
                    <Switch>
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

                        <Route path="*" component={NotFound}/>
                    </Switch>
                </div>
            </main>
        </React.Fragment>
    )
}
