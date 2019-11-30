import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes'
import './index.css'
import { Provider } from 'react-redux'
import { configureStore } from './store'
import { config } from "./push/firebaseConfig";
import firebase from "firebase";
import {initializePush} from './push/initialize'


firebase.initializeApp(config);
initializePush();


const store = configureStore()

if ('serviceWorker' in navigator) {
	console.log('12122')
	window.addEventListener('load', async () => {
		const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
			updateViaCache: 'none'
		});
		 // messaging.useServiceWorker(registration);
	});
}

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Router/>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'),
)

