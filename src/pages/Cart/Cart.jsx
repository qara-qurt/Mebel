import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CardBasket from '../../components/CardBasket';
import Payment from '../../components/Payment';
import useAuth from '../../hooks/useAuth';

const Cart = ({ cart, allPrice, onDeleCartItem, onPlusCart, onMinusCart }) => {
  const { isAuth } = useAuth();
  const [isShowModal, setIsShowModal] = useState(false);
  const onBuy = () => {
    if (isAuth) {
      setIsShowModal(!isShowModal);
    } else {
      alert('Вам нужно авторизоваться!');
    }
  };
  const onClose = () => {
    setIsShowModal(!isShowModal);
  };
  return (
    <>
      <Row>
        <h4 style={{ fontWeight: 500, marginTop: 20 }}>Корзина</h4>
        <Col lg={8}>
          {cart.map((item) => {
            return (
              <CardBasket
                key={item.id}
                item={item}
                onDeletItem={onDeleCartItem}
                plusCart={onPlusCart}
                minusCart={onMinusCart}
              />
            );
          })}
        </Col>
        <Col lg={4}>
          <div className='all-price'>
            <h5 className='all-price__title'>Сумма заказа</h5>
            <div className='all-price__price'>
              <h5>Общая сумма заказа:</h5>
              <h5>{allPrice}</h5>
            </div>
            <div className='all-price__button' onClick={onBuy}>
              Купить/Заказать
            </div>
          </div>
        </Col>
      </Row>
      <Payment onClose={onClose} active={isShowModal} />
    </>
  );
};

export default Cart;
