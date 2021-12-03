import React, {useContext, useState} from 'react'
import {Container, Form, Button, Card, Row} from "react-bootstrap"
import {NavLink, useLocation, useNavigate} from "react-router-dom"
import {login, registration} from "../http/userAPI"
import {observer} from "mobx-react-lite"
import { Context } from '..'

const Auth = observer(() => {
	const {user} = useContext(Context)
	console.log(user)
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")
	const location = useLocation()
	const isLogin = location.pathname === "/login"
	const navigate = useNavigate()

	const signUser = async () => {
		 try {
			let data;
			if (isLogin) {
				data = await login(email, password)
				console.log(data)
			} else {
				data = await registration (email, password, name)
				console.log(data)
			}
			user.setUser(user)
			user.setIsAuth(true)
			navigate('/')
		 } catch (err) {
		 	alert(err.response.data.message)
		}
	}
								console.log(location.pathname)
								console.log(isLogin)
								console.log(user)


	let rus = true


	return (
		<Container className="d-flex justify-content-center align-items-center">
			<Card style={{width: 600, border: 'none', marginTop: '5%'}} className="p-5">
				<h1 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h1>
				<Form className="d-flex flex-column mt-3">
    {!isLogin &&
						<Form.Control
							className="mt-3"
							style={{border: 'none', borderBottom: '1px solid'}}
							placeholder="Enter fullname..."
							value={name}
							onChange={event => setName(event.target.value)}
						/>
					}		
					<Form.Control
						className="mt-3"
						style={{border: 'none', borderBottom: '1px solid'}}
						placeholder="Введите  email..."
						value={email}
						onChange={event => setEmail(event.target.value)}
					/>
					<Form.Control
						type="password"
						className="mt-3"
						style={{border: 'none', borderBottom: '1px solid'}}
						placeholder="Введите пароль..."
						value={password}
						onChange={event => setPassword(event.target.value)}
					/>
					<Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
						{isLogin ?
							<div style={{display: "flex", justifyContent: 'space-around'}}>
								Нет аккаунта? 
								<NavLink to={'/registration'}> Зарегистрируйтесь! </NavLink> Можете войти через соцсеть
							</div>
							:
							<div style={{display: "flex", justifyContent: 'space-around'}}>
								Уже есть аккаунт? <NavLink to={'/login'}> Войдите!</NavLink> Можете войти через соцсеть
							</div>
						}
						<Button
							variant={"outline-secondary"}
							className="mt-4"
							onClick={signUser}
						>
							{rus ?  isLogin ? 'Вход' : 'Регистрация' : isLogin ? 'Log in' : 'Sign in'}
						</Button>
						<Button
							variant={"outline-secondary"}
							className="mt-4"
							// onClick={click}
						>
							{rus ? 'Войти c Google' : 'Log in with Google'}
						</Button>
						<Button
							variant={"outline-secondary"}
							className="mt-4"
							//onClick={click}
						>
							{rus ? 'Войти c Facebook' : 'Log in with Facebook'}
						</Button>
					</Row>
				</Form>
			</Card>
		</Container>		
	);
})        

export default Auth
