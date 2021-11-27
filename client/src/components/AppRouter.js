import React, {useContext} from 'react';
import {Routes, Route} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import Main from '../pages/Main';
import {Context} from "../index";

const AppRouter = () => {
  const {user} = useContext(Context)
  const {review} = useContext(Context)
 console.log(user)
 console.log(review)
  return (
    <Routes>
      {console.log(user.isAuth)}
      {user.isAuth && authRoutes.map(({path, Component}) => 
        <Route key={path} path={path} element={Component} />
      )} 
        {publicRoutes.map(({path, Component}) =>
          <Route key={path} path={path} element={Component} />
      )}
      <Route path='*' element={<Main />} />
    </Routes>
    );
};
export default AppRouter
