import React, { useEffect, useState } from 'react';
import { productsApi } from '../../api/api';
import { Container } from 'react-bootstrap';
import Search from '../../components/Search';
import Layout from '../../layout/Layout';
import AdminProductCart from '../../components/AdminProducCard';
import AdminCreateProduct from '../../components/AdminCreateProduct';
import { useNavigate } from 'react-router-dom';
import CustomPagination from '../../components/Pagination';

const Admin = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [value, setValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;
  const lastProductIndex = currentPage * perPage;
  const fisrtProductIndex = lastProductIndex - perPage;
  const currentProducts =
    products !== null ? products.slice(fisrtProductIndex, lastProductIndex) : 0;

  const deleteProduct = async (id) => {
    const response = await productsApi.deleteProducts(id);
    if (response === '200') {
      getProducts();
    }
  };

  const getProducts = async () => {
    const data = await productsApi.getProducts();

    setProducts(data);
  };

  const pushToAddProduct = () => {
    navigate('/admin/add');
  };

  const onSearch = async (e) => {
    e.preventDefault();
    if (value != '') {
      const data = await productsApi.searchProduct(value);
      setProducts(data);
    } else {
      getProducts();
    }
  };

  useEffect(async () => {
    getProducts();
  }, [rerender]);

  useEffect(() => {}, [currentPage]);
  return (
    <Layout>
      <Container>
        <div className='admin'>
          <div className='admin__products'>
            <div className='products__header'>
              <h5>Товары: {products.length}</h5>
              <div className='products__search'>
                <Search
                  placeholder={'Поиск'}
                  maxWidth={300}
                  value={value}
                  setValue={setValue}
                  onSearch={onSearch}
                />
              </div>
            </div>
            <div className='products__carts'>
              {products !== null ? (
                currentProducts.map((product) => (
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
            {products !== null && products.length > 8 && (
              <CustomPagination
                count={products.length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                perPage={perPage}
              />
            )}
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
