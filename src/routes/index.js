import React from 'react'
import {Route, Switch} from 'react-router-dom'

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

import HiddenAfterAuthRoute from './HiddenAfterAuth'
import AdminRoute from "./AdminRoute";
import CookRoute from "./CookRoute";
import WaiterRoute from "./WaiterRoute";
import RedirectRoute from "./RedirectRoute";
import RevenueSchedule from '../components/RevenueSchedule'
import CheckStatistics from '../components/CheckStatistics'

import Header from '../components/Header'

export const Router = () => {
    return (
        <React.Fragment>
            {/*<Header/>*/}
            <main className="content">
                <div className="container">
                    <Switch>
                        <HiddenAfterAuthRoute
                            exact
                            path="/login"
                            component={props => <Login {...props} />}
                        />
                        <AdminRoute
                            exact
                            path="/order-ingredients"
                            component={props => <Layout {...props}><OrderIngredient {...props}/></Layout>}
                        />
                        <AdminRoute
                            exact
                            path="/edit-dishes"
                            component={props => <Layout {...props}><Dish {...props}/></Layout>}
                        />
                        <AdminRoute
                            exact
                            path="/admin-panel"
                            component={props => <AdminLayout {...props}/>}
                        />
                        <AdminRoute
                            exact
                            path="/foodWarehouse"
                            component={props => <Layout {...props}><FoodWareHouse {...props}/></Layout>}
                        />
                        <AdminRoute
                            exact
                            name="foodWarehouse"
                            path="/foodWarehouse/:productId"
                            component={<Modal/>}
                        />
                        <WaiterRoute
                            exact
                            path="/menu"
                            component={props => <Layout {...props}><Menu {...props}/></Layout>}
                        />
                        <CookRoute
                            exact
                            path="/kitchen"
                            component={props => <Layout {...props}><Kitchen {...props}/></Layout>}
                        />
                        <AdminRoute
                          exact
                          path="/revenue-schedule"
                          component={props => <Layout {...props}><RevenueSchedule/></Layout>}
                        />

                        <AdminRoute
                          exact
                          path="/check-statistic"
                          component={props => <Layout {...props}><CheckStatistics/></Layout>}
                        />
                        <RedirectRoute path="*" component={NotFound}/>
                    </Switch>
                </div>
            </main>
        </React.Fragment>
    )
}
