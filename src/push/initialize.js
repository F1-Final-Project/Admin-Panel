import firebase from 'firebase/app'
import 'firebase/messaging'


export function initializePush() {


	/**
	 * @desc Интерфейс службы сообщений Firebase.
	 */

	const messaging = firebase.messaging()

	/**
	 * @desc Метод Notification интерфейса запрашивает разрешение от пользователя для текущего происхождения на уведомление отображения.
	 * Создает и получает токен
	 */
	messaging
		.requestPermission()
		.then(async function f() {

			return await messaging.getToken()
		})
		.then(async function(token) {

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

	/**
	 * @desc Обрабатывать сообщения, когда ваше веб-приложение находится в запущеном состоянии
	 */

	messaging.onMessage(payload => {
		console.log('Notification Received', payload)
	})

}


/**
 * @desc Функция отправки токена в LocalStorage
 */
function sendTokenToLocalStorage(currentToken) {
	if (!isTokenSentToLocalStorage(currentToken)) {
		console.log('Отправка токена на в localStorage...')
		setTokenSentToLocalStorage(currentToken)
	} else {
		console.log('Токен уже отправлен на сервер.')
	}
}

/**
 * @desc Функция проверки токена в LocalStorage
 */

function isTokenSentToLocalStorage(currentToken) {
	return window.localStorage.getItem('sentFirebaseMessagingToken') === currentToken
}

/**
 * @desc Функция изменения токена в LocalStorage
 */

function setTokenSentToLocalStorage(currentToken) {
	window.localStorage.setItem(
		'sentFirebaseMessagingToken',
		currentToken ? currentToken : '',
	)
}
