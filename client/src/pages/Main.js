import React, {useContext, useEffect, useState} from "react"
import {Container, Dropdown} from "react-bootstrap"
import {TagCloud} from "react-tagcloud"
import {fetchGroups, fetchReviews, fetchTags, fetchComments, fetchLikes, fetchRatings, fetchImages} from "../http/reviewAPI"
import {fetchUsers} from "../http/userAPI"
import {observer} from "mobx-react-lite"
import {Context} from "../index"
import GroupBar from "../components/GroupBar"
import ListReviews from "../components/ListReviews"
import Searchmodal from "../components/modals/Searchmodal"
import {useNavigate} from "react-router-dom"

const Main = observer(() => {

  const {review, user} = useContext(Context)
  const navigate = useNavigate()
  const [searchVisible, setSearchVisible] = useState(false)
  // const [copy, setCopy] = useState(null)
  const [tag, setTag] = useState("")

	useEffect(() => {
    fetchGroups().then(data => review.setGroups(data))
    fetchReviews().then(data => review.setReviews(data))
    fetchUsers().then(data => user.setUsers(data))
    fetchTags().then(data => review.setTags(data))
    fetchComments().then(data => review.setComments(data))
    fetchLikes().then(data => review.setLikes(data))
    fetchRatings().then(data => review.setRatings(data))
    fetchImages().then(data => review.setImages(data))
  }, [])

  console.log(review.selectedGroup)
  console.log(review.images)
  
  console.log(review.tags)

  // const revCopy = [...review.reviews]
  let revCopy = Object.assign([], review.reviews)

  if (review.selectedGroup.id) {
    revCopy = revCopy.filter(rev => rev.groupId === review.selectedGroup.id)
  } 
  let rateCopy = Object.assign([], revCopy)
  // let revC = [...revCopy]
  rateCopy.map(rev => {rev.rating = (review.ratings.length && review.ratings.filter(rt => rt.reviewId === rev.id)
    .reduce((res, elem) => res + elem.rate, 0)/review.ratings.filter(rt => rt.reviewId === rev.id).length)})
  // const copyRate = revCopy.sort(function(a, b) {return b.rating - a.rating})
  const drop =
		<Dropdown drop= "end">
			<Dropdown.Toggle variant="outline-light" size = "lg" style={{border: "none"}} />
			<Dropdown.Menu>
        <Dropdown.Item
         onClick={() => navigate("/review/" + review.selectedReview.id)}
        >
          Open in view mode
        </Dropdown.Item> 
  	 	</Dropdown.Menu>
		</Dropdown>

  let dataTags = []
  review.tags.forEach(tag => dataTags.push({value: tag.word, count: Math.floor(Math.random() * 100)}))

       console.log(dataTags)

  return (
    <div className="d-flex flex-column align-items-center">  
      <Container className="d-flex mt-3 justify-content-center">
        <GroupBar />
        <div className="d-flex flex-column align-items-center" style={{width: "70vw"}}>
          <Container className="d-flex justify-content-center"><h2>Latest reviews:</h2></Container>
          <ListReviews 
            copy={revCopy.sort((a,b) => {
              let dA = new Date(a.createdAt).getTime(), dB = new Date(b.createdAt).getTime()
              return dB - dA
            })} 
            drop={drop} 
            w="70vw" 
            h="23vh"
          />
          <Container className="d-flex justify-content-center mt-2"><h2>Rating reviews:</h2></Container> 
          <ListReviews 
            copy={rateCopy.sort((a, b) => b.rating - a.rating)} 
            drop={drop} 
            w="70vw" 
            h="23vh" 
          />  
        </div>
      </Container>
      <Container style={{overflow: "auto", maxHeight: "30vh", marginTop: "-10vh"}}>
        <TagCloud
          // key={Date.now}
          minSize={25}
          maxSize={45}
          tags={dataTags}
          style={{cursor: 'pointer'}}
          onClick={tag => {setTag(tag.value); setSearchVisible(true)}}
        />
      </Container>
      <Searchmodal show={searchVisible} onHide={() => setSearchVisible(false)} tag={tag} data={dataTags} />  
    </div>
  )
})

export default Main
