//
// export default function sendPush() {
//
//
// 	if ('serviceWorker' in navigator) {
// 		window.addEventListener('load', async () => {https://github.com/F1-Final-Project/Admin-Panel/blob/FoodWarehouse/src/push/sendPush.js
// 			const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
// 				updateViaCache: 'none',
// 				scope: '/',
// 			})
//
// 			const subscription = await registration.pushManager.subscribe({
// 				userVisibleOnly: true,
// 				applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
// 			})
//
// 			console.log('Registered push')
//
// 			console.log('Sending push', subscription)
//
// 			// await fetch('http://localhost:3002/subscribe', {
// 			// 			// 	method: 'POST',
// 			// 			// 	body: JSON.stringify(subscription),
// 			// 			// 	headers: {
// 			// 			// 		'content-type': 'application/json',
// 			// 			// 	},
// 			// 			//
// 			// 			// })
// 			console.log('Push send', subscription)
// 		})
//
// 	}
// }
//
//
// export function urlBase64ToUint8Array(base64String) {
// 	const padding = '='.repeat((4 - base64String.length % 4) % 4);
// 	const base64 = (base64String + padding)
// 		.replace(/-/g, '+')
// 		.replace(/_/g, '/');
//
// 	const rawData = window.atob(base64);
// 	const outputArray = new Uint8Array(rawData.length);
//
// 	for (let i = 0; i < rawData.length; ++i) {
// 		outputArray[i] = rawData.charCodeAt(i);
// 	}
// 	return outputArray;
// }
