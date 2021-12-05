import React, {useState, useContext} from "react"
import {Modal, Form, Button} from "react-bootstrap"
import {createGroup, fetchGroups} from "../../http/reviewAPI"
import {Context} from "../../index";

const CreateGroup = ({show, onHide}) => {

	const {review} = useContext(Context)

	const [value, setValue] = useState("") 
	const addGroup = () => {
		createGroup({name: value}).then(() => {
			fetchGroups().then(data => review.setGroups(data))
			setValue('')
			onHide()
  	})
	}	
	return (
		<Modal show={show} onHide={onHide} centered>
      		<Modal.Header closeButton onClick={onHide}>
        		<Modal.Title>
          			Add group
        		</Modal.Title>
      		</Modal.Header>
      		<Modal.Body>
        		<Form>
					<Form.Control
						value={value}
						onChange={event => setValue(event.target.value)}
						placeholder={"Group?"}
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button 
					variant="outline-success" 
					onClick={addGroup}>
						Add Group
					</Button>
			</Modal.Footer>
		</Modal>
  );
};  

export default CreateGroup