import React, { useEffect } from 'react';
import './styles/index.scss';
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
  const { isAuth, role } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLogin());
  }, [isAuth]);

  const adminRoutes = [
    <Route path='/' element={<Main />} />,
    <Route path='/offers' element={<Offers />} />,
    <Route path='/offers/cupboard' element={<Offers />} />,
    <Route path='/offers/bed' element={<Offers />} />,
    <Route path='/offers/couch' element={<Offers />} />,
    <Route path='/offers/chair' element={<Offers />} />,
    <Route path='/offers/chest' element={<Offers />} />,
    <Route path='/offers/rack' element={<Offers />} />,
    <Route path='/offers/armchair' element={<Offers />} />,
    <Route path='/offers/kid' element={<Offers />} />,
    <Route path='/offers/table' element={<Offers />} />,
    <Route path='/offers/search' element={<Offers />} />,
    <Route path='/item/:productId' element={<ItemContainer />} />,
    <Route path='/cart' element={<CartContainer />} />,
    <Route path='/about-us' element={<AboutUs />} />,
    <Route path='/likes' element={<Likes />} />,
    <Route path='/admin' element={<Admin />} />,
    <Route path='/admin/add' element={<AdminCreateProduct mobile={true} />} />,
    <Route path='/login' element={<Login />} />,
    <Route path='/register' element={<Register />} />,
    <Route path='/forgotPassword' element={<SendMessageToEmail />} />,
    <Route path='*' element={<Error />} />,
  ];

  const defaultRoutes = [
    <Route path='/' element={<Main />} />,
    <Route path='/offers' element={<Offers />} />,
    <Route path='/offers/cupboard' element={<Offers />} />,
    <Route path='/offers/bed' element={<Offers />} />,
    <Route path='/offers/couch' element={<Offers />} />,
    <Route path='/offers/chair' element={<Offers />} />,
    <Route path='/offers/chest' element={<Offers />} />,
    <Route path='/offers/rack' element={<Offers />} />,
    <Route path='/offers/armchair' element={<Offers />} />,
    <Route path='/offers/kid' element={<Offers />} />,
    <Route path='/offers/table' element={<Offers />} />,
    <Route path='/offers/search' element={<Offers />} />,
    <Route path='/item/:productId' element={<ItemContainer />} />,
    <Route path='/cart' element={<CartContainer />} />,
    <Route path='/about-us' element={<AboutUs />} />,
    <Route path='/likes' element={<Likes />} />,
    <Route path='/login' element={<Login />} />,
    <Route path='/register' element={<Register />} />,
    <Route path='/forgotPassword' element={<SendMessageToEmail />} />,
    <Route path='*' element={<Error />} />,
  ];

  return (
    <>
      <Routes>{role == 'ADMIN' ? adminRoutes : defaultRoutes}</Routes>
    </>
  );
}

export default App;
