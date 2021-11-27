import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Card, Button, Image, NavLink} from 'react-bootstrap'
import star from '../assets/star.svg'
import CommentModal from '../components/modals/CommentModal'
import { fetchGroups, fetchOneReview } from '../http/reviewAPI'
import {useParams} from "react-router-dom"
import {Context} from "../index";

const ReviewPage = () => {


	let loginUser = true
	let userId = 2
	let reviewuserId = 1
	//let loginUser = false


	//const rates = [1, 2, 3, 4, 5]
	const {id} = useParams()
	const [rev, setRev] = useState({})
	const {review} = useContext(Context)

	console.log(id)

  useEffect(() => {
    fetchOneReview(id).then(data => setRev(data))
  }, [])


  return (
    <Container className="d-flex">
			<Row className="d-flex flex-column" style={{width: '70vw'}}>
				<h2>{rev.name}</h2>
				 <Card style={{height: '45vh', width: '55vw'}}>
					{
						rev.name + " | " + rev.authorRate + " | " + new Date(rev.createdAt).toUTCString().slice(4, -7) 
						+ " | " + rev.text
					}						

				</Card> 
				<h2>Photos</h2>
				<Card style={{height: '20vh', width: '55vw'}}>
						gfgvhgvjgvjvhjghbjghbgjhvbjgvhbjgvhbjvhbjhvbjvbhjvhjgvbjvhbjgh
				</Card>
			</Row>
			<Row className="d-flex flex-column" style={{width: '25vw'}}>
				<h2 className="ml-5">{'About'}</h2>
				<Card style={{width: '25vw', height: '8vh'}}>
					author: {rev.userId}
				</Card>
				<Card style={{width: '25vw', height: '8vh'}}>
					group: {rev.groupId}
				</Card>
				<Card style={{width: '25vw', height: '8vh'}}>
					The rate of author: {rev.authorRate}
				</Card>
				<Card style={{width: '25vw', height: '8vh'}}>
					tags: {'rate tags'}
				</Card>
				{ userId === reviewuserId  ?
					<Row className="d-flex flex-column">
						<h2 className="mt-4">Rate review</h2>
						<Button variant={"outline-warning"} disabled className="mt-2"><h2>Like</h2></Button>
						<div className="d-flex justify-content-around mt-3">
							{[1, 2, 3, 4, 5].map((rate, index) => 
								<div 
									key={index}
									className="d-flex align-items-center justify-content-center" 
									style={{background: `url(${star}) no-repeat center center `, width: "4.5vw", height: "4.5vw", backgroundSize: "cover", 
									cursor: "pointer", fontSize: "1.8vw"}}
								>
									<Button variant={"outline-warning"} disabled style={{border: "none", borderRadius: "50%"}}>{rate}</Button>	
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
				loginUser ? 
					<Row className="d-flex flex-column">
						<h2 className="mt-4">Rate review</h2>
						<Button variant={"outline-warning"} className="mt-2"><h2>Like</h2></Button>
						<div className="d-flex justify-content-around mt-3">
							{[1, 2, 3, 4, 5].map(rate => 
								<div 
									key={rate}
									className="d-flex align-items-center justify-content-center" 
									style={{background: `url(${star}) no-repeat center center `, width: "4.5vw", height: "4.5vw", backgroundSize: "cover", 
									cursor: "pointer", fontSize: "1.8vw"}}
								>
									<Button variant={"outline-warning"} style={{border: "none", borderRadius: "50%"}}>{rate}</Button>	
								</div>
							)}
						</div>
						<CommentModal />
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
}

export default ReviewPage
