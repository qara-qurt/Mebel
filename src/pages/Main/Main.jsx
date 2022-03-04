import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchGetProducts } from '../../store/reducers/products';
import { MainBanner } from '../../components/MainBanner';
import { RecBlock } from '../../components/RecBlock';
import { PopCategory } from '../../components/PopCategory';
import { NewBlock } from '../../components/NewBlock';
import { IdeaBlock } from '../../components/IdeaBlock';
import Layout from '../../layout/Layout';
import { useSelector } from 'react-redux';

const Main = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchGetProducts());
  }, []);

  return (
    <Layout>
      <div className='bg'>
        <Container>
          <MainBanner />
          <RecBlock data={products} />
          <NewBlock data={products} />
          <PopCategory data={products} />
          <IdeaBlock />
        </Container>
      </div>
    </Layout>
  );
};

export default Main;
