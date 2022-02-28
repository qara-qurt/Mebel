import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import Card from '../../components/Card';
import Loader from '../../components/Loader';
import Layout from '../../layout/Layout';
import { fetchGetProducts, fetchSearchProducts } from '../../store/reducers/products';

const OffersContainer = () => {
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const [title, setTitle] = useState('Все товары');
  let url = pathname.split('/')[2];

  const getTitleFromUrl = (url) => {
    switch (url) {
      case 'cupboard':
        setTitle('Шкафы');
        break;
      case 'bed':
        setTitle('Кровати');
        break;
      case 'couch':
        setTitle('Диваны');
        break;
      case 'chair':
        setTitle('Стулья');
        break;
      case 'chest':
        setTitle('Комоды');
        break;
      case 'rack':
        setTitle('Стеллажи');
        break;
      case 'armchair':
        setTitle('Кресла');
        break;
      case 'kid':
        setTitle('Детская мебель');
        break;
      case 'table':
        setTitle('Столы');
        break;
    }
  };

  const data = products.map((item) => (
    <Card
      key={item.id}
      title={item.data.name}
      description={item.data.description}
      price={item.data.price}
      img={item.data.photos[0].photoUrl}
      id={item.id}
    />
  ));

  const filterData = products
    .filter((item) => item.data.type == url)
    .map((item) => (
      <Card
        key={item.id}
        title={item.data.name}
        description={item.data.description}
        price={item.data.price}
        img={item.data.photos[0].photoUrl}
        id={item.id}
      />
    ));

  useEffect(() => {
    if (url) {
      getTitleFromUrl(url);
    }
    if (params.get('search')) {
      dispatch(fetchSearchProducts(params.get('search')));
      setTitle(`Поиск: ${params.get('search')}`);
    } else {
      dispatch(fetchGetProducts());
    }
    return () => {
      setTitle('Все товары');
    };
  }, [pathname, params.get('search')]);

  return (
    <Layout>
      <div className='content'>
        <Container>
          <div className='offers'>
            <h5>{title}</h5>
            {loading ? (
              <div className='loaders'>
                {Array(4)
                  .fill(0)
                  .map((_, idx) => (
                    <Loader key={idx} />
                  ))}
              </div>
            ) : url ? (
              filterData.length != 0 ? (
                <div className='offers__cards'>{filterData}</div>
              ) : (
                <div style={{ textAlign: 'center', fontSize: 24, fontWeight: 700, marginTop: 100 }}>
                  Ничего не найдено!
                </div>
              )
            ) : data.length != 0 ? (
              <div className='offers__cards'>{data}</div>
            ) : (
              <div style={{ textAlign: 'center', fontSize: 24, fontWeight: 700, marginTop: 100 }}>
                Ничего не найдено!
              </div>
            )}
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default OffersContainer;
