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
  const userData = jwt_decode(localStorage.getItem("token"))
  const {review, user} = useContext(Context)

	const likes = review.reviews.filter(rev => rev.userId === user.users.reduce((res, one) => one.id === review.selectedReview.userId ? one.id : res, 0)).
	map(rvw => review.likes.filter(like => like.reviewId === rvw.id).length).reduce((sum,elem) => sum + elem, 0)

	const rating = (review.ratings.length && review.ratings.filter(rt => rt.reviewId === review.selectedReview.id)
	.reduce((res, elem) => res + elem.rate, 0)/review.ratings.filter(rt => rt.reviewId === review.selectedReview.id).length).toFixed(2)
	
	
	console.log(!review.likes.filter(like => like.reviewId === review.selectedReview.id).filter(lk => lk.userId === userData.id).length)
	console.log(review.ratings.length && review.ratings.filter(rt => rt.reviewId === review.selectedReview.id))
  console.log(review.ratings.filter(rate => rate.reviewId === review.selectedReview.id).filter(rt => rt.userId === userData.id).length === 0)

  const addLike = () => {
    !review.likes.filter(like => like.reviewId === review.selectedReview.id).filter(lk => lk.userId === userData.id).length  && 
    createLike({reviewId: review.selectedReview.id, userId: userData.id}).then(data => fetchLikes().then(data => review.setLikes(data)))
  }
  const addRating = (rate) => {
		review.ratings.filter(rate => rate.reviewId === review.selectedReview.id).filter(rt => rt.userId === userData.id).length === 0 && 
	  createRating({rate, reviewId: review.selectedReview.id, userId: userData.id}).then(() => fetchRatings().then(data => review.setRatings(data)))
  }
	console.log(review.images.filter(rev => rev.reviewId === review.selectedReview.id)) 
	const imgs = review.images.filter(rev => rev.reviewId === review.selectedReview.id).map(image => 
		// console.log(im.img)
		<Image key={image.id} width={150} height={200} src={process.env.REACT_APP_API_URL +  image.img} />
	)

	//.filter(rev => rev.reviewId === review.selectedReview.id))

  return (
    <Container className="d-flex justyfy-content-between mt-3">
			<Row className="d-flex flex-column" style={{width: '65vw'}}>
				<div className="d-flex">
					<h3 className="mt-1">{review.selectedReview.name}</h3><h5 style={{margin: "0.8vw" }}>rating:</h5>
					<h3 style={{margin: "0.25vw" }}>{rating}</h3>
						<div className="d-flex justify-content-around mt-2">
							{[1, 2, 3, 4, 5].map(rate => 
								<div 
									key={rate}
									className="d-flex align-items-center justify-content-center" 
									style={{background: `url(${star}) no-repeat center center `, width: "2vw", height: "2vw", backgroundSize: "cover",
									color: "yellow", fontWeight: "bold", fontSize: "1.7vw"}}
								>
									o
								</div>
								)} 
							</div>
							<div style={{width: "10vw", background: "rgb(235, 240, 243)", marginLeft: `${(rating * 2 - 10)}vw`}}></div>
						</div>	
				 <Card style={{height: '45vh', width: '60vw', overflow: "auto"}}>
					 <div className="d-flex justify-content-around">{imgs}

					 </div>
					{
						review.selectedReview.name + " | " + review.selectedReview.authorRate + " | " + 
            new Date(review.selectedReview.createdAt).toUTCString().slice(4, -7) + " | " + 
            review.selectedReview.text
					}						
        </Card> 
				<h2 className="mt-2">Comments</h2>
				<Card style={{height: '28vh', width: '60vw', overflow: "auto"}}>
						{review.comments.filter(elem => elem.reviewId === review.selectedReview.id).map(com => 
              <div key={com.id}>
								<div>{com.text}</div>
								<p style={{display: "flex", justifyContent: "flex-end"}}> 
									{user.users.reduce((res, one) => one.id === com.userId ? one.name : res, '')}
									{new Date(com.createdAt).toUTCString().slice(4, -12)}.
								</p> 
							</div>
						)}
				</Card>
			</Row>
			<Row className="d-flex flex-column" style={{width: '30vw', marginLeft: "4vw", marginTop: 45}}>
				<Card className="d-flex">
					Author: {user.users.reduce((res, one) => one.id === review.selectedReview.userId ? one.name : res, '')}
          <br/>likes: {likes} 
				</Card>
				<Card className="d-flex">
					Group: {review.groups.reduce((res, elem) => elem.id === review.selectedReview.groupId ? elem.name : res, '')}
				</Card>
				<Card className="d-flex">
					Rating from the author: {review.selectedReview.authorRate}
				</Card>
				<Card className="d-flex"> 
					Written: {new Date(review.selectedReview.createdAt).toUTCString().slice(4, -12)}
				</Card>
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
