import {$authHost, $host} from "./index";

export const createGroup = async (group) => {
  const {data} = await $authHost.post('/group', group)
  return data
}

export const fetchGroups = async () => {
  const {data} = await $host.get('/group')
  return data
}

export const createTag = async (tag) => {
  const {data} = await $authHost.post('/tag', tag)
  return data
}

export const fetchTags = async () => {
  const {data} = await $host.get('/tag')
  return data
}

export const createReview = async (review) => {
  const {data} = await $authHost.post('/review', review)
  return data
}

export const fetchReviews = async (groupId, userId) => {
  const {data} = await $host.get('/review', {params: {
    groupId, userId
  }})
  return data
}

export const fetchOneReview = async (id) => {
  const {data} = await $host.get('/review/' + id)
  return data
}
