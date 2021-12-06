import {$authHost, $host} from "./index";

export const createGroup = async (group) => {
  const {data} = await $authHost.post("/group", group)
  return data
}
export const fetchGroups = async () => {
  const {data} = await $host.get("/group")
  return data
}
export const createTag = async (tag) => {
  const {data} = await $authHost.post("/tag", tag)
  return data
}
export const fetchTags = async () => {
  const {data} = await $authHost.get("/tag")
  return data
}
export const createReview = async (review) => {
  const {data} = await $authHost.post("/review", review)
  return data
}
export const editReview = async (id, review) => {
  const {data} = await $authHost.put("/review/" + id, review)
  return data
}
export const fetchReviews = async (groupId, userId) => {
  const {data} = await $host.get("/review", {params: {groupId, userId}})
  return data
}
export const removeReview = async (id) => {
  const {data} = await $authHost.delete("/review/" + id)
  return data 
}
// export const fetchOneReview = async (id) => {
//   const {data} = await $host.get('/review/' + id)
//   return data
// }
export const createLike = async (like) => {
  const {data} = await $authHost.post("/like", like)
  return data
}
export const fetchLikes = async (reviewId, userId) => {
  const {data} = await $authHost.get("/like", {params: {reviewId, userId}})
  return data
}
export const createRating = async (rating) => {
  const {data} = await $authHost.post("/rating", rating)
  return data
}
export const fetchRatings = async (reviewId, userId) => {
  const {data} = await $authHost.get("/rating", {params: {reviewId, userId}})
  return data
}
export const createComment = async (comment) => {
  const {data} = await $authHost.post("/comment", comment)
  return data
}
export const fetchComments = async (reviewId, userId) => {
  const {data} = await $authHost.get("/comment", {params: {reviewId, userId}})
  return data
}
export const createImage = async (image) => {
  const {data} = await $authHost.post("/image", image)
  return data
}
export const fetchImages = async (reviewId, order) => {
  const {data} = await $authHost.get("/image", {params: {reviewId, order}})
  return data
}

