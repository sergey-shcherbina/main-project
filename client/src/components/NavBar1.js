// import React, {useContext} from 'react';
// import {Context} from "../index";
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
// import {NavLink} from "react-router-dom";
// //import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
// import {Button} from "react-bootstrap";
// import {observer} from "mobx-react-lite";
// import Container from "react-bootstrap/Container";
// import { observe } from 'mobx';
// //import {useHistory} from 'react-router-dom'


// const NavBar = observer(() => {
// 	const user = useContext(Context)
// 	let rus = true
// 	//let rus = false
// 	//let userisAuth = false
// 	return (
// 		<Navbar bg="secondary" >
// 			<Container>
// 				<NavLink style={{color:'white'}} to={'/'}>найти english</NavLink>
// 				{user.isAuth ?
// 					<Nav className="ml-auto" style={{color: 'white'}}>
// 						<Button
// 							variant={"outline-light"}
// 							style={{'marginRight': 10}}
// 							// onClick={() => history.push(ADMIN_ROUTE)}
// 						>
// 							{rus ? 'Админ панель' : 'Admin'}
// 						</Button>
// 						<Button
// 							variant={"outline-light"}
// 							style={{'marginRight': 10}}
// 							// onClick={}
// 						>
// 							{rus ? 'Выйти' : 'Log out'}	
// 						</Button>
// 						<Button 
// 							variant={"outline-light"}
// 							style={{'marginRight': 10}} 
// 						>
// 							rus eng вып список
// 						</Button>
// 						<Button 
// 							variant={"outline-light"} 
// 						>
// 							dark light вып список
// 						</Button>
// 					</Nav>
// 					:
// 					<Nav className="ml-auto" style={{color: 'white'}}>
// 						<Button 
// 							variant={"outline-light"}
// 							style={{'marginRight': 10}}  
// 						  onClick={}
// 						>
// 							{rus ? 'Войти' : 'authenticate'}
// 						</Button>
// 						<Button 
// 							variant={"outline-light"} 
// 							style={{'marginRight': 10}} 
// 						>
// 							rus eng вып список
// 						</Button>
// 						<Button 
// 							variant={"outline-light"} 
// 						>
// 							dark light вып список
// 						</Button>
// 					</Nav>
// 				}
// 		</Container>
// 	</Navbar>

// 	);
// 	});

// 	export default NavBar;

    
	






// import React, {useContext} from 'react';
// import {Context} from "../index";
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
// import {NavLink} from "react-router-dom";
// import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
// import {Button} from "react-bootstrap";
// //import {observer} from "mobx-react-lite";
// import Container from "react-bootstrap/Container";
// //import {useHistory} from 'react-router-dom'
// return (
// 	<Navbar bg="dark" variant="dark">
// 			<Container>
// 					<NavLink style={{color:'white'}} to={SHOP_ROUTE}>КупиДевайс</NavLink>
// 					{user.isAuth ?
// 							<Nav className="ml-auto" style={{color: 'white'}}>
// 									<Button
// 											variant={"outline-light"}
// 											onClick={() => history.push(ADMIN_ROUTE)}
// 									>
// 											Админ панель
// 									</Button>
// 									<Button
// 											variant={"outline-light"}
// 											onClick={() => logOut()}
// 											className="ml-2"
// 									>
// 											Выйти
// 									</Button>
// 							</Nav>
// 							:
// 							<Nav className="ml-auto" style={{color: 'white'}}>
// 									<Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
// 							</Nav>
// 					}
// 			</Container>
// 	</Navbar>

// );
// });

// export default NavBar;

