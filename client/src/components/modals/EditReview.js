import React, {useState, useContext, useEffect} from "react"
import {Modal, Form, Button, Container, Dropdown, Row} from "react-bootstrap"
import {Context} from "../../index"
import CreateGroup from "./CreateGroup"
import CreateTag from "./CreateTag"
import ShowTags from "./ShowTags"
import jwt_decode from "jwt-decode"
import {observer} from "mobx-react-lite"
import {editReview, removeReview, fetchReviews, fetchOneReview} from "../../http/reviewAPI"
// import {TagCloud} from "react-tagcloud"

const EditReview = observer(({show, onHide}) => {
	const {review} = useContext(Context)
	let userData = jwt_decode(localStorage.getItem("token"))
	
	console.log(review.selectedReview.name)
	console.log(review.selectedReview.text)
	console.log(review.selectedReview.authorRate)
	
	
	const [groupVisible, setGroupVisible] = useState(false)
	const [tagVisible, setTagVisible] = useState(false)
	const [tagsVisible, setTagsVisible] = useState(false)
	
	let dataTags = []
  review.tags.forEach(tag => dataTags.push({value: tag.word, count: Math.floor(Math.random() * 100)}))

	
	console.log(userData, review.selectedGroup.id)

	const addChanges = () => {
		editReview(review.selectedReview.id, {name: review.selectedReview.name, text: review.selectedReview.text, 
			authorRate: review.selectedReview.authorRate, groupId: review.selectedGroup.id}).then(() => {
			// fetchOneReview(review.selectedReview.id).then(data => review.setSelectedReview(data))
			fetchReviews().then(data => review.setReviews(data))
			onHide()
		})
		
	}
	const deleteReview = () => {
		removeReview(review.selectedReview.id).then(() => {
			fetchReviews().then(data => review.setReviews(data))
			onHide()
		})
	}
	console.log(review.selectedReview)		
 
	return (
		<Container>
    	<Modal show={show} onHide={onHide} size="lg" >
				<Modal.Header closeButton onClick={onHide}>
					<Modal.Title >
						Review
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<div className="d-flex">
							<div className="d-flex flex-column" style={{width:"7vw", justifyContent: "space-around"}}>
								<Dropdown drop="end">
									<Dropdown.Toggle 
										variant="outline-primary" 
										style={{border: "none", width: "7vw"}}
									>
										{review.selectedGroup.name || "Group?"} 
									</Dropdown.Toggle>
									<Dropdown.Menu>
										{review.groups.map(group =>
											<Dropdown.Item 
												key={group.id}	
												onClick={() => review.setSelectedGroup(group)}
											>
												{group.name}
											</Dropdown.Item> 
										)}
									</Dropdown.Menu>
								</Dropdown>
								<Button
									variant="outline-primary" 
									style={{border:"none", width: "6vw"}}
									onClick={() => setGroupVisible(true)}
								>
									Create group
								</Button>
								<Dropdown drop="end">
									<Dropdown.Toggle 
										variant="outline-primary" 
										style={{border: "none"}}
									>
										{/* {review.selectedReview.authorRate || "Rate?"} */}
										Rate
									</Dropdown.Toggle>
									<Dropdown.Menu>
										{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(rate =>
											<Dropdown.Item 
												key={rate}
												onClick={() => review.setSelectedReview({...review.selectedReview, ...{authorRate: rate}})}
											>
												{rate}
											</Dropdown.Item> 
										)}
									</Dropdown.Menu>
								</Dropdown>
								<Button  
									variant="outline-primary" 
									style={{border:"none", width: "6vw"}}
									onClick={() => setTagsVisible(true)}
								>
									Add tag	
								</Button>
								<Button
									variant="outline-primary" 
									style={{border:"none", width: "6vw"}}
									onClick={() => setTagVisible(true)}
								>
									Create tag
								</Button>
								<Button
									variant="outline-primary" 
									style={{border:"none", width: "6vw"}}
									// onClick={() => setGroupVisible(true)}
								>
									Add image
								</Button>
							</div> 
							<div style={{width: "80vw"}}>
								<Form.Control
									value={review.selectedReview.name}
									onChange={event => review.setSelectedReview({...review.selectedReview, ...{name: event.target.value}})}
									placeholder={"Review title?"}
								/>	
								<Form.Control
									style={{height: '60vh', marginTop: 5}}
									as="textarea"
									value={review.selectedReview.text}
									onChange={event => review.setSelectedReview({...review.selectedReview, ...{text: event.target.value}})}
									placeholder={"What do you think?"}
								/>
							</div>		
						</div>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-danger" size="lg" onClick={deleteReview}>Delete Review</Button>
					<Button variant="outline-success" size="lg" onClick={addChanges}>Add Changes</Button>
				</Modal.Footer>
				{/* <Container style={{overflow: "auto", maxHeight: "20vh"}}>
					<TagCloud
						minSize={25}
						maxSize={45}
						tags={dataTags}
						style={{cursor: 'pointer'}}
						onClick={tag => {setTag(tag.value)}}
					/> 
				</Container> */}
			</Modal>
			<CreateGroup show={groupVisible} onHide={() => setGroupVisible(false)} />
			<CreateTag show={tagVisible} onHide={() => setTagVisible(false)} />
			<ShowTags show={tagsVisible} onHide={() => setTagsVisible(false)} />
		</Container>
  )
})  

export default EditReview