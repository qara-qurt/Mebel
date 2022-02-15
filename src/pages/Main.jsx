import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setProducts } from '../store/reducers/products';
import { data } from '../data';
import { MainBanner } from '../components/MainBanner';
import { RecBlock } from '../components/RecBlock';
import { PopCategory } from '../components/PopCategory';
import { NewBlock } from '../components/NewBlock';
import { IdeaBlock } from '../components/IdeaBlock';
import Layout from '../layout/Layout';

const Main = ()=> {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setProducts(data))
    },[dispatch])
    return (
      <Layout>
        <div className="bg">
          <Container>
              <MainBanner />
              <RecBlock data={data} />
              <NewBlock data={data}/>
              <PopCategory data={data} />
              <IdeaBlock />
          </Container>
        </div>
      </Layout>
  );
}

export default Main;