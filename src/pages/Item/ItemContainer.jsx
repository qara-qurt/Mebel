import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { data } from '../../data';
import { useDispatch } from 'react-redux';
import { setCart } from '../../store/reducers/cart';
import Item from './Item';
import Layout from '../../layout/Layout';
import axios from 'axios';
import { useAlert } from 'react-alert';
import { addLike } from '../../store/reducers/like';

const ItemContainer = ({}) => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [currentProduct, setCurrentProduct] = useState(null);
  const alert = useAlert();
  const onSetToCart = () => {
    const data = {
      id: currentProduct.id,
      title: currentProduct.name,
      description: currentProduct.description,
      price: currentProduct.price,
      img: currentProduct.photos[0].photoUrl,
    };
    alert.show('Добавлено в корзину!');
    dispatch(setCart(data));
  };

  const onSetToLike = () => {
    const data = {
      id: currentProduct.id,
      title: currentProduct.name,
      description: currentProduct.description,
      price: currentProduct.price,
      img: currentProduct.photos[0].photoUrl,
    };
    alert.show('Добавлено в избранные!');
    dispatch(addLike(data));
  };

  useEffect(async () => {
    const url = `https://mebel-f0c71-default-rtdb.europe-west1.firebasedatabase.app/products/${productId}.json`;
    try {
      const response = await axios.get(url);
      if (response.status == '200') {
        setCurrentProduct(response.data);
      }
    } catch (error) {
      throw Error(error);
    }
  }, []);

  return (
    <Layout>
      <div className='item'>
        <Container>
          {currentProduct != null && (
            <Item
              currentProduct={currentProduct}
              onSetToCart={onSetToCart}
              onSetToLike={onSetToLike}
            />
          )}
        </Container>
      </div>
    </Layout>
  );
};

export default ItemContainer;
