import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalView from './Modal';

const CardBasket = ({ item, onDeletItem, plusCart, minusCart }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [newPrice, setNewPrice] = useState(item.price * item.count);
  const route = () => {
    navigate(`../item/${item.id}`);
  };
  useEffect(() => {
    setNewPrice(item.price * item.count);
  }, [item]);
  return (
    <>
      <div className='cart-basket'>
        <div className='cart-basket__main-side'>
          <img src={item.img} alt='' onClick={route} />
          <div className='cart-basket__body'>
            <div className='cart-basket__title'>
              <h5 onClick={route}>{item.title}</h5>
              <p>{item.description}</p>
            </div>
            <div className='counter'>
              <div className='cart-basket__button'>
                <div
                  onClick={() => {
                    if (item.count == 1) {
                      handleShow();
                    } else {
                      minusCart(item);
                    }
                  }}>
                  -
                </div>
                <div>{item.count}</div>
                <div
                  onClick={() => {
                    plusCart(item);
                  }}>
                  +
                </div>
              </div>
              <button className='delete' onClick={handleShow}>
                Удалить
              </button>
            </div>
          </div>
        </div>
        <div className='cart-basket__price'>{newPrice}Тг</div>
      </div>
      <ModalView
        show={show}
        handleClose={handleClose}
        onClick={() => onDeletItem(item.id)}
        text={'Вы уверены что хотите удалить?'}
      />
    </>
  );
};

export default CardBasket;
