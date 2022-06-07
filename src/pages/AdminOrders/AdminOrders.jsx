import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { productsApi } from '../../api/api';
import { EmptyCard } from '../../components/EmptyCard';
import OrdersCard from '../../components/OrdersCard';
import Layout from '../../layout/Layout';

const AdminOrders = () => {
  const [orders,setOrders] = useState([])
  const [ides,setIdes] = useState()
  const [deleted,setDeleted] = useState(false)

  useEffect(()=>{
    fetchData();
  },[deleted])

  const fetchData = async () =>{
    const data = await productsApi.getProductsFromDelivery()
    setIdes(Object.keys(data))
    const array = Object.values(data)
    setOrders(array)
  }

  return (
    <Layout>
      <div className='likes'>
        <Container>
          {orders.length > 0 ? (
            <>
              <h5>Заказы</h5>
              <div className='likes__cards'>
                {orders.map((order,idx) => (
                  <OrdersCard key={idx} item={order} id={ides[idx]} change={()=>setDeleted(!deleted)} admin={true}/>
                ))}
              </div>
            </>
          ) : (
            <EmptyCard text={'В заказах ничего нет'} />
          )}
        </Container>
      </div>
    </Layout>
  );
};

export default AdminOrders;
