import firebase from 'firebase/app'
import 'firebase/messaging'


export function initializePush() {
	const messaging = firebase.messaging()

	messaging
		.requestPermission()
		.then(async function f() {
			console.log('Have Permission')
			return await messaging.getToken()
		})
		.then(async function(token) {
			console.log('FCM Token:', token)

			if (token) {
				await sendTokenToLocalStorage(token)
			} else {
				console.warn('Не удалось получить токен.')
				await sendTokenToLocalStorage(false)
			}
		})
		.catch(error => {
			if (error.code === 'messaging/permission-blocked') {
				console.log('Please Unblock Notification Request Manually')
			} else {
				console.log('Error Occurred', error)
			}
		})


	messaging.onMessage(payload => {
		console.log('Notification Received', payload)
	})

}


function sendTokenToLocalStorage(currentToken) {
	if (!isTokenSentToLocalStorage(currentToken)) {
		console.log('Отправка токена на в localStorage...')
		setTokenSentToLocalStorage(currentToken)
	} else {
		console.log('Токен уже отправлен на сервер.')
	}
}

function isTokenSentToLocalStorage(currentToken) {
	return window.localStorage.getItem('sentFirebaseMessagingToken') === currentToken
}

function setTokenSentToLocalStorage(currentToken) {
	window.localStorage.setItem(
		'sentFirebaseMessagingToken',
		currentToken ? currentToken : '',
	)
}
