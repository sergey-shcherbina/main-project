import React, {useContext} from 'react'
import {observer} from "mobx-react-lite"
import {Context} from "../index"
import {ListGroup} from "react-bootstrap"

const GroupsBar = observer(() => {
  const {review} = useContext(Context)
	return (
		<div className="d-flex flex-column align-items-center">
      <h2>Groups:</h2>
      <ListGroup style={{overflow: "auto", height: "64.5vh", maxWidth: "30vw"}}>
      
      {review.groups.map(group =>
        <ListGroup.Item  
          key={group.id}
          active={group.id === review.selectedGroup.id}
          style={{cursor: "pointer", marginTop: 2}}
          onClick={() => review.setSelectedGroup(group)}
        >
          <h5>{group.name}</h5>
        </ListGroup.Item > 
      )}
      </ListGroup>
    </div>
  );
});

export default GroupsBar