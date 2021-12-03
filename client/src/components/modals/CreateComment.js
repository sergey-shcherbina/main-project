import React, {useState, useContext} from 'react'
import {Modal, Form, Button, Container} from 'react-bootstrap'
import {createComment, fetchComments} from "../../http/reviewAPI"
import {Context} from "../../index"
import jwt_decode from "jwt-decode"

const CreateComment = () => {
  const [value, setValue] = useState("") 
	const [visible, setVisible] = useState(false)
	const {review, user} = useContext(Context)
  const userData = jwt_decode(localStorage.getItem("token"))
	const onHide = () => {
		setVisible(false)
	}
	const addComment = () => {
    console.log(userData.id)
    createComment({text: value, userId: userData.id, reviewId: review.selectedReview.id}).then(() => {
      fetchComments().then(data => review.setComments(data)) //review.selectedReview.id
      setValue("")
      onHide()
    }) 
  }
	return (
		<Container>
		<Button 
			variant="outline-success" 
			className="mt-4"
			style={{width: "23vw", border: "none"}}
			onClick={() => {setVisible(true)}}
		>
			<h3>Leave a comment</h3>
		</Button>
    <Modal show={visible} onHide={onHide} size="lg">
		<Modal.Header closeButton onClick={onHide}>
				<Modal.Title id="contained-modal-title-vcenter">
				Your comment
				</Modal.Title>
		</Modal.Header>
      <Modal.Body>
        <Form>
					<Form.Control
						as="textarea"
						value={value}
						style={{height: "40vh"}}
						onChange={event => setValue(event.target.value)}
						placeholder={"What do you think?"}
					/>
      	</Form>
			</Modal.Body>
				<Modal.Footer>
					{/* <Button variant="outline-danger" onClick={onHide}>Close</Button> */}
					<Button variant="outline-success" size="lg" onClick={addComment}>Add comment</Button>
				</Modal.Footer>
			</Modal>
		</Container>
  );
};  

export default CreateComment
