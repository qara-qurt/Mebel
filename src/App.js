import React, { useEffect } from 'react';
import "./styles/index.scss"
import { Route, Routes } from 'react-router';
import Main from './pages/Main/Main';
import Admin from './pages/Admin/Admin';
import Error from './pages/Error/Error';
import AboutUs from './pages/AboutUs/AboutUs';
import CartContainer from './pages/Cart/CartContainer';
import ItemContainer from './pages/Item/ItemContainer';
import Login from './pages/Login/Login';
import useAuth from './hooks/useAuth';
import { useDispatch } from 'react-redux';
import { autoLogin } from './store/reducers/auth';
import Register from './pages/Register/Register';
import SendMessageToEmail from './pages/ResetPassword/SendMessageToEmail';
import AdminCreateProduct from './components/AdminCreateProduct';
import Likes from './pages/Likes/Likes';
import Offers from './pages/Offers/Offers';

function App() {
  const {isAuth} = useAuth();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(autoLogin())
  },[isAuth])

  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/offers' element={<Offers />}>
          <Route path='cupboard' element={<Offers />} />  
          <Route path='bed' element={<Offers />} />  
          <Route path='couch' element={<Offers />} />  
          <Route path='chair' element={<Offers />} />  
          <Route path='chest' element={<Offers />} />  
          <Route path='rack' element={<Offers />} />  
          <Route path='armchair' element={<Offers />} />  
          <Route path='kid' element={<Offers />} />  
          <Route path='table' element={<Offers />} /> 
          <Route path='search' element={<Offers />} /> 
        </Route>
        <Route path="/item" element={<ItemContainer />}>
          <Route path=":productId" element={<Offers />} />
        </Route>
        <Route path='/cart' element={<CartContainer />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/likes' element={<Likes />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/add' element={<AdminCreateProduct mobile={true}/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgotPassword' element={<SendMessageToEmail />} />
        <Route path="*" element={<Error />} />      
      </Routes>
    </>
  );
}

export default App;
