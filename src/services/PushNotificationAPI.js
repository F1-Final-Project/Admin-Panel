import Base from './base'

export default class pushNotificationAPI extends Base {

	pushSend(data) {
		return super.post(`push/sendMassage`, data).then(res => res.data)
	}
}