importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js')


const config = {
	// Project Settings => Add Firebase to your web app
	
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


self.addEventListener('notificationclose', event => {
	const notification = event.notification
	const primaryKey = notification.data
})


self.addEventListener('push', ev => {
	const data = ev.data.json()

	console.log('Got push', data)

	self.registration.showNotification(data.notification.title, {
		body: data.notification.body,
		icon: data.notification.icon,
	})
})

