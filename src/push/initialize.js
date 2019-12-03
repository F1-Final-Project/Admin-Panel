import firebase from 'firebase'


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
				await sendTokenToServer(token)
			} else {
				console.warn('Не удалось получить токен.')
				setTokenSentToServer(false)
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


async function sendTokenToServer(currentToken) {
	if (!isTokenSentToServer(currentToken)) {
		console.log('Отправка токена на сервер...')

		await fetch('http://localhost:3002/push/storetoken', {
			method: 'POST',
			body: JSON.stringify({ token: currentToken }),
			headers: {
				'content-type': 'application/json',
			},

		})

		setTokenSentToServer(currentToken)
	} else {
		console.log('Токен уже отправлен на сервер.')
	}
}

function isTokenSentToServer(currentToken) {
	return window.localStorage.getItem('sentFirebaseMessagingToken') === currentToken
}

function setTokenSentToServer(currentToken) {
	window.localStorage.setItem(
		'sentFirebaseMessagingToken',
		currentToken ? currentToken : '',
	)
}


export async function sendTokenToServerDelete() {

	const token = await window.localStorage.getItem('sentFirebaseMessagingToken')

	console.log('teteteetet', token)

	console.log('Отправка токена на сервер...')

	await fetch('http://localhost:3002/push/deletetoken', {
		method: 'POST',
		body: JSON.stringify({ token: token }),
		headers: {
			'content-type': 'application/json',
		},

	})


}