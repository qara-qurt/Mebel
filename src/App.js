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
            <Route path='cupboards' element={<OffersContainer />}>
                <Route path=":id" element={<OffersContainer />} />
            </Route>
            <Route path='beds' element={<OffersContainer />}>
                <Route path=":id" element={<OffersContainer />} />
            </Route>
        </Route>
        <Route path="/item" element={<ItemContainer />}>
          <Route path=":productId" element={<OffersContainer />} />
        </Route>
        <Route path='/cart' element={<CartContainer />} />
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
