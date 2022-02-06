import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import like from '../assets/img/heart.png';
import basket from '../assets/img/shopping-basket.png';
import { setCart } from '../store/reducers/cart';

const Card = ({title,description,price,img,id}) => {
    const dispatch = useDispatch()

    const onSetToCart = () =>{
        const data = {
            id,
            title,
            description,
            price,
            img,
        }
        dispatch(setCart(data))
    }
    return (
        <div className='card d-flex flex-column'>
            <Link to={`/item/${id}`} className='card__img'><img src={img} alt="" /></Link>
             <div className='d-flex justify-content-between'>
                <Link to={`/item/${id}`}>
                <div className="card__info">
                    <Link to={`/item/${id}`}>{title}</Link>
                    <p>{description}</p>
                    <span>{price}Тг</span>
                </div>
                </Link>
                <div className="card__other d-flex flex-column">
                    <img className='icon' src={like} alt="" />
                    <img className='icon icon-card' src={basket} alt="" onClick={onSetToCart}/>
                </div>
            </div>
        </div>
    );
};

export default Card;