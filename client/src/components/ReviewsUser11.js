// import React, {useContext, useState} from 'react';
// //import {observer} from "mobx-react-lite";
// //import {Context} from "../index";
// import {ListGroup, Dropdown} from "react-bootstrap";
// import EditReview from "../components/modals/EditReview"


// const ReviewsUser = ({copy}) => {

// 	const [editVisible, setEditVisible] = useState(false)

//   //const {review} = useContext(Context)
// 	return (
//     <ListGroup style={{overflow: "auto", maxHeight: "35vh"}}>
// 			{copy.map(rev => 
//         <Dropdown className="d-flex" key={rev.id}>
//           <ListGroup.Item style={{width: "75vw"}}>
// 						{rev.name} | {rev.authorRate} | {new Date(rev.createdAt).toUTCString().slice(4, -7)} | {rev.text}
//           </ListGroup.Item>
//           <Dropdown.Toggle variant="outline-primary" style={{border: "none"}} />
//           <Dropdown.Menu>
//             <Dropdown.Item onClick={() => setEditVisible(true)}>Edit</Dropdown.Item>
//             <Dropdown.Item >Delete</Dropdown.Item>
//             <Dropdown.Item >Open in view mode</Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>	
// 			)}
// 			<EditReview show={editVisible} onHide={() => setEditVisible(false)}/>
//     </ListGroup>
// 	)
// }
      
// export default ReviewsUser