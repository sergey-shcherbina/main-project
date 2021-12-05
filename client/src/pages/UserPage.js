import React, {useState, useContext} from "react"
import {Container, Button, Dropdown} from "react-bootstrap"
import {observer} from "mobx-react-lite"
import {Context} from "../index"
import ListReviews from "../components/ListReviews"
import CreateReview from "../components/modals/CreateReview"
import AddImage from "../components/modals/AddImage"
import EditReview from "../components/modals/EditReview"
import {removeReview, fetchReviews} from "../http/reviewAPI"
import {useNavigate} from "react-router-dom"
import jwt_decode from "jwt-decode"

const UserPage = observer(() => {
	const {review} = useContext(Context)
  const navigate = useNavigate()
  const userData = jwt_decode(localStorage.getItem("token"))

	const deleteReview = () => {
		removeReview(review.selectedReview.id).then(data => 
		fetchReviews().then(data => review.setReviews(data)))
 }

	const copy = review.reviews.filter(rev => rev.userId === userData.id)
	const [reviewVisible, setReviewVisible] = useState(false)
	const [editVisible, setEditVisible] = useState(false)
  const [imageVisible, setImageVisible] = useState(false)
	const drop =
		<Dropdown drop="end">
			<Dropdown.Toggle variant="outline-light" size="lg" style={{border: "none"}} />
				<Dropdown.Menu>
					<Dropdown.Item 
						onClick={() => setEditVisible(true)}
					>
						Edit
					</Dropdown.Item>
          <Dropdown.Item 
						onClick={() => setImageVisible(true)}
					>
						Add image
					</Dropdown.Item> 
					<Dropdown.Item 
						onClick={deleteReview}	
					>
						Delete
					</Dropdown.Item>
					<Dropdown.Item 
      onClick={() => navigate("/review/" + review.selectedReview.id)}
     >
      Open in view mode
     </Dropdown.Item> 
				</Dropdown.Menu>
			</Dropdown>	
  return (
    <Container className="mt-2 d-flex flex-column">
			<div className="d-flex justify-content-center">
				 <Dropdown>
						<Dropdown.Toggle 
							variant="outline-primary" 
							style={{border: "none", fontSize: 25}}
						>
							{/* {sort} */}
							Sort
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{/* <Dropdown.Item onClick={() => setSort("Created date")}>Created date</Dropdown.Item> */}
							{/* <Dropdown.Item onClick={() => setSort("Updated date")}>Updated date</Dropdown.Item> */}
							<Dropdown.Item>Created date</Dropdown.Item>
							{/* <Dropdown.Item>Updated date</Dropdown.Item> */}
							<Dropdown.Item>Raiting</Dropdown.Item>
							<Dropdown.Item>Likes</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>	 
				 <Button 
						variant="outline-primary" 
						style={{border:"none", fontSize: 25}}
						onClick={() => setReviewVisible(true)}
					>
						Write a new review 
					</Button>
					<Dropdown>
						<Dropdown.Toggle 
							variant="outline-primary" 
							style={{border: "none", fontSize: 25}}
						>
							{review.selectedGroup.name || "Filter"} {console.log(review.selectedGroup.id)}
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
			</div>
			<ListReviews copy={copy} drop={drop} w="95vw" h="78vh" />
			<CreateReview show={reviewVisible} onHide={() => setReviewVisible(false)} />
      <AddImage show={imageVisible} onHide={() => setImageVisible(false)} />
			<EditReview show={editVisible} onHide={() => setEditVisible(false)} />
		</Container>
  )
})

export default UserPage
