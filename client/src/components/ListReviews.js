import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const ListReviews = observer(({copy, drop}) => {
  const {review, user} = useContext(Context)
	return (
		<ListGroup style={{overflow: "auto", height: "50.2vh", maxWdth: "70vw"}}> 
			{copy.map(rev => 
				<ListGroup.Item 
					key={rev.id} 
					style={{cursor: 'pointer'}}
					active={rev.id === review.selectedReview.id}
					onClick={() => review.setSelectedReview(rev)} 
				> 
				{rev.id === review.selectedReview.id ?
					<div className="d-flex align-items-center">
						{rev.name + " | " +  rev.authorRate + " | " + new Date(rev.createdAt).toUTCString().slice(4, -7) + " | " +  
						rev.text + " | " + 
						rev.userId}
						{drop}
					</div>
					:
					rev.name + " | " + rev.authorRate + " | " + new Date(rev.createdAt).toUTCString().slice(4, -7) + " | " + rev.text + " | " + 
					review.groups.reduce((res, elem) => elem.id === rev.groupId ? elem.name : res, '') + " | " + rev.userId 
					//+ " | " + review.selectedGroup
					// user.users.reduce((res, elem) => elem.id === rev.userId ? elem.email : res, '')
				}	
				</ListGroup.Item>
			)}
		</ListGroup>
	)
})
      
export default ListReviews