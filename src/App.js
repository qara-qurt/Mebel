import React, { useEffect } from 'react';
import "./styles/index.scss"
import { Route, Routes } from 'react-router';
import Main from './pages/Main';
import Admin from './pages/Admin';
import Error from './pages/Error';
import OffersContainer from './pages/Offers/OffersContainer';
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
        <Route path='/offers' element={<OffersContainer />}>
          <Route path='cupboard' element={<OffersContainer />} />  
          <Route path='bed' element={<OffersContainer />} />  
          <Route path='couch' element={<OffersContainer />} />  
          <Route path='chair' element={<OffersContainer />} />  
          <Route path='chest' element={<OffersContainer />} />  
          <Route path='rack' element={<OffersContainer />} />  
          <Route path='armchair' element={<OffersContainer />} />  
          <Route path='kid' element={<OffersContainer />} />  
          <Route path='table' element={<OffersContainer />} /> 
          <Route path='search' element={<OffersContainer />} /> 
        </Route>
        <Route path="/item" element={<ItemContainer />}>
          <Route path=":productId" element={<OffersContainer />} />
        </Route>
        <Route path='/cart' element={<CartContainer />} />
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
