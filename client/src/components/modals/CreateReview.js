import React, {useState, useContext} from "react"
import {Modal, Form, Button, Container, Dropdown} from "react-bootstrap"
import {Context} from "../../index"
import CreateGroup from "./CreateGroup"

const CreateReview = ({show, onHide}) => {

	const {review} = useContext(Context)
  const [value, setValue] = useState('') 

	const create = () => {
    setValue('')
    onHide()
  }
	return (
		<Container>
    	<Modal show={show} onHide={onHide} size="lg" >
				<Modal.Header closeButton onClick={onHide}>
					<Modal.Title >
					Your review
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Control
							style={{height: '50vh'}}
							as="textarea"
							value={value}
							onChange={event => setValue(event.target.value)}
							placeholder={"What do you think?"}
						/>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					{/* <Button variant="outline-danger" onClick={onCreate}>Close</Button> */}
					<Button variant="outline-success" onClick={create}>Add review</Button>
				</Modal.Footer>
			</Modal>
		</Container>
  );
};  

export default CreateReview