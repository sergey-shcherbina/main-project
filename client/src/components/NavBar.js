import React, {useContext, useState} from 'react';
import {Context} from "..";
import {Navbar, Nav, Button,Container} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useNavigate} from 'react-router-dom'
import Searchmodal from "./modals/Searchmodal"

const NavBar = observer(() => {
  const {user, review} = useContext(Context)
  const navigate = useNavigate()
	const logOut = () => {
  	user.setUser({})
    user.setIsAuth(false)
    //localStorage.setItem('token', '')
    navigate('/')
  }

  const [searchVisible, setSearchVisible] = useState(false)

  let dataTags = []
  review.tags.forEach(tag => dataTags.push({value: tag.word, count: Math.floor(Math.random() * 100)}))
  //console.log(dataTags)
  return (
    <div>
      <Navbar bg="light">
        <Container>
          {/* <Button variant="outline-primary" style={{border: "none"}}>dark</Button>
          <Button variant="outline-primary" style={{border: "none"}}>en ru</Button> */}
          <NavLink to={"/"}>Main page</NavLink>
          <Nav.Link href="/user_page">Own page</Nav.Link>
          <Button
            variant="outline-primary"
            style={{border: "none", fontSize: 20}}
            onClick={() => {setSearchVisible(true)}}
          >
            Search
          </Button>
          {user.isAuth ?
            <Nav className="ml-auto" style={{color: 'white'}}>
              <Button
                style={{border: "none"}}
                variant="outline-primary"
                onClick={() => navigate('/admin')}
              >
                Admin panel
              </Button>
              <Button
                variant="outline-primary"
                style={{'marginLeft': 10, border: "none"}}
                onClick={() => logOut()}
              >
                log out
              </Button>
            </Nav>
            :
            <Nav className="ml-auto" >
              <Button 
                variant="outline-primary" 
                style={{border: "none"}}
                onClick={() => navigate('/login')}
              //onClick={() => user.setIsAuth(true)}
              >
                Log in
              </Button>
            </Nav>
          }
        </Container>
      </Navbar>
      <Searchmodal show={searchVisible} onHide={() => setSearchVisible(false)} data={dataTags} />
    </div>
  );
});

export default NavBar;