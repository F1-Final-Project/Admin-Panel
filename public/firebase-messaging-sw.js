importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js')
import * as configFile from '../src/pseudoEnv'


const config = {
	apiKey: configFile.APIKEY,
	authDomain: configFile.AUTHDOMAIN,
	databaseURL: configFile.DATABASEURL,
	projectId: configFile.PROJECTID,
	storageBucket: configFile.STOREGEBUCKET,
	messagingSenderId: configFile.MESSAGINGSENDERID,
	appId: configFile.APPID,
}

/**
 * @desc Интерфейс службы сообщений Firebase.
 */

firebase.initializeApp(config)
const messaging = firebase.messaging()

/**
 * @desc Обрабатывать сообщения, когда ваше веб-приложение находится в фоновом режиме
 */

messaging.setBackgroundMessageHandler(payload => {
	const title = payload.notification.title
	const options = {
		body: payload.notification.body,
		icon: payload.notification.icon,
	}
	return self.registration.showNotification(title, options)
})

/**
 * @desc Обрабатывать сообщения, при нажатии на уведомление
 */

self.addEventListener('notificationclick', function(event) {
	const target = event.notification.data.click_action || '/'
	event.notification.close()

	event.waitUntil(clients.matchAll({
		type: 'window',
		includeUncontrolled: true,
	}).then(function(clientList) {
		// clientList почему-то всегда пуст!?
		for (let i = 0; i < clientList.length; i++) {
			const client = clientList[i]
			if (client.url === target && 'focus' in client) {
				return client.focus()
			}
		}
		return clients.openWindow(target)
	}))
})

/**
 * @desc Обрабатывать сообщения, при закрытии уведомление
 */

self.addEventListener('notificationclose', event => {
	const notification = event.notification
	const primaryKey = notification.data
})


/**
 * @desc Регистраци Push уведомления в веб-приложении
 */

self.addEventListener('push', ev => {
	const data = ev.data.json()

	self.registration.showNotification(data.notification.title, {
		body: data.notification.body,
		icon: data.notification.icon,
	})
})

