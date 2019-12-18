import axios from 'axios'

export default class Base {
	constructor() {
		this.url = 'https://f1-server-api.herokuapp.com';  //'https://f1-server-api.herokuapp.com'
		// this.url = 'http://localhost:3002';  //'https://f1-server-api.herokuapp.com'
	}
	getUserInfo() {
		return sessionStorage.getItem('token');
	}

	getAuthHeader() {
		return { headers: { 'x-access-token': this.getUserInfo() } }
	}

	getUrl(path) {
		return `${this.url}/${path}`
	}

	get(url) {
		console.log('saxsaxsx', this.getAuthHeader())
		return axios.get(this.getUrl(url), this.getAuthHeader());

	}

	post(url, data) {
		return axios.post(this.getUrl(url), data, this.getAuthHeader())
	}

	put(url, data) {
		return axios.put(this.getUrl(url), data, this.getAuthHeader())
	}

	delete(url) {
		return axios.delete(this.getUrl(url), this.getAuthHeader())
	}
}
