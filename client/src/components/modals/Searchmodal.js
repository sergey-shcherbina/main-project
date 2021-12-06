import React, {useState} from "react"
import {Modal, Form, Button, Container} from "react-bootstrap"
import {TagCloud} from "react-tagcloud"

const Searchmodal = ({show, onHide, tag, data}) => {
  const [value, setValue] = useState("") 
  
	const search = () => {
    setValue('')
    onHide()
  }
	return (
		<Container>
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          Search
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
					<Form.Control
            style={{color: "red", fontSize: 40, fontWeight: "bold"}}
						value={value}
						onChange={event => setValue(event.target.value)}
						placeholder={tag || "Tag or word for search?"}
					/>
      	</Form><br/>
				Tags for search
				<TagCloud
          minSize={20}
          maxSize={35}
          tags={data}
          style={{cursor: 'pointer'}}
          onClick={tag => setValue(tag.value)}
        />
      </Modal.Body>
        <Modal.Footer>
            {/* <Button variant="outline-danger" onClick={onHide}>Close</Button> */}
        	<Button variant="outline-success" onClick={search}>Search</Button>
        </Modal.Footer>
      </Modal>
		</Container>
  );
};  

export default Searchmodal
