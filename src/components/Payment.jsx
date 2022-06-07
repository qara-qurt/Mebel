import React, { useState } from 'react';

const Payment = ({ onSend,onClose, active }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [phone,setPhone] = useState('')
  const [cart,setCart] = useState('')
  const [date,setDate] = useState('')
  const [cvv,setCvv] = useState('')
  const [err,setErr] = useState()

  const onPay = () => {
    if(activeIdx===1 && phone!==""){
      setErr()
      setPhone("")
      onSend(phone,false)
    }
    else if(activeIdx===0 && (phone!==""&&cart!==""&&date!==""&&cvv!=="")){
      alert("Оплата прошла успешно!")
      setErr()
      setPhone("")
      setCart("")
      setDate("")
      setCvv("")
      onSend(phone,true)
    }
    else
      setErr("*Все поля обязательны")
  };

  return (
    <div className={active ? 'payment active' : 'payment'} onClick={onClose}>
      <div className='payment__body' onClick={(e) => e.stopPropagation()}>
        <h5>Способы оплаты</h5>
        <div className='payment__select'>
          <div
            className={activeIdx == 0 ? 'select active' : 'select'}
            onClick={() => setActiveIdx(0)}>
            Картой
          </div>
          <div
            className={activeIdx == 1 ? 'select active' : 'select'}
            onClick={() => setActiveIdx(1)}>
            Наличной
          </div>
        </div>
        {err && <div style={{color:"#EF2E2E",marginTop:'10px'}}>{err}</div>}
        {activeIdx == 0 ? (
          <>
            <label className='label'>
              <p>Номер карты</p>
              <input type='text' placeholder='хххх хххх хххх хххх' value={cart} onChange={(e)=>setCart(e.target.value)}/>
            </label>
            <label className='label'>
              <p>Срок действия карты</p>
              <input type='text' placeholder='мм.гг' value={date} onChange={(e)=>setDate(e.target.value)}/>
            </label>
            <label className='label'>
              <p>Защитный код карты(CVV)</p>
              <input type='text' placeholder='xxx'value={cvv} onChange={(e)=>setCvv(e.target.value)} />
            </label>
            <label className='label'>
              <p>Номер телефона</p>
              <input type='text' placeholder='+7(xxx) xxx xx xx' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
            </label>
          </>
        ) : (
          <label className='label'>
            <p>Номер телефона</p>
            <input type='text' placeholder='+7(xxx) xxx xx xx' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
          </label>
        )}

        <button className='payment__button' onClick={onPay}>
          Оплатить
        </button>
      </div>
    </div>
  );
};

export default Payment;
