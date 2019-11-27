import React from 'react'
import {Route, Switch} from 'react-router-dom'

import NotFound from '../components/NotFound'

import FoodWareHouse from '../components/FoodWarehouse'
import Modal from '../components/common/Modal'

import Layout from '../components/Layout'
import Login from '../components/Login'
import CreateUser from '../components/admin/CreateUser'

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
                        <Route exact path="/admin/create-user" component={props => <CreateUser {...props} />}/>

                        <HiddenAfterAuthRoute
                            exact
                            path="/login"
                            component={props => <Login {...props} />}
                        />
                        <PrivateRoute
                            exact
                            path="/admin"
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
                               component={<Modal/>}/>

                        <Route path="*" component={NotFound}/>
                    </Switch>
                </div>
            </main>
        </React.Fragment>
    )
}
