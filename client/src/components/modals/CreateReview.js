import React, {useState, useContext} from "react"
import {Modal, Form, Button, Container, Dropdown, Row} from "react-bootstrap"
import {Context} from "../../index"
import {createReview, fetchReviews} from "../../http/reviewAPI"
import CreateGroup from "./CreateGroup"
import CreateTag from "./CreateTag"
import ShowTags from "./ShowTags"
import jwt_decode from "jwt-decode"
// import {TagCloud} from "react-tagcloud"

const CreateReview = ({show, onHide}) => {
	const {review} = useContext(Context)
	const [groupVisible, setGroupVisible] = useState(false)
	const [tagVisible, setTagVisible] = useState(false)
	const [tagsVisible, setTagsVisible] = useState(false)
	const [name, setName] = useState("")
  const [text, setText] = useState("")
	const [rate, setRate] = useState(0)
	// const [tag, setTag] = useState("")

	let dataTags = []
  review.tags.forEach(tag => dataTags.push({value: tag.word, count: Math.floor(Math.random() * 100)}))

	const userData = jwt_decode(localStorage.getItem("token"))
	console.log(userData.id)

	const addReview = () => {
		createReview({name, text, authorRate: rate, userId: userData.id, groupId: review.selectedGroup.id}).then(() => {
			fetchReviews().then(data => review.setReviews(data))
			review.setSelectedGroup("")
			setText("")
			setName("")
			setRate(0)
			onHide()
		})
  }
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
									{/* {review.selectedGroup.name || "Group?"} {console.log(review.selectedGroup.id)} */}
									<Dropdown.Toggle 
										variant="outline-primary" 
										style={{border: "none", width: "7vw"}}
									>
										{review.selectedGroup.name || "Group?"} {console.log(review.selectedGroup.id)}
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
									{/* {rate || "Rate?"}<br/> */}
									<Dropdown.Toggle 
										variant="outline-primary" 
										style={{border: "none"}}
									>
										{rate || "Rate?"}
									</Dropdown.Toggle>
									<Dropdown.Menu>
										{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(rate =>
											<Dropdown.Item 
												key={rate}
												onClick={() => setRate(rate)}
											>
												{rate}
											</Dropdown.Item> 
										)}
									</Dropdown.Menu>
								</Dropdown>
								{/* <Button  
									variant="outline-primary" 
									style={{border:"none", width: "6vw"}}
									onClick={() => setTagsVisible(true)}
								>
									Add tag	
								</Button> */}
								<Button
									variant="outline-primary" 
									style={{border:"none", width: "6vw"}}
									onClick={() => setTagVisible(true)}
								>
									Create tag
								</Button> 
							</div> 
							<div style={{width: "80vw"}}>
								<Form.Control
									value={name}
									onChange={event => setName(event.target.value)}
									placeholder={"Review title?"}
								/>	
								<Form.Control
									style={{height: '60vh', marginTop: 5}}
									as="textarea"
									value={text}
									onChange={event => setText(event.target.value)}
									placeholder={"What do you think?"}
								/>
							</div>		
						</div>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					{/* <Button variant="outline-danger" onClick={onCreate}>Close</Button> */}
					<Button variant="outline-success" size="lg" onClick={addReview}>Add review</Button>
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
  );
};  

export default CreateReview