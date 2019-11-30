importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js')

const config = {
	// Project Settings => Add Firebase to your web app
	apiKey: 'AIzaSyDFTW69xyMLP3MqvIpDGJyTRO4V0F_OxBg',
	authDomain: 'admin-pane-f1.firebaseapp.com',
	databaseURL: 'https://admin-pane-f1.firebaseio.com',
	projectId: 'admin-pane-f1',
	storageBucket: 'admin-pane-f1.appspot.com',
	messagingSenderId: '358924836770',
	appId: '1:358924836770:web:4cc16972594167eb9a1cfb',
}

firebase.initializeApp(config)
const messaging = firebase.messaging()
messaging.setBackgroundMessageHandler(payload => {
	const title = payload.notification.title
	console.log('payload', payload.notification.icon)
	const options = {
		body: payload.notification.body,
		icon: payload.notification.icon,
	}
	return self.registration.showNotification(title, options)
})


self.addEventListener('notificationclick', function(event) {
	const clickedNotification = event.notification
	clickedNotification.close()
	const promiseChain = clients
		.matchAll({
			type: 'window',
			includeUncontrolled: true,
		})
		.then(windowClients => {
			let matchingClient = null
			for (let i = 0; i < windowClients.length; i++) {
				const windowClient = windowClients[i]
				if (windowClient.url === feClickAction) {
					matchingClient = windowClient
					break
				}
			}
			if (matchingClient) {
				return matchingClient.focus()
			} else {
				return clients.openWindow(feClickAction)
			}
		})
	event.waitUntil(promiseChain)
})


//
//
// const messaging = firebase.messaging()
//
// messaging.requestPermission()
// 	.then(function() {
// 		console.log('TEST PUSh')
// 	})
// 	.catch(function(err) {
// 		console.log('ERROR push')
// 	})


//
// messaging.onMessage((payload) => console.log('Message received. ', payload))
//
// // Add the public key generated from the console here.
// messaging.usePublicVapidKey('BNlTG7jb-XzjEDXvDkCeNOphWLmjHBPSuKC4Buf0Lwf8q-PZhD0fE63xAB4wIrChxJGzlsvV_L4QT-Estb0rkSI')
//
//
// if ('Notification' in window) {
//
//
// 	Notification.requestPermission().then((permission) => {
// 		if (permission === 'granted') {
// 			console.log('Notification permission granted.')
// 			subscribe()
// 			// TODO(developer): Retrieve an Instance ID token for use with FCM.
//
// 		} else {
// 			console.log('Unable to get permission to notify.')
// 		}
// 	})
// }
//
// function subscribe() {
// 	// запрашиваем разрешение на получение уведомлений
// 	messaging.requestPermission()
// 		.then(function() {
// 			// получаем ID устройства
// 			messaging.getToken()
// 				.then(function(currentToken) {
// 					console.log(currentToken)
//
// 					if (currentToken) {
// 						sendTokenToServer(currentToken)
// 						updateUIForPushEnabled(currentToken)
// 					} else {
// 						console.warn('Не удалось получить токен.')
// 						updateUIForPushPermissionRequired()
// 						setTokenSentToServer(false)
// 					}
// 				})
// 				.catch(function(err) {
// 					console.warn('При получении токена произошла ошибка.', err)
// 					setTokenSentToServer(false)
// 				})
// 		})
// 		.catch(function(err) {
// 			console.warn('Не удалось получить разрешение на показ уведомлений.', err)
// 		})
// }
// // Callback fired if Instance ID token is updated.
// 	messaging.onTokenRefresh(() => {
// 		messaging.getToken().then((refreshedToken) => {
// 			console.log('Token refreshed.')
// 			// Indicate that the new Instance ID token has not yet been sent to the
// 			// app server.
// 			setTokenSentToServer(false)
// 			// Send Instance ID token to app server.
// 			sendTokenToServer(refreshedToken)
// 			// ...
// 		}).catch((err) => {
// 			console.log('Unable to retrieve refreshed token ', err)
// 			showToken('Unable to retrieve refreshed token ', err)
// 		})
// 	})
//
// // отправка ID на сервер
// function sendTokenToServer(currentToken) {
// 	if (!isTokenSentToServer(currentToken)) {
// 		console.log('Отправка токена на сервер...');
//
// 		var url = ''; // адрес скрипта на сервере который сохраняет ID устройства
// 		$.post(url, {
// 			token: currentToken
// 		});
//
// 		setTokenSentToServer(currentToken);
// 	} else {
// 		console.log('Токен уже отправлен на сервер.');
// 	}
// }
//
// // используем localStorage для отметки того,
// // что пользователь уже подписался на уведомления
// function isTokenSentToServer(currentToken) {
// 	return window.localStorage.getItem('sentFirebaseMessagingToken') == currentToken;
// }
//
// function setTokenSentToServer(currentToken) {
// 	window.localStorage.setItem(
// 		'sentFirebaseMessagingToken',
// 		currentToken ? currentToken : ''
// 	);
// }
//
//
//
// //
// // messaging.setBackgroundMessageHandler(function(payload) {
// //
// // 	const promiseChain = clients
// // 		.matchAll({
// // 			type: 'window',
// // 			includeUncontrolled: true,
// // 		})
// // 		.then(windowClients => {
// // 			for (let i = 0; i < windowClients.length; i++) {
// // 				const windowClient = windowClients[i]
// // 				windowClient.postMessage(payload)
// // 			}
// // 		})
// // 		.then(() => {
// // 			return registration.showNotification('my notification title')
// // 		})
// // 	return promiseChain
// // })
// //
// //
// //
// // navigator.serviceWorker.addEventListener('message', (message) => console.log(message))
// //
// // self.addEventListener('notificationclick', function(event) {
// // 	// do what you want
// // 	// ...
// // })