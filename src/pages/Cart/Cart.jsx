import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { productsApi } from '../../api/api';
import CardBasket from '../../components/CardBasket';
import Delivery from '../../components/Delivery';
import Payment from '../../components/Payment';
import useAuth from '../../hooks/useAuth';
import { clearCart } from '../../store/reducers/cart';

const Cart = ({ cart, allPrice, onDeleCartItem, onPlusCart, onMinusCart }) => {
  const { isAuth } = useAuth();
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModal2, setIsShowModal2] = useState(false);
  const [address,setAddress] = useState("");
  const {user} = useSelector(state=>state.auth)
  const dispatch = useDispatch()

  const onBuy = () => {
    if (isAuth) {
      setIsShowModal(!isShowModal);
    } else {
      alert('Вам нужно авторизоваться!');
    }
  };

  const onClose = () => {
    setIsShowModal(false)
    setIsShowModal2(false);
  };

  const onSend = (phone,isPayed) =>{
    fetchDelivery(phone,isPayed)
    alert("Заказ успешно оформлен,скоро вам доставят ваш товар!")
    setIsShowModal(false)
    setIsShowModal2(false);
    dispatch(clearCart())
  }

  const fetchDelivery = (phone,isPayed) =>{
    const userId = localStorage.getItem("UserId")
    const data = {
      products:cart,
      user_id:userId,
      user:user,
      isPayed:isPayed,
      phone:phone,
      status:"На складе",
      address:address
    }
    productsApi.addProductToDelivery(data)
  }

  const next = (address) =>{
    setAddress(address)
    setIsShowModal(!isShowModal)
    setIsShowModal2(!isShowModal2)
  }
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
      <Payment onSend={onSend} onClose={onClose} active={isShowModal2} />
      <Delivery onClose={onClose} next={next} active={isShowModal}/>
    </>
  );
};

export default Cart;
