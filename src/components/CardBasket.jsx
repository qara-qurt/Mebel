import React, { useEffect, useState } from 'react'
import basket from '../assets/img/basket.jpg'

const CardBasket = ({item,onDeletItem,plusCart,minusCart}) => {
    const [newPrice, setNewPrice] = useState(item.price*item.count)
    useEffect(()=>{
        setNewPrice(item.price*item.count)
    },[item])
    return (
        <div className='cart-basket'>
            <div className='cart-basket__main-side'>
                <img src={basket} alt="" />
                <div className="cart-basket__body">
                    <div className="cart-basket__title">
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                    </div>
                    <div className='counter'>
                        <div className='cart-basket__button'>
                            <div onClick={()=>{
                                minusCart(item)
                            }}>-</div>
                            <div>{item.count}</div>
                            <div onClick={()=>{
                                plusCart(item)
                            }}>+</div>
                        </div>
                        <button className='delete' onClick={()=>onDeletItem(item.id)}>Удалить</button>
                    </div>
                </div>
            </div>
            <div className="cart-basket__price">
                {newPrice}Тг
            </div>
        </div>
    )
}

export default CardBasket
