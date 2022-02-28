import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import like from '../assets/img/heart.png';
import basket from '../assets/img/shopping-basket.png';
import { setCart } from '../store/reducers/cart';
import { useAlert } from 'react-alert';
import { addLike } from '../store/reducers/like';

const Card = ({ title, description, price, img, id }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [data, setData] = useState({
    id,
    title,
    description,
    price,
    img,
  });

  const onSetToCart = () => {
    alert.show('Добавлено в корзину');
    dispatch(setCart(data));
  };

  const onSetToLike = () => {
    alert.show('Добавлено в избранные!');
    dispatch(addLike(data));
  };

  return (
    <div className='card d-flex flex-column'>
      <Link to={`/item/${id}`} className='card__img'>
        <img src={img} alt='' />
      </Link>
      <div className='d-flex justify-content-between'>
        <Link to={`/item/${id}`}>
          <div className='card__info'>
            <Link to={`/item/${id}`}>{title}</Link>
            <p>{description}</p>
            <span>{price}Тг</span>
          </div>
        </Link>
        <div className='card__other d-flex flex-column'>
          <img className='icon' src={like} alt='' onClick={onSetToLike} />
          <img className='icon icon-card' src={basket} alt='' onClick={onSetToCart} />
        </div>
      </div>
    </div>
  );
};

export default Card;
