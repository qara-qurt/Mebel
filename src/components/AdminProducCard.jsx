import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import item1 from '../assets/img/item1.jpg';

const AdminProducCard = ({ id, data, deleteProduct }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteCart = () => {
    deleteProduct(id, data.photos);
    handleClose();
  };

  return (
    <>
      <div className='products__carts'>
        <div className='product__cart'>
          <div className='cart__img'>
            <img src={data.photos[0].photoUrl} alt='' />
          </div>
          <div className='cart__info'>
            <div className='cart__name'>
              <p>{data.name} -</p>
              <p>{data.price} тг</p>
            </div>
            <div className='cart__description'>
              <p>{data.description}</p>
            </div>
            <div className='cart__buttons'>
              <div className='cart__delete' onClick={handleShow}>
                Удалить
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size='sm'>
        <Modal.Header closeButton style={{ alignItems: 'flex-start' }}>
          <p>Вы уверены что хотите удалить?</p>
        </Modal.Header>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Отмена
          </Button>
          <Button variant='primary' onClick={deleteCart}>
            Да
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminProducCard;
