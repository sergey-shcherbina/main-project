import {makeAutoObservable} from "mobx"

export default class userStore {
	constructor() {
		this._users = []
		// this._userData = {}
		this._isAuth = false
		this._user = false
		makeAutoObservable(this)
	}
	setIsAuth(bool) {
		this._isAuth = bool
	}
	setUser(user) {
			this._user = user
	}
	setUsers(users) {
		this._users = users
	}
	// setUserData(userData) {
	// 	this._userData = userData
	// }

	
	get isAuth() {
			return this._isAuth
	}
	get user() {
			return this._user
	}
	get users() {
		return this._users
}
}
  
