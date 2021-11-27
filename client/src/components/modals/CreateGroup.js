import React, {useState, useContext} from "react"
import {Modal, Form, Button, Container, NavLink, Nav} from "react-bootstrap"
import {createGroup} from "../../http/reviewAPI"
import {Context} from "../../index";

const CreateGroup = ({show, onHide, onToggle}) => {

	const {review} = useContext(Context)

	const [value, setValue] = useState('') 

	const addGroup = () => {
		createGroup({name: value}).then(data => {
			setValue('')
			onHide()
			ontoggle()
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
				{/* <Button variant="outline-danger" onClick={onHide}>Close</Button> */}
				<Button 
					variant="outline-success" 
					onClick={addGroup}>
						<Nav.Link href="/user_page">Add group</Nav.Link>
					</Button>
			</Modal.Footer>
		</Modal>
  );
};  

export default CreateGroup