import React, { useState } from 'react';

const Payment = ({ onClose, active }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const onPay = () => {
    alert('Оплата прошла успешно!');
    onClose();
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
        {activeIdx == 0 ? (
          <>
            <label className='label'>
              <p>Номер карты</p>
              <input type='text' placeholder='хххх хххх хххх хххх' />
            </label>
            <label className='label'>
              <p>Срок действия карты</p>
              <input type='text' placeholder='мм.гг' />
            </label>
            <label className='label'>
              <p>Защитный код карты(CVV)</p>
              <input type='text' placeholder='xxx' />
            </label>
          </>
        ) : (
          <label className='label'>
            <p>Номер телефона</p>
            <input type='text' placeholder='+7(xxx) xxx xx xx' />
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
