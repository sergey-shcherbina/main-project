import {makeAutoObservable} from "mobx"

export default class reviewStore {
	constructor() {
		this._groups = []
		this._tags = []
		this._reviews = []
		this._comments = []
		this._likes = []
		this._ratings = []
		this._selectedGroup = {}
		this._selectedReview = {}
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
	setComments(comments) {
		this._comments = comments
	}
	setLikes(likes) {
		this._likes = likes
	}
	setRatings(ratings) {
		this._ratings = ratings
	}
	setSelectedGroup(group) {
		this._selectedGroup = group
	}
	setSelectedReview(review) {
		this._selectedReview = review
	}
	get groups() {
		return this._groups
	}
	get reviews() {
		return this._reviews
	}
	get tags() {
		return this._tags
	}
	get comments() {
		return this._comments
	}
	get likes() {
		return this._likes
	}
	get ratings() {
		return this._ratings
	}
	get selectedGroup() {
		return this._selectedGroup
	}
	get selectedReview() {
		return this._selectedReview
	}
}