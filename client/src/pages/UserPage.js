import React, {useState, useContext, useEffect} from "react"
import {Container, Button, Dropdown} from "react-bootstrap"
import {observer} from "mobx-react-lite"
import {Context} from "../index"
// import {fetchGroups, fetchReviews} from "../http/reviewAPI"
import ListReviews from "../components/ListReviews"
import CreateReview from "../components/modals/CreateReview"
import CreateGroup from "../components/modals/CreateGroup"
import CreateTag from "../components/modals/CreateTag"
// import { TagCloud } from "react-tagcloud"

const UserPage = observer(() => {
	const {review} = useContext(Context)

	// const [tag, setTag] = useState("")

	const copy = review.reviews.slice(0)
	const [createVisible, setCreateVisible] = useState(false)
	const [groupVisible, setGroupVisible] = useState(false)
	const [tagVisible, setTagVisible] = useState(false)
	const drop =
		<Dropdown drop="end">
			<Dropdown.Toggle variant="outline-light" style={{border: "none"}} />
			<Dropdown.Menu>
				<Dropdown.Item>Edit</Dropdown.Item> 
        <Dropdown.Item >Delete</Dropdown.Item>
        <Dropdown.Item >Open in view mode</Dropdown.Item> 
  	 	</Dropdown.Menu>
		</Dropdown>

  return (
    <Container className="mt-4">
			<Container className="d-flex justify-content-center mt-3">
				<div className="d-flex flex-column align-items-center" style={{width: "30vw"}}>
					<Dropdown drop="end">
						<Dropdown.Toggle 
							variant="outline-primary"
							size="lg" 
							style={{border: "none"}}
						>
							Filter 
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item>Books</Dropdown.Item>
							<Dropdown.Item>Movies</Dropdown.Item>
							<Dropdown.Item>Games</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>	
					<Dropdown drop="end">
						<Dropdown.Toggle 
							variant="outline-primary"
							size="lg" 
							style={{border: "none"}}
						>
							Sort 
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item>Created date</Dropdown.Item>
							<Dropdown.Item>Update date</Dropdown.Item>
							<Dropdown.Item>Raiting</Dropdown.Item>
							<Dropdown.Item>Likes</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>	
					<h3>Add</h3><h3>review:</h3>
					<Dropdown drop="end">
						<Dropdown.Toggle 
							size="lg"
							variant="outline-primary" 
							style={{border: "none"}}
						>
							Group?
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{review.groups.map(group =>
								<Dropdown.Item key={group.id}>{group.name}</Dropdown.Item> 
							)}
						</Dropdown.Menu>
					</Dropdown>
					<Button
						size="lg" 
						variant="outline-primary" 
						style={{border:"none"}}
						onClick={() => setGroupVisible(true)}
					>
						Add group
					</Button>
					<Button
						size="lg" 
						variant="outline-primary" 
						style={{border:"none"}}
						//onClick={() => setTagVisible(true)}
					>
						Tag?
					</Button>
					<Button
						size="lg" 
						variant="outline-primary" 
						style={{border:"none"}}
						onClick={() => setTagVisible(true)}
					>
						Add tag	
					</Button>
					<Dropdown drop="end">
						<Dropdown.Toggle size="lg" variant="outline-primary" style={{border: "none"}}>Rate?</Dropdown.Toggle>
						<Dropdown.Menu>
							{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(rate =>
        				<Dropdown.Item key={rate}>{rate}</Dropdown.Item> 
      				)}
						</Dropdown.Menu>
					</Dropdown>
					<Button
						size="lg" 
						variant="outline-primary" 
						style={{border:"none"}}
						onClick={() => setCreateVisible(true)}
					>
						Review text
					</Button>
				</div> 
				<ListReviews copy={copy} drop={drop} />
			</Container> 
			<CreateReview show={createVisible} onHide={() => setCreateVisible(false)} />
			<CreateGroup show={groupVisible} onHide={() => setGroupVisible(false)} />
			<CreateTag show={tagVisible} onHide={() => setTagVisible(false)} />
			{/* <Container style={{overflow: "auto", maxHeight: "20vh"}}>
        <TagCloud
          minSize={25}
          maxSize={45}
          tags={dataTags}
          style={{cursor: 'pointer'}}
          onClick={tag => {setTag(tag.value)}}
        /> 
      </Container>*/}
		</Container>
  )
})

export default UserPage
//  <Dropdown className="d-flex">
// 					<h3 className="mt-2">Sort</h3>
// 					<Dropdown.Toggle variant="outline-primary" style={{border: "none"}} />
// 					<Dropdown.Menu>
// 						<Dropdown.Item>Created date</Dropdown.Item>
// 						<Dropdown.Item>Update date</Dropdown.Item>
// 						<Dropdown.Item>Raiting</Dropdown.Item>
// 						<Dropdown.Item>Likes</Dropdown.Item>
// 					</Dropdown.Menu>
// 				</Dropdown>