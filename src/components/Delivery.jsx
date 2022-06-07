import React, { useState } from 'react';

const Delivery = ({ next,active,onClose }) => {
    const [address,setAddress] = useState('')
    const [err,setErr] = useState()

  const onDelivery = () => {
      if(address!==""){
        setErr()
        setAddress('')
        next(address);
      }
      else
        setErr("*Обязательное поле")
  };

  return (
    <div className={active ? 'payment active' : 'payment'} onClick={onClose}>
      <div className='payment__body' onClick={(e) => e.stopPropagation()}>
        <h5>Доставка на дом</h5>
        {err && <div style={{color:"#EF2E2E",marginTop:'10px'}}>{err}</div>}
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
