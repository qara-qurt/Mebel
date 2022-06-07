import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsApi } from '../api/api';
import ModalView from './Modal';

const OrdersCard = ({ item,id,change,admin }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const route = (id) => {
    navigate(`../item/${id}`);
  };

  const onDeleteDelivery = async() => {
    await productsApi.deleteProductsFromDelivery(id)
    change()
    handleClose()
  };

  const onStatus = async(status) => {
    const data = {
        product:item.product,
        user_id:item.user_id,
        user:item.user,
        isPayed:item.isPayed,
        phone:item.phone,
        status:status,
        address:item.address,
    }
    productsApi.updateProductsFromDelivery(data,id)
    change()
  }

  return (
    <>
        <div className="order">
            <div className="order__img" onClick={()=>route(item.product.id)}> 
                <img src={item.product.img} alt="" />
            </div>
            <div className="order__info">
                <div className='likes__title' onClick={()=>route(item.product.id)}>
                    <h6>{item.product.title}</h6>
                    <h6>{item.product.price} тг</h6>
                </div>
                <div className='order__status'>
                    {admin && <p>Покупатель : {item.user}</p>}
                    <p>Оплачено : {item.isPayed?"Да": "Нет"}</p>
                    <p>Номер телефона : {item.phone}</p>
                    <p>Адрес доставки: {item.address}</p>
                    {admin
                    ?<div style={{display:'flex'}}>
                        <p style={{marginRight:"10px"}}>Статус</p>
                        <div>
                            <div onClick={()=>onStatus("На складе")} className={item.status==="На складе"? "order__status-item active":"order__status-item"}>  На складе</div>
                            <div onClick={()=>onStatus("В пути")} className={item.status==="В пути"? "order__status-item active":"order__status-item"}>  В пути</div>
                            <div onClick={()=>onStatus("Доставлено")} className={item.status==="Доставлено"? "order__status-item active":"order__status-item"}> Доставлено</div>
                        </div>
                    </div>
                    :<p>Статус : {item.status}</p>}
                </div>
                {admin?"":<div className='delete' onClick={handleShow}>
                    Отменить
                </div>}
            </div>
        </div>
      <ModalView
        show={show}
        handleClose={handleClose}
        onClick={onDeleteDelivery}
        text={'Вы уверены что хотите отменить?'}
      />
    </>
  );
};

export default OrdersCard;
