import React, {useContext} from "react"
import {observer} from "mobx-react-lite"
import {Context} from "../index"
import {ListGroup, Container} from "react-bootstrap"


const ListReviews = observer(({copy, drop, w, h}) => {
  const {review} = useContext(Context)
  
	return (
		<Container className="d-flex justify-content-center">
		<ListGroup style={{overflow: "auto", width: w , height: h}}> 
			{copy.map(rev => 
				<ListGroup.Item 
					key={rev.id} 
					style={{cursor: "pointer", marginTop: 2}} 
					active={rev.id === review.selectedReview.id}
					onClick={() => review.setSelectedReview(rev)} 
				> 
				{rev.id === review.selectedReview.id ?
					<div className="d-flex align-items-center">
            {rev.text.slice(0, 250)}...
						{drop}
					</div>
					:
					<div className="d-flex">
						<h5>{rev.name}</h5>. rating: {!review.ratings.filter(rt => rt.reviewId === rev.id).reduce((res, elem) => 
            res + elem.rate, 0)/review.ratings.filter(rt => rt.reviewId === rev.id).length ? 0 : (review.ratings.filter(rt => rt.reviewId === rev.id)
            .reduce((res, elem) => res + elem.rate, 0)/review.ratings.filter(rt => rt.reviewId === rev.id).length).toFixed(2)} 
            . written: {new Date(rev.createdAt).toUTCString().slice(4, -7)}. group: {review.groups.reduce((res, elem) => 
            elem.id === rev.groupId ? elem.name : res, '')}
					</div> 
				}	
				</ListGroup.Item>
			)}
		</ListGroup>
	</Container>	
	)
})
      
export default ListReviews