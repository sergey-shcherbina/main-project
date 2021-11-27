import {makeAutoObservable} from "mobx"

export default class reviewStore {
	constructor() {
		this._groups = []
		this._tags = []
		this._reviews = []
		this._selectedGroup = {}
		this._selectedReview = {}
		// this._visible = false
		makeAutoObservable(this)
	}
	setGroups(groups) {
		this._groups = groups
	}
	setTags(tags) {
		this._tags = tags
	}
	setReviews(reviews) {
		this._reviews = reviews
	}
	setSelectedGroup(group) {
		this._selectedGroup = group
	}
	setSelectedReview(review) {
		this._selectedReview = review
	}
	// setVisible(bool) {
	// 	this._visible = bool
	// }

	get groups() {
		return this._groups
	}
	get reviews() {
		return this._reviews
	}
	get tags() {
		return this._tags
	}
	get selectedGroup() {
		return this._selectedGroup
	}
	get selectedReview() {
		return this._selectedReview
	}
	// get visible() {
	// 	return this._visible
	// }
}