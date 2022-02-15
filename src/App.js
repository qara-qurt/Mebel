import React from 'react';
import "./styles/index.scss"
import { Route, Routes } from 'react-router';

import { Header } from './layout/Header';
import { Footer } from './layout/Footer';

import Main from './pages/Main';
import Admin from './pages/Admin';
import Error from './pages/Error';
import OffersContainer from './pages/Offers/OffersContainer';
import CartContainer from './pages/Cart/CartContainer';
import ItemContainer from './pages/Item/ItemContainer';
import Login from './pages/Login/Login';

function App() {
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
        <Route path='/login' element={<Login />} />
        <Route path="*" element={<Error />}/>
      </Routes>
    </>
  );
}

export default App;
