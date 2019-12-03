import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes'
import './index.css'
import { Provider } from 'react-redux'
import { configureStore } from './store'
import { config } from './push/firebaseConfig'
import firebase from 'firebase/app'
import { initializePush } from './push/initialize'

firebase.initializeApp(config)
initializePush()

const store = configureStore()

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Router/>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'),
)

