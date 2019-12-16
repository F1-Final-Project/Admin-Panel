import axios from 'axios'

export default class Base {
	constructor() {
		this.url = 'http://localhost:3002';  //'https://f1-server-api.herokuapp.com'
	}

	getUrl(path) {
		return `${this.url}/${path}`
	}

	get(url) {
		return axios.get(this.getUrl(url))
	}

	post(url, data) {
		return axios.post(this.getUrl(url), data)
	}

	put(url, data) {
		return axios.put(this.getUrl(url), data)
	}

	delete(url) {
		return axios.delete(this.getUrl(url))
	}
}
