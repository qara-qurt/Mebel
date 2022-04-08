import { Col, Row } from 'react-bootstrap';
import { Button } from '../../components/Button';
import like from '../../assets/img/heart.png';

const Item = ({ currentProduct, onSetToCart, onSetToLike }) => {
  return (
    <Row className='item__body'>
      <Col md={7} className='item__imges'>
        <Row>
          <Col md={6}>
            <img className='img' src={currentProduct.photos[0].photoUrl} alt='' />
          </Col>
          <Col md={6}>
            <img className='img' src={currentProduct.photos[1].photoUrl} alt='' />
          </Col>
          <Col md={6}>
            <img className='img' src={currentProduct.photos[2].photoUrl} alt='' />
          </Col>
          <Col md={6}>
            <img className='img' src={currentProduct.photos[3].photoUrl} alt='' />
          </Col>
        </Row>
      </Col>
      <Col md={5} className='item__info'>
        <div className='item__title'>
          <h4>{currentProduct.name}</h4>
          <pre> </pre>
          <h4>{currentProduct.price} Тг</h4>
        </div>
        <div className='item__more-info'>
          <p>{currentProduct.description}</p>
        </div>
        <div className='item__colors'>
          <h4>Цвета:</h4>
          <p>{currentProduct.colors}</p>
        </div>
        <div className='item__buttons'>
          <div onClick={onSetToCart}>
            <Button title='Добавить в корзину' />
          </div>
          <div className='img-like' onClick={onSetToLike}>
            <img src={like} alt='' />
          </div>
        </div>
        <div className='item__size'>
          <h4>Подробнее о размере товаре:</h4>
          <ul>
            <li>Ширина: {currentProduct.size[0]} см</li>
            <li>Глубина: {currentProduct.size[2]} см</li>
            <li>Высота: {currentProduct.size[1]} см</li>
          </ul>
        </div>
        <div className='item__matelials'>
          <h4>Материалы и уход:</h4>
          <p>{currentProduct.material}</p>
        </div>
      </Col>
    </Row>
  );
};

export default Item;
