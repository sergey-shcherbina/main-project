import React, {useState, useContext} from "react"
import {Modal, Form, Button, Container} from "react-bootstrap"
import {createTag, fetchTags} from "../../http/reviewAPI"
import {Context} from "../../index"

const CreateTag = ({show, onHide}) => {
	const {review} = useContext(Context)
	const [value, setValue] = useState("") 

	const addTag = () => {
		createTag({word: value}).then(() => {
			fetchTags().then(data => review.setTags(data))
			setValue("")
			onHide()
  	})
	}	
	return (
		<Modal show={show} onHide={onHide} centered>
      		<Modal.Header closeButton onClick={onHide}>
        		<Modal.Title>
          		Add tag
        		</Modal.Title>
      		</Modal.Header>
      		<Modal.Body>
        		<Form>
					<Form.Control
						value={value}
						onChange={event => setValue(event.target.value)}
						placeholder={"Tag?"}
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				{/* <Button variant="outline-danger" onClick={onHide}>Close</Button> */}
				<Button variant="outline-success" onClick={addTag}>Add tag</Button>
			</Modal.Footer>	
		</Modal>
  );
};  

export default CreateTag