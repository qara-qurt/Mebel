import React, { useState } from 'react';

const Delivery = ({ next,active }) => {
    const [address,setAddress] = useState('')
  const onDelivery = () => {
      if(address!=="")
        next();
  };

  return (
    <div className={active ? 'payment active' : 'payment'} >
      <div className='payment__body' onClick={(e) => e.stopPropagation()}>
        <h5>Доставка на дом</h5>
          <label className='label'>
            <p>Адрес доставки</p>
            <input type='text' placeholder='г.Алматы Абая 66' value={address} onChange={(e)=>setAddress(e.target.value)}/>
          </label>
        <button className='payment__button' onClick={onDelivery}>
          Дальше
        </button>
      </div>
    </div>
  );
};

export default Delivery;
