import React, { useContext, useEffect, useState } from "react"
import { Container, Row, Card, Button, Image, NavLink} from "react-bootstrap"
import star from "../assets/star.svg"
import CreateComment from "../components/modals/CreateComment"
// import {useParams} from "react-router-dom"
import {Context} from "../index"
import {observer} from "mobx-react-lite"
import jwt_decode from "jwt-decode"
import {fetchLikes, createLike, fetchRatings, createRating} from "../http/reviewAPI"

const ReviewPage = observer(() => {
  // const [likes, setLikes] = useState([])
  const [like,setLike] = useState(null)
  const [rating,setRating] = useState(null)
  const userData = jwt_decode(localStorage.getItem("token"))
  const {review, user} = useContext(Context)

  // console.log(review.likes.map(com => console.log(com.userId)))
  

  const addLike = () => {
    fetchLikes(review.selectedReview.id, userData.id).then(data => 
       setLike(data)
    )
    console.log(like)
    if (!like) { 
      createLike({reviewId: review.selectedReview.id, userId: userData.id})
    }
      // .then(() => {
      //   fetchLikes().then(data => setLikes(data))
      // }) 
    
  }
  console.log(review.selectedReview.id)
  console.log(userData.id)
  const addRating = (rate) => {
    fetchRatings(review.selectedReview.id, userData.id).then(data => { 
      setRating(data)
      !rating && createRating({rate, reviewId: review.selectedReview.id, userId: userData.id})
      // .then(data => setRating(data))
    })
  }


  return (
    <Container className="d-flex justyfy-content-between mt-2">
			<Row className="d-flex flex-column" style={{width: '65vw'}}>
				<h2>{review.selectedReview.name}</h2>
				 <Card style={{height: '45vh', width: '65vw', overflow: "auto"}}>
					{
						review.selectedReview.name + " | " + review.selectedReview.authorRate + " | " + 
            new Date(review.selectedReview.createdAt).toUTCString().slice(4, -7) + " | " + 
            review.selectedReview.text
					}						
        </Card> 
				<h2 className="mt-2">Comments</h2>
				<Card style={{height: '30vh', width: '65vw', overflow: "auto"}}>
						{review.comments.filter(elem => elem.reviewId === review.selectedReview.id).map(com => 
              <p key={com.id}>{com.text} author {user.users.reduce((res, elem) => elem.id === com.userId ? elem.name : res, '')}</p>)}
				</Card>
			</Row>
			<Row className="d-flex flex-column" style={{width: '30vw', marginLeft: "4vw"}}>
				<h2 className="ml-5">{'About'}</h2>
				<Card className="d-flex">
					Author: {user.users.reduce((res, elem) => elem.id === review.selectedReview.userId ? elem.name : res, '')}
          <br/>likes: {review.likes.filter(like => like.userId === userData.id).length}
				</Card>
				<Card className="d-flex">
					Group: {review.groups.reduce((res, elem) => elem.id === review.selectedReview.groupId ? elem.name : res, '')}
				</Card>
				<Card className="d-flex">
					Rating from the author: {review.selectedReview.authorRate}
				</Card>
				{/* <Card className="d-flex">
					Tags: {'tags'}
				</Card> */}
				{review.selectedReview.userId === userData.id ?
					<Row className="d-flex flex-column">
						<h2 className="mt-4">Rate the review</h2>
						<Button variant={"outline-warning"} disabled className="mt-2"><h2>Like</h2></Button>
						<div className="d-flex justify-content-around mt-3">
							{[1, 2, 3, 4, 5].map(rate => 
								<div 
									key={rate}
									className="d-flex align-items-center justify-content-center" 
									style={{background: `url(${star}) no-repeat center center `, width: "4.5vw", height: "4.5vw", backgroundSize: "cover", 
									cursor: "pointer", fontSize: "1.8vw"}}
								>
									<Button variant="outline-warning" disabled style={{border: "none", borderRadius: "50%"}}>{rate}</Button>	
								</div>
							)}
						</div>
						<Button 
							variant={"outline-success"} 
							className="mt-4"
							style={{width: "23vw", border: "none"}}
							disabled
						>
							<h3>Leave a comment</h3>
						</Button>
					</Row>	
				:
				user.isAuth ? 
					<Row className="d-flex flex-column">
						<h2 className="mt-4">Rate the review</h2>
						<Button 
              variant="outline-warning" 
              className="mt-2"
              onClick={addLike}
            >
              <h2>Like</h2>
            </Button>
						<div className="d-flex justify-content-around mt-3">
							{[1, 2, 3, 4, 5].map(rate => 
								<div 
									key={rate}
									className="d-flex align-items-center justify-content-center" 
									style={{background: `url(${star}) no-repeat center center `, width: "4.5vw", 
                  height: "4.5vw", backgroundSize: "cover", cursor: "pointer", fontSize: "1.8vw"}}
								>
									<Button 
                    variant="outline-warning" 
                    style={{border: "none", borderRadius: "50%"}}
                    onClick={() => addRating(rate)}
                  >
                    {rate}
                  </Button>	
								</div>
							)}
						</div>
						<CreateComment />
					</Row>	
					:
					<Row className="d-flex flex-column">
						<h3 className="mt-4">More...</h3>
						<NavLink><h3> Register, please </h3></NavLink><h3>or sign in with</h3>
						<Button variant={"outline-success"} className="mt-1" style={{border: "none"}}><h3>Google</h3></Button>
						<Button variant={"outline-success"} className="mt-2" style={{border: "none"}}><h3>Facebook</h3></Button>
					</Row>
				}
			</Row>
		</Container>
  )
})

export default ReviewPage
