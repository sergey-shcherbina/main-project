import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup, Row} from "react-bootstrap";

const GroupsBar = observer(() => {
  const {review} = useContext(Context)
	return (
		<Row className="d-flex flex-column align-items-center">
      <h2>Groups:</h2>
      <ListGroup style={{overflow: "auto", height: "52vh", maxWidth: "30vw"}}>
      
      {review.groups.map(group =>
        <ListGroup.Item  
          key={group.id}
          active={group.id === review.selectedGroup.id}
          style={{cursor: 'pointer', marginTop: 2}}
          onClick={() => review.setSelectedGroup(group)}
        >
          {group.name}
        </ListGroup.Item > 
      )}
      </ListGroup>
    </Row>
  );
});

export default GroupsBar;