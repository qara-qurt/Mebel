import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Search from '../components/Search';
import Layout from '../layout/Layout';
import AdminProductCart from '../components/AdminProducCard';
import axios from 'axios';
import AdminCreateProduct from '../components/AdminCreateProduct';
import { useNavigate } from 'react-router-dom';
import CustomPagination from '../components/Pagination';

const Admin = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [rerender, setRerender] = useState(false);

  const deleteProduct = async (id, photos) => {
    const url = `https://mebel-f0c71-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`;
    try {
      const response = await axios.delete(url);
      if (response.status == '200') {
        // deleteImgFromCloud(photos)
        getProducts();
      }
    } catch (error) {
      console.log(error);
    }
    getProducts();
  };

  const getProducts = async () => {
    const url = 'https://mebel-f0c71-default-rtdb.europe-west1.firebasedatabase.app/products.json';
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        if (response.data) {
          const data = Object.keys(response.data).map((product) => {
            return { id: product, data: response.data[product] };
          });
          setProducts(data);
        } else {
          setProducts([]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const pushToAddProduct = () => {
    navigate('/admin/add');
  };

  useEffect(async () => {
    getProducts();
  }, [rerender]);

  return (
    <Layout>
      <Container>
        <div className='admin'>
          <div className='admin__products'>
            <div className='products__header'>
              <h5>Товары: 100</h5>
              <div className='products__search'>
                <Search placeholder={'Поиск'} maxWidth={300} />
              </div>
            </div>
            <div className='products__carts'>
              {products.length != 0 ? (
                products.map((product) => (
                  <AdminProductCart
                    key={product.id}
                    id={product.id}
                    data={product.data}
                    deleteProduct={deleteProduct}
                  />
                ))
              ) : (
                <p style={{ fontSize: 26, fontWeight: 600, textAlign: 'center', marginTop: 50 }}>
                  Пусто!
                </p>
              )}
            </div>
            <CustomPagination />
          </div>
          <AdminCreateProduct rerender={rerender} setRerender={setRerender} mobile={false} />
          <div className='products__add' onClick={pushToAddProduct}>
            +
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Admin;
