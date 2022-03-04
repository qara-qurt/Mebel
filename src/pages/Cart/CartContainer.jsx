import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { EmptyCard } from '../../components/EmptyCard';
import Layout from '../../layout/Layout';
import { deleteCart, plusCart, minusCart, fetchDeleteCart } from '../../store/reducers/cart';
import Cart from './Cart';

const CartContainer = ({}) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { allPrice } = useSelector((state) => state.cart);

  const onDeleCartItem = (itemId) => {
    dispatch(deleteCart(itemId));
  };

  const onPlusCart = (id) => {
    dispatch(plusCart(id));
  };
  const onMinusCart = (id) => {
    dispatch(minusCart(id));
  };
  return (
    <Layout>
      <div className='cart'>
        <Container>
          {cart.length > 0 ? (
            <Cart
              cart={cart}
              onDeleCartItem={onDeleCartItem}
              onPlusCart={onPlusCart}
              onMinusCart={onMinusCart}
              allPrice={allPrice}
            />
          ) : (
            <EmptyCard text={'Корзина пустая'} />
          )}
        </Container>
      </div>
    </Layout>
  );
};

export default CartContainer;
