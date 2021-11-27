import React, {useState} from 'react'
import {Modal, Form, Button, Container} from 'react-bootstrap'

const CreateReview = ({text, show, onHide}) => {

  const [value, setValue] = useState(text) 
	const [group, setGroup] = useState('') 
	const [rate, setRate] = useState('') 

	const create = () => {
    // setValue('')
		// setGroup('')
		// setRate('')
    onHide()
  }
	return (
		<Container>
    	<Modal show={show} onHide={onHide} size="lg" >
      	<Modal.Header closeButton onClick={onHide}>
        	<Modal.Title >
          	Edit review
        	</Modal.Title>
      	</Modal.Header>
      	<Modal.Body>
        	<Form>
						<Form.Control
							value={group}
							onChange={event => setGroup(event.target.value)}
							placeholder={"group?"}
						/>
						<Form.Control
							style={{height: '50vh'}}
							as="textarea"
							value={value}
							onChange={event => setValue(event.target.value)}
							placeholder={"What do you think?"}
						/>
						<Form.Control
							value={rate}
							onChange={event => setRate(event.target.value)}
							placeholder={"your rate?"}
						/>
      		</Form>
      	</Modal.Body>
      	<Modal.Footer>
            {/* <Button variant="outline-danger" onClick={onHide}>Close</Button> */}
        	<Button variant="outline-success" onClick={create}>Add review</Button>
        </Modal.Footer>
      </Modal>
		</Container>
  );
};  

export default CreateReview