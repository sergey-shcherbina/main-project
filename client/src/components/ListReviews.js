import React, {useContext, useState} from "react"
import {observer} from "mobx-react-lite"
import {Context} from "../index"
import {ListGroup, Dropdown, Container} from "react-bootstrap"


const ListReviews = observer(({copy, drop, w, h}) => {
  const {review, user} = useContext(Context)
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
						{rev.name + " | " +  rev.authorRate + " | " + new Date(rev.createdAt).toUTCString().slice(4, -7) + " | " +  
						rev.text + " | " + review.groups.reduce((res, elem) => elem.id === rev.groupId ? elem.name : res, '') + " | " +
						rev.userId}
						{drop}
					</div>
					:
					rev.name + " | " + rev.authorRate + " | " + new Date(rev.createdAt).toUTCString().slice(4, -7) + " | " + rev.text + " | " + 
					review.groups.reduce((res, elem) => elem.id === rev.groupId ? elem.name : res, '') + " | " + rev.userId 
				}	
				</ListGroup.Item>
			)}
		</ListGroup>
	</Container>	
	)
})
      
export default ListReviews