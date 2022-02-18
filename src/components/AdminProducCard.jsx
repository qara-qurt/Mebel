import React from 'react';
import item1 from '../assets/img/item1.jpg';

const AdminProducCard = () => {
  return (
    <div className='products__carts'>
        <div className='product__cart'>
            <div className='cart__img'>
            <img src={item1} alt='' />
            </div>
            <div className='cart__info'>
            <div className='cart__name'>
                <p>BRIMNES БРИМНЭС</p>
                <p>10 000тг</p>
            </div>
            <div className='cart__buttons'>
                <div className='cart__delete'>Удалить</div>
                <div className='cart__edit'>Изменить</div>
            </div>
            </div>
        </div>
    </div>
  );
};

export default AdminProducCard;
