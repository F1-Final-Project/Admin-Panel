
export default function sendPush() {
	const publicVapidKey = 'BNlTG7jb-XzjEDXvDkCeNOphWLmjHBPSuKC4Buf0Lwf8q-PZhD0fE63xAB4wIrChxJGzlsvV_L4QT-Estb0rkSI'

	if ('serviceWorker' in navigator) {
		window.addEventListener('load', async () => {
			const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
				updateViaCache: 'none',
				scope: '/',
			})

			return await registration.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
			})

			// console.log('Registered push')
			//
			// console.log('Sending push', subscription)

		})

	}
}


export function urlBase64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding)
		.replace(/-/g, '+')
		.replace(/_/g, '/');

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}