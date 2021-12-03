import React, {useState, useContext} from "react"
import {Modal, Form, Button, Container, Card} from "react-bootstrap"
import {TagCloud} from "react-tagcloud"
import {Context} from "../../index"
// import {createReviewTag} from "../../http/reviewAPI"

const ShowTags = ({show, onHide}) => {
	const {review} = useContext(Context) 
  const [tag, setTag] = useState("")

	let dataTags = []
  review.tags.forEach(tag => dataTags.push({id: tag.id, value: tag.word, count: Math.floor(Math.random() * 100)}))
	console.log(dataTags)
	// {tagId, reviewId}
	console.log(tag.id, review.review)
	const addTag = () => {
    // createReviewTag().then(data => {
    // 	onHide()
		// })
  }
	return (
		<Container>
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          Select a tag
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
				<Card><h1 style={{color: "red"}}>{tag.value}</h1></Card>
				<TagCloud
          minSize={20}
          maxSize={35}
          tags={dataTags}
          style={{cursor: "pointer", overflow: "auto", maxHeight: "40vh"}}
          onClick={tag => {setTag(tag)}}
        />
      </Modal.Body>
        <Modal.Footer>
        	<Button size="lg" variant="outline-success" onClick={addTag}>Add tag</Button>
        </Modal.Footer>
      </Modal>

		</Container>
  );
};  

export default ShowTags
