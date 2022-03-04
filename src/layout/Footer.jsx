import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div className='footer'>
      <Container>
        <Row>
          <Col md={5}>
            <h5 className='footer__title'>Присоедениться к Мebel</h5>
            <p className='footer__text'>
              Войдите в аккаунт Mebel и совершайте <br />
              покупки и получайте бонусы{' '}
            </p>
            <Link to='/login'>Войдите в аккаунт</Link>
          </Col>
          <Col>
            <h5 className='footer__title'>Услуги Мebel</h5>
            <p className='footer__text'>
              Доставка и самовызов
              <br />
              Подарочные карты
            </p>
          </Col>
          <Col>
            <h5 className='footer__title'>Контакты</h5>
            <p className='footer__text'>
              +7 702 126 31 73
              <br />
              +7 727 379 52 77
              <br />
              serikov.2002.12@gmail.com
            </p>
          </Col>
        </Row>
        <p className='footer__copyright'>
          © 2021 Интернет-магазин мебели Mebel. Все права защищены
        </p>
      </Container>
    </div>
  );
};
