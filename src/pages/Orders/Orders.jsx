import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { productsApi } from '../../api/api';
import { EmptyCard } from '../../components/EmptyCard';
import OrdersCard from '../../components/OrdersCard';
import Layout from '../../layout/Layout';

const Orders = () => {
  const [orders,setOrders] = useState([])
  const [ides,setIdes] = useState()
  const [deleted,setDeleted] = useState(false)

  useEffect(()=>{
    fetchData();
  },[deleted])

  const fetchData = async () =>{
    const data = await productsApi.getProductsFromDelivery()
    const userId = localStorage.getItem("UserId")
    if(data!== null){
        setIdes(Object.keys(data))
        const array = Object.values(data).filter(item=>item.user_id===userId)
        setOrders(array)
    }
  }
  return (
    <Layout>
      <div className='likes'>
        <Container>
          {orders.length > 0 ? (
            <>
              <h5>Мои заказы</h5>
              <div className='likes__cards'>
                {orders.map((order,idx) => (
                  <OrdersCard key={idx} item={order} id={ides[idx]} change={()=>setDeleted(!deleted)}/>
                ))}
              </div>
            </>
          ) : (
            <EmptyCard text={'В моих заказах ничего нет'} />
          )}
        </Container>
      </div>
    </Layout>
  );
};

export default Orders;
