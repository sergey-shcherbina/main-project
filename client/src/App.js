import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import Searchmodal from './components/modals/Searchmodal'
import './app.css'

const App = observer(() => {
  const [loading, setLoading] = useState(true)
  const {user} = useContext(Context)
  useEffect(() => {
    check().then(data => {
      user.setUser(true)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])
  return (
    <div className="app">
    <BrowserRouter>
      <NavBar />
      <Searchmodal />
      <AppRouter />
    </BrowserRouter>
    </div>
  );
});

export default App;