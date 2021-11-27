import React, {useContext, useEffect, useState} from "react"
import {Container, Dropdown} from "react-bootstrap"
import { TagCloud } from "react-tagcloud"
import {fetchGroups, fetchReviews, fetchTags} from "../http/reviewAPI"
import {observer} from "mobx-react-lite"
import {Context} from "../index"
import GroupBar from "../components/GroupBar"
import ListReviews from "../components/ListReviews"
import Searchmodal from "../components/modals/Searchmodal"

const Main = observer(() => {

  const {review} = useContext(Context)

  const [searchVisible, setSearchVisible] = useState(false)
  const [tag, setTag] = useState("")

	useEffect(() => {
    fetchGroups().then(data => review.setGroups(data))
    fetchReviews().then(data => review.setReviews(data))
    fetchTags().then(data => review.setTags(data))
  }, [])
  
  const copyLast = review.reviews.slice(0).sort((a,b) => {let dA = new Date(a.createdAt).getTime(), dB = new Date(b.createdAt).getTime(); return dB - dA})
  const copyRate = review.reviews.slice(0)
  const drop =
		<Dropdown drop="end">
			<Dropdown.Toggle variant="outline-light" style={{border: "none"}} />
			<Dropdown.Menu>
        <Dropdown.Item>Open in view mode</Dropdown.Item> 
  	 	</Dropdown.Menu>
		</Dropdown>

  let dataTags = []
  review.tags.forEach(tag => dataTags.push({value: tag.word, count: Math.floor(Math.random() * 100)}))

      console.log(dataTags)

  return (
    <div className="d-flex flex-column align-items-center">  
      <Container className="d-flex mt-3" style={{maxHeight: "70vh", justifyContent: "center"}}>
        <GroupBar />
        <div className="d-flex flex-column align-items-center" style={{width: "70vw"}}>
          <Container className="d-flex justify-content-center"><h2>Latest reviews:</h2></Container>
          <ListReviews copy={copyLast} drop={drop} />
          <Container className="d-flex justify-content-center mt-2"><h2>Rating reviews:</h2></Container> 
          <ListReviews copy={copyRate} drop={drop} />  
        </div>
      </Container>
      <Container style={{overflow: "auto", maxHeight: "20vh"}}>
        <TagCloud
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
