import React, {useState, useContext} from "react"
import {Modal, Form, Button} from "react-bootstrap"
import {createImage, fetchImages} from "../../http/reviewAPI"
import {Context} from "../../index"
import {observer} from "mobx-react-lite"

const AddImage = observer(({show, onHide}) => {

	const {review} = useContext(Context)
  const [order, setOrder] = useState("0")
	const [file, setFile] = useState(null) 
  console.log(review.selectedReview.id)
	const addImg = () => {
    const formData = new FormData()
    formData.append("order", order)
    formData.append("reviewId", review.selectedReview.id)
    formData.append("img", file)
		createImage(formData).then(data =>
      {
		  fetchImages().then(data => review.setImages(data))
			onHide()
  	 }
    )
	}	
  // const selectedFile = event => {
  //   setFile(event.target.files[0])
  // }
	return (
		<Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title>
          Add image
        </Modal.Title>
      	  </Modal.Header>
      		<Modal.Body>
        	<Form>
            <Form.Control
              placeholder="Photo number?"
              type="number"
              onChange={event => setOrder(event.target.value)}
            />
            <Form.Control
              className="mt-3"
              type="file"
              onChange={event => setFile(event.target.files[0])}
            />
            <hr/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button 
					variant="outline-success" 
					onClick={addImg}>
						Add images
					</Button>
			</Modal.Footer>
		</Modal>
  )
})  

export default AddImage