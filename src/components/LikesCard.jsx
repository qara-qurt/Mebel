import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteLike } from '../store/reducers/like';
import ModalView from './Modal';

const LikesCard = ({ item }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const route = () => {
    navigate(`../item/${item.id}`);
  };
  const onDeleteLike = () => {
    dispatch(deleteLike(item.id));
  };
  return (
    <>
      <div className='likes__card'>
        <div className='likes__img' onClick={route}>
          <img src={item.img} alt='' />
        </div>
        <div className='likes__info'>
          <div className='likes__title' onClick={route}>
            <h6>{item.title}</h6>
            <h6>{item.price} тг</h6>
          </div>
          <div className='likes__description'>
            <p>{item.description}</p>
          </div>
          <div className='delete' onClick={handleShow}>
            Удалить
          </div>
        </div>
      </div>
      <ModalView
        show={show}
        handleClose={handleClose}
        onClick={onDeleteLike}
        text={'Вы уверены что хотите удалить?'}
      />
    </>
  );
};

export default LikesCard;
